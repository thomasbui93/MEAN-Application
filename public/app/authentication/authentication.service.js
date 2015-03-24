'use strict';
angular.module('voluntr')
  .factory('AuthService', function($http, Session) {
    var authService = {};
    authService.login = function(credentials) {
      return $http
        .post('/api/login', credentials)
        .then(function(res) {
          Session.create(res.data.id, res.data.user.id, res.data.user.role, res.data.user.name);
          return res.data.user;
        });
    };

    authService.isAuthenticated = function() {
      return !!Session.userId;
    };

    authService.isAuthorized = function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authorizedRoles.indexOf(Session.userRole) !== -1);
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
  }).service('Session', function(USER_ROLES) {
    this.userRole = USER_ROLES.guest;
    this.create = function(sessionId, userId, userRole, userName) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
      this.userName = userName;
    };

    this.destroy = function() {
      this.id = null;
      this.userId = null;
      this.userRole = USER_ROLES.guest;
      this.userName = null;
    };
  }).config(function($httpProvider) {
    //interceptor configuration
    $httpProvider.interceptors.push([
      '$injector',
      function($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  }).run(function($http, AUTH_EVENTS, AuthService, $rootScope, Session) {
    $rootScope.user = {
      id: null,
      role: 'guest',
      userName: null
    };

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
  });