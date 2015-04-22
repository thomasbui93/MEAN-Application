'use strict';
angular.module('voluntr')
  .controller('LoginController', function($scope, $rootScope, AUTH_EVENTS, AuthService, $state) {
    $scope.credentials = {
      email: '',
      password: ''
    };
    $scope.error = {
      violate: false,
      message: ' *User name and password is not match'
    }
    $scope.login = AuthService.login;
    $scope.logout = AuthService.logout;
    $scope.isAuthenticated = AuthService.isAuthenticated;
    $scope.enterLogin = function($event) {
      if ($event.keyCode === 13) {
        AuthService.login($scope.credentials);
      }
    };
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
      $scope.error.violate = true;
    });
  });