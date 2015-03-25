'use strict';

angular.module('voluntr')
  .controller('homeController', function($scope, $location, $anchorScroll) {
    $scope.hashs = ['header-container-page', 'about-page', 'contact-page', 'honor-page'];
    $scope.currentLocation = $location.hash();

    if ($scope.currentLocation === '') {
      $scope.currentLocation = 'header-container-page';
    }

    $scope.scroll = function($event) {
      var wDelta = $event.wheelDelta < 0 ? 'down' : 'up';
      var hash = $location.hash();
      var index;
      if (hash === '') {
        index = 0;
      } else {
        index = $scope.hashs.indexOf(hash);
      }

      if (index > -1 && index < $scope.hashs.length + 1) {
        if (wDelta == 'down') {
          $location.hash($scope.hashs[index + 1]);
          $anchorScroll();
          $scope.currentLocation = $location.hash();
        } else {
          $location.hash($scope.hashs[index - 1]);
          $anchorScroll();
          $scope.currentLocation = $location.hash();
        }
      }
    };

    $scope.$watch(
        function(){
        return $location.hash();
    }, function(scope){
        $scope.currentLocation = $location.hash();
        });
   
  });