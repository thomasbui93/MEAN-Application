'use strict';

angular.module('voluntr').controller('ngoHomePageController',
  function($scope, $state, $stateParams, Restangular, organisation, events, recruitments) {
    $scope.currentNGO = organisation;
    $scope.events = events;
    $scope.recruitments = recruitments;
    console.log(events);
  }
);