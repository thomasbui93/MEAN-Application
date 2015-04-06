'use strict';
angular.module('voluntr')
  .controller('LoginController', function($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
      email: '',
      password: ''
    };
    $scope.login = AuthService.login;
    $scope.logout = AuthService.logout;
  });