/**
 * Created by Bui Dang Khoa on 3/18/2015.
 */
'use strict';
angular.module('voluntr')
  .controller('searchController', ['$scope', '$http', 'Restangular', '$stateParams', '$state', 'initialResult',
    function($scope, $http, Restangular, $stateParams, $state, initialResult) {
      $scope.search = {
        keyword: $stateParams.key,
        textField: '',
        searchInterests: [],
        Interests: ['helping children', 'food', 'drink']
      };

      $scope.currentResultState = '';

      $scope.results = initialResult;
      console.log($scope.results);

      //get result goes here
      $scope.showResult = function($event) {
        if (!$event || $event.keycode === 13) {
          Restangular.all('api/search').getList({
            q: $scope.search.keyword + " " + $scope.search.searchInterests.join(" ")
          })
            .then(function(results) {

              $scope.results = results;
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