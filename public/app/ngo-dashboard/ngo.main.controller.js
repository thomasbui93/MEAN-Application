/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoDashBoardMainController',
  function($scope, NGO_ERRORS, Validation, $timeout, organisation) {

    $scope.currentNGO = organisation;

    $scope.edit = {
      show: false,
      state: 'Save'
    };

    $scope.errors = NGO_ERRORS;
    $scope.inputCause = '';

    //method
    $scope.createCause = function($event) {
      if ($event.keyCode == 13) {
        if ($scope.currentNGO.causes.indexOf($scope.inputCause) == -1)
          $scope.currentNGO.causes.push($scope.inputCause);
        $scope.inputCause = '';
      }
    };

    $scope.removeCause = function(cause) {
      var index = $scope.currentNGO.causes.indexOf(cause);
      if (index > -1) {
        $scope.currentNGO.causes.splice(index, 1);
      }
    };

    $scope.editInformation = function() {
      $scope.edit = {
        show: true,
        state: 'Save'
      };
    };

    $scope.saveInformation = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentNGO);
      $scope.errors.email.violate = !Validation.checkEmail($scope.currentNGO);
      $scope.errors.phone.violate = !Validation.checkPhone($scope.currentNGO);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentNGO, 30);
      if (Validation.checkFinal($scope.errors)) {
        $scope.edit = {
          show: true,
          state: 'Successfully saved!'
        };
        $timeout(function() {
          $scope.edit = {
            show: false,
            state: 'Edit'
          };
        }, 1000);
        ////Todo: Saving staff goes here
      }
    };
  }
);
