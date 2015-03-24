'use strict';
angular.module('voluntr')
  .controller('LoginController', function($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function(credentials) {
      AuthService.login(credentials)
        .then(
          function(user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
          },
          function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          });
    };

    $scope.setCurrentUser = function(user) {
      $rootScope.user.id = user.id;
      $rootScope.user.role = user.role;
      $rootScope.user.userName = user.userName;
    };

    $scope.logout = function() {
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      $rootScope.user.id = null;
      $rootScope.user.role = 'guest';
      $rootScope.user.userName = null;
    };
  }).constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  }).constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    ngo: 'ngo',
    volunteer: 'volunteer',
    guest: 'guest'
  });