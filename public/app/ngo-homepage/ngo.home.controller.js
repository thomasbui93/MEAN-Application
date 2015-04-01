'use strict';

angular.module('voluntr').controller('ngoHomePageController', ['$scope', '$state', '$routeParams', 'Restangular',
  function($scope, $state, $routeParams, $Restangular) {
    $scope.currentNGO = {
      name: "aaa" /* + $routeParams.id*/
    };
  }
]);