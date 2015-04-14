'use strict';

angular.module('voluntr').controller('ngoHomePageController',
  function($scope, $state, $stateParams, Restangular, organisation, NGO_ERRORS, Validation, $timeout) {
    $scope.currentNGO = organisation;
    $scope.events = organisation.events;
    $scope.recruitments = organisation.recruitments;
    $scope.errors = NGO_ERRORS;
    $scope.edit = {
      show: false,
      state: 'edit'
    };
    $scope.userShow = true;
    $scope.dialogShow = false;
    $scope.removeEvent = null;
    $scope.deleteSuccess = false;
    $scope.editInformation = function() {
      $scope.edit = {
        show: true,
        state: 'Save'
      };
    };

    $scope.createCause = function($event) {
      if ($event.keyCode == 13) {
        if ($scope.currentNGO.interests.indexOf($scope.inputCause) == -1)
          $scope.currentNGO.interests.push($scope.inputCause);
        $scope.inputCause = '';
      }
    };
    $scope.removeCause = function(cause) {
      var index = $scope.currentNGO.interests.indexOf(cause);
      if (index > -1) {
        $scope.currentNGO.interests.splice(index, 1);
      }
    };
    $scope.saveInformation = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentNGO);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentNGO, 20);
      if (Validation.checkFinal($scope.errors)) {
        //TODO: save information
        //Authenticated Saving implementations

        organisation.save().then(function() {
          $scope.edit = {
            show: false,
            saving: false
          };
        });
        $scope.edit = {
          show: false,
          state: 'edit'
        };
      }
    };
    $scope.deleteJob = function(job) {

    };
    $scope.deleteEvent = function(event) {
      var index = organisation.events.indexOf(event);
      if (index > -1) {
        organisation.events.splice(index, 1);
        organisation.save().then(function() {
          $scope.deleteSuccess = true;
          $timeout(function() {
            $scope.deleteSuccess = false;
            $scope.cancelDialog();
          }, 500);
        });
      }
    };

    $scope.showDialog = function(event) {
      $scope.userShow = false;
      $scope.dialogShow = true;
      $scope.removeEvent = event;
    };
    $scope.cancelDialog = function() {
      $scope.userShow = true;
      $scope.dialogShow = false;
      $scope.removeEvent = null;
    };
  }
);