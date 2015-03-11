'use strict';

angular.module('voluntr')
  .controller('exampleController', function($scope, items) {
    $scope.items = items;
    console.log(items);
  });