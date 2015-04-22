/**
 * Created by Bui Dang Khoa on 3/18/2015.
 */
'use strict';
angular.module('voluntr')
  .controller('searchController', ['$scope', '$location', 'Restangular', '$stateParams', '$state', 'initialResult',
    function($scope, $location, Restangular, $stateParams, $state, initialResult) {
      $scope.search = {
        keyword: $stateParams.key,
        textField: '',
        searchInterests: [],
        Interests: ['helping children', 'food', 'drink']
      };

      $scope.results = initialResult;
      $scope.searchedWord = $stateParams.key;

      $scope.showResult = function($event) {
        if (!$event || $event.keyCode === 13) {
          Restangular.all('api/search').getList({
            q: $scope.search.keyword
          })
          .then(function(results) {
            $scope.results = results;
            $scope.searchedWord = $scope.search.keyword;
          });
        }
      };

      $scope.goAdvanced = function() {
        $state.go('advancedSearch', {
          key: $scope.search.keyword,
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