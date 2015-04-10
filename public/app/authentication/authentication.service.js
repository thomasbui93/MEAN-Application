'use strict';
angular.module('voluntr')
  .factory('AuthService', function($http, $rootScope, AUTH_EVENTS, Restangular, USER_ROLES) {
    var authService = {};

    authService.login = function(credentials) {
      $http.post('/api/login', credentials)
        .then(function(res) {
            $rootScope.user = Restangular.restangularizeElement(null, res.data, 'api/users/', res.data._id);

            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          },
          function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          });
    };

    authService.logout = function() {
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      $rootScope.user = null;
    };

    authService.isAuthenticated = function() {
      console.log('user: ', $rootScope.user);
      return !!$rootScope.user;
    };

    authService.isAuthorized = function(authorizedRoles, stateParam) {
      //console.log('AuthService.isAuthorized is not implemented!');
      var access = true;
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      if (authService.isAuthenticated()) { //for logged in user
        //excluded the page for guest
        if (authorizedRoles.indexOf(USER_ROLES.admin) > -1) {
          access = $rootScope.user.admin;
        }
        if (authorizedRoles.indexOf(USER_ROLES.volunteer) > -1) {
          access = true;
        } else { // handle the ngo-page
          //TODO: check if the volunteer owned the orgs
          var managedOrgs = $rootScope.user.managedOrganisations.concat($rootScope.user.representOrganisations);
          var index = managedOrgs.indexOf(stateParam);
          if (index > -1) { // user owned the orgs.
            access = true;
          }
          access = false; //who doesn't
        }
      } else {
        if (authorizedRoles.indexOf(USER_ROLES.guest) > -1) {
          access = true;
        } else {
          access = false;
        }
      }
      return access;
    };

    return authService;
  }).factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function(response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  }).config(function($httpProvider) {
    //interceptor configuration
    $httpProvider.interceptors.push([
      '$injector',
      function($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  }).run(function($location, AUTH_EVENTS, AuthService, $rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParam, from, fromParams) {
      var authorizedRoles = next.data.authorizedRoles;
      var id = nextParam.id || '';
      if (!AuthService.isAuthorized(authorizedRoles, id)) {
        event.preventDefault();

        if (AuthService.isAuthenticated()) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          //user is not allowed
        } else {
          //user is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
      $location.url('/');
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
      $location.url('/');
    });
  });