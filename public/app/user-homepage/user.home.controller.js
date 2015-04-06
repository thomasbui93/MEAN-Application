/**
 * Created by Bui Dang Khoa on 4/5/2015.
 */
'use strict';
angular.module('voluntr').controller('userMainController', ['$scope', '$stateParams', 'user', 'ERRORS', 'Validation',
  function($scope, $stateParams, user, ERRORS, Validation) {
    $scope.pageUser = user;
    $scope.pageUser.birthday = new Date(user.birthDate.year, user.birthDate.month - 1, user.birthDate.date);
    $scope.edit = {
      show: false,
      saving: false
    };
    $scope.pageUser.reps = ['1'];
    $scope.pageUser.events = ['1'];
    $scope.errors = ERRORS;
    $scope.edit = {
      show: false
    };
    $scope.editInformation = function() {
      $scope.edit = {
        show: true
      };
    };
    $scope.saveInformation = function(){
      $scope.edit.saving = true;

    }
  }
]);