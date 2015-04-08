'use strict';

angular.module('voluntr').controller('homeController',
  function($scope, Restangular, organisations) {
    $scope.organisations = organisations;
  }
);