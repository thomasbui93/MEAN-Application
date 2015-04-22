'use strict';
angular.module('voluntr')
  .controller('eventsController', ['$scope', 'events', 'Restangular',
    function($scope, events, Restangular) {
      $scope.events = events;
    }
  ]);