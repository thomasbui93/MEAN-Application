/**
 * Created by Bui Dang Khoa on 4/9/2015.
 */
'use strict';
angular.module('voluntr').controller('mainController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService',
  function($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.menu = false;
    $scope.logout = AuthService.logout;
    $scope.user = $rootScope.user || {};
    $scope.isAuthenticated = AuthService.isAuthenticated;

    $scope.toggleMenu = function() {
      angular.element(document.querySelector('#menu-vertical')).css({
        'display': 'block'
      });
      $scope.menu = !$scope.menu;
    };

    $rootScope.$watch('user', function() {
      $scope.user = $rootScope.user || {};
    });

    $scope.showSetting = function() {
      $scope.user.setting = true;
    };

    $scope.hideMenu= function () {
        $scope.menu = false;
    };
  }
]);