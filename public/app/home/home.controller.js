'use strict';

angular.module('voluntr')
  .controller('homeController', function($scope) {
    $scope.testPeople = [
      { name: 'Joonas' },
      { name: 'Richard' },
      { name: 'Claudia' },
      { name: 'Khoa' },
      { name: 'Tri' }
    ];
  });