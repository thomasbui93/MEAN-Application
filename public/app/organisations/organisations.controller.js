'use strict';
angular.module('voluntr')
  .controller('organisationsController', ['$scope', 'organisations', 'Restangular',
    function($scope, organisations, Restangular) {
      $scope.organisations = organisations;
    }
  ]);