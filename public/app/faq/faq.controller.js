'use strict';

angular.module('voluntr').controller('faqController', ['$scope',
  function($scope) {
    $scope.setActive = function($event) {
      var children = $event.currentTarget.parentNode.parentNode.childNodes;
      for (var i = 0; i < children.length; i++)
        children[i].className = "";

      $event.currentTarget.parentNode.className = "active";
    };
  }
]);