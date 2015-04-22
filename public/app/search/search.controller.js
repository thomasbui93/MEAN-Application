/**
 * Created by Bui Dang Khoa on 3/18/2015.
 */
'use strict';
angular.module('voluntr')
  .controller('searchController', ['$scope', '$location', 'Restangular', '$stateParams', '$state', 'initialResult',
    function($scope, $location, Restangular, $stateParams, $state, initialResult) {
      $scope.keyword = $stateParams.key;

      $scope.results = initialResult;
      $scope.searchedWord = $stateParams.key;

      $scope.showResult = function($event) {
        if (!$event || $event.keyCode === 13) {
          $scope.searchedWord = $scope.keyword;
          $state.go('search', {key: $scope.searchedWord}, {notify: false});

          Restangular.all('api/search').getList({
            q: $scope.keyword
          })
            .then(function(results) {
              $scope.results = results;
            });
        }
      };

      $scope.goAdvanced = function() {
        $state.go('advancedSearch', {
          key: $scope.keyword,
          location: ''
        });
      };

      $scope.noResults = function() {
        return $scope.results ? $scope.results.length === 0 : true;
      };

      $scope.isOrganization = function(result) {
        return !!result.managers;
      };

      $scope.isEvent = function(result) {
        return !!result.comments;
      };
    }
  ]);