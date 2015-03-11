'use strict';

angular.module('voluntr')
  .controller('homeController', function($scope, exampleRestfulItems) {
    $scope.items = exampleRestfulItems;
 });
