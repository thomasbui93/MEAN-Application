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
      $rootScope.user = undefined;
    };

    authService.isAuthenticated = function() {
      //console.log('user: ', $rootScope.user);
      if ($rootScope.user === undefined || $rootScope.user === null) {
        return false;
      } else {
        return true;
      }
    };

    authService.isAuthorized = function(authorizedRoles, stateParam) {
      // console.log(authService.isAuthenticated(), $rootScope.user);
      //console.log('AuthService.isAuthorized is not implemented!');
      var access = true;
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
        console.log('not array');
      }

      if (authService.isAuthenticated()) {
        if (authorizedRoles.indexOf(USER_ROLES.volunteer) > -1 && stateParam !== undefined) {
          var managedOrgs = $rootScope.user.managedOrganisations.concat($rootScope.user.representOrganisations);
          var index = managedOrgs.indexOf(stateParam);
          access = (index > -1); //who doesn't
        } else if (authorizedRoles.indexOf(USER_ROLES.volunteer) === -1) {
          access = false;
        }
      } else {
        console.log('guest only');
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
          440: AUTH_EVENTS.sessionTimeout,
          404: AUTH_EVENTS.notFound
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
  }).run(function($location, AUTH_EVENTS, AuthService, $rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParam, from, fromParams) {
      var authorizedRoles = next.data.authorizedRoles;
      var id = nextParam.orgId;
      //   console.log(AuthService.isAuthorized(authorizedRoles, id));
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
      //redirect to user dashboard for now
      $state.go('user-dashboard');
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
      $location.url('/');
      console.log($rootScope.user);
    });
    $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
      $state.go('permissionDenied');
    });
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
      if (!$state.is('login')) {
        $state.go('loginRequired');
      }
    });
    $rootScope.$on(AUTH_EVENTS.notFound, function() {
      $state.go('404');
    });
  });