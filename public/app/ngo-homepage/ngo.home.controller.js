'use strict';

angular.module('voluntr').controller('ngoHomePageController', ['$scope', '$state', '$routeParams',
  function($scope, $state, $routeParams) {
    $scope.currentNGO = {
      name: "aaa" /* + $routeParams.id*/
    };
  }
]);