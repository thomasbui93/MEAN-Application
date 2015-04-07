'use strict';
angular.module('voluntr')
  .factory('AuthService', function($http, $rootScope, AUTH_EVENTS) {
    var authService = {};

    authService.login = function(credentials) {
      $http.post('/api/login', credentials)
        .then(function(res) {
            $rootScope.user = res.data;
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
      return !!$rootScope.user;
    };

    authService.isAuthorized = function(authorizedRoles) {
      console.log('AuthService.isAuthorized is not implemented!');
      return true;
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
    $rootScope.$on('$stateChangeStart', function(event, next) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
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
      //$location.url('/');
      console.log($rootScope.user);

    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
      $location.url('/');
    });
  });