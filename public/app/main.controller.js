/**
 * Created by Bui Dang Khoa on 4/9/2015.
 */
'use strict';
angular.module('voluntr').controller('mainController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state',
  function($scope, $rootScope, AUTH_EVENTS, AuthService, $state) {
    $scope.menu = false;
    $scope.setting = false;
    $scope.logout = AuthService.logout;
    $scope.user = $rootScope.user;
    $scope.isAuthenticated = AuthService.isAuthenticated;
    $scope.input = {
      searchMenu: ''
    };

    $scope.toggleMenu = function() {
      angular.element(document.querySelector('#menu-vertical')).css({
        'display': 'block'
      });
      $scope.menu = !$scope.menu;
    };

    $rootScope.$watch('user', function() {
      $scope.user = $rootScope.user;
    });
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
      $scope.user = $rootScope.user;
    });
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
      $scope.user = undefined;
    });
    $scope.showSetting = function() {
      $scope.setting = !$scope.setting;
    };

    $scope.hideMenu = function() {
      $scope.menu = false;
    };

    $scope.searchMenu = function($event) {
      if ($event.keyCode == 13) {
        $state.go('advancedSearch', {
          key: $scope.input.searchMenu,
          location: ''
        });
      }
    };
    $scope.hideThing = function() {
      $scope.menu = false;
      $scope.setting = false;
    };

  }
]);