'use strict';

angular.module('voluntr').controller('ngoHomePageController',
  function($scope, $state, $stateParams, Restangular, organisation, events, recruitments, NGO_ERRORS, Validation) {
    $scope.currentNGO = organisation;
    $scope.events = events;
    $scope.recruitments = recruitments;
    $scope.errors = NGO_ERRORS;
    $scope.edit = {
      show: false,
      state: 'edit'
    };
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
      if (Validation.checkFinal()) {
        //TODO: save information
        $scope.edit = {
          show: false,
          state: 'edit'
        };
      }
    };
    $scope.deleteJob = function(job) {

    };
    $scope.deleteEvent = function(event) {

    };
  }
);