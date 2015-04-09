'use strict';

angular.module('voluntr').controller('homeController', ['$scope', '$rootScope', 'organisations', 'Restangular',
  function($scope, $rootScope, organisations, Restangular) {
    $scope.organisations = organisations;
    $scope.fetchOrganisation = function() {
      //TODO: fetch 6 most contributed orgs
      Restangular.all('api/organisations')
        .getList()
        .then(function(results) {
          console.log(results);
        });
    };
    $scope.moveLeft = function() {
      var box = document.querySelector('.organisations-bar').offsetWidth ;
      var container = angular.element(document.querySelector('.organisations-container'));
      var currentStateCSS = parseFloat(container.css('-webkit-transform').substr(11)) || 0;
      var chunk = (200*$scope.organisations.length-box)/200;
      if(currentStateCSS > -200*chunk){
          container.css({
              '-webkit-transform': 'translateX('+(currentStateCSS-200)+'px)'
          });
      }
    };
    $scope.moveRight = function () {
        var container = angular.element(document.querySelector('.organisations-container'));
        var currentStateCSS = parseFloat(container.css('-webkit-transform').substr(11)) || 0;
        if(currentStateCSS <= -200){
            container.css({
                '-webkit-transform': 'translateX('+(currentStateCSS+200)+'px)'
            });
        }
    };
  }
]);