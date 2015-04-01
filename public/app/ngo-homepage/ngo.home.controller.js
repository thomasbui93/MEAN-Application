'use strict';

angular.module('voluntr').controller('ngoHomePageController',
  function($scope, $state, $stateParams, Restangular, organisation, events) {
    $scope.currentNGO = organisation;
    $scope.events = events;
    console.log(events);
  }
);