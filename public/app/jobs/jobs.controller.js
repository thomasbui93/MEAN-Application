'use strict';
angular.module('voluntr')
  .controller('jobsController', ['$scope', 'jobs', 'Restangular',
    function($scope, jobs, Restangular) {
      $scope.jobs = jobs;
    }
  ]);