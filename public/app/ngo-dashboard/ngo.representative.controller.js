/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoRepresentativeManageController', ['$scope', '$state',
  function($scope, $state) {
    $scope.reps = [{
      id: '1',
      name: 'Bui Dang Khoa',
      avatar: '',
      selected: false
    }, {
      id: '1',
      name: 'Bui Dang Khoa',
      avatar: '',
      selected: false
    }, {
      id: '1',
      name: 'Bui Dang Khoa',
      avatar: '',
      selected: false
    }, {
      id: '1',
      name: 'Bui Dang Khoa',
      avatar: '',
      selected: false
    }];

    $scope.state = {
      check: true,
      dialog: false
    };

    $scope.checkRemoveAll = function() {
      angular.forEach($scope.reps, function(rep) {
        rep.selected = true;
      });

      $scope.state = {
        check: false
      };
    };

    $scope.unCheck = function() {
      angular.forEach($scope.reps, function(rep) {
        rep.selected = false;
      });

      $scope.state = {
        check: true
      };
    };

    $scope.addUser = function(rep) {
      rep.selected = !rep.selected;
    };

    $scope.removeInvoke = function() {
      $scope.state.dialog = true;
    };

    $scope.removeRepresentative = function() {
      //TODO: server remove
      $scope.deleteReset();
    };

    $scope.deleteReset = function() {
      $scope.state = {
        check: true,
        dialog: false
      };
    };
  }
]);