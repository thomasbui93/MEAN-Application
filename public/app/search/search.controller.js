/**
 * Created by Bui Dang Khoa on 3/18/2015.
 */
'use strict';
angular.module('voluntr')
  .controller('searchController', ['$scope', '$http', 'Restangular',
    function($scope, $http, Restangular) {
      $scope.search = {
        textField: '',
        searchInterests: [],
        Interests: ['helping children', 'food', 'drink']
      };

      $scope.currentResultState = '';

      $scope.results = [{
        id: '1',
        name: 'First NGO',
        establish: new Date("Jan 12 2014"),
        trend: 1900,
        description: "Morbi in sem quis dui pla Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.",
        interests: ['food', 'drink', 'humanity', 'animals'],
        locations: ['Saima, Finland']
      }, {
        id: '2',
        name: 'Second NGO',
        establish: new Date("Feb 2, 2013"),
        trend: 1000,
        description: "Morbi in sem quis dui pla Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.",
        interests: ['food', 'humanity', 'animals'],
        locations: ['Oulu, Finland']
      }, {
        id: '3',
        name: 'Third NGO',
        establish: new Date("Jul 29, 2015"),
        trend: 13000,
        description: "Morbi in sem quis dui pla Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.",
        interests: ['food', 'animals'],
        locations: ['Helsinki, Finland']
      }];

      $scope.addInterest = function(interest) {
        $scope.search.searchInterests.push(interest);
        var index = $scope.search.Interests.indexOf(interest);
        if (index !== -1) {
          $scope.search.Interests.splice(index, 1);
        }
      };

      $scope.removeInterest = function(interest) {
        $scope.search.Interests.push(interest);
        var index = $scope.search.searchInterests.indexOf(interest);
        if (index !== -1) {
          $scope.search.searchInterests.splice(index, 1);
        }
      };

      $scope.checkAll = function() {
        //merge two array to avoid loss of data
        $scope.search.searchInterests = $scope.search.searchInterests.concat($scope.search.Interests);
        //empty the other one
        $scope.search.Interests = [];
      };

      $scope.unCheck = function() {
        if ($scope.search.searchInterests.length !== 0) {
          $scope.search.Interests = $scope.search.Interests.concat($scope.search.searchInterests);
          $scope.search.searchInterests = [];
        }
      };

      $scope.sortTrending = function() {
        $scope.results.sort(function(a, b) {
          if (a.trend < b.trend) {
            return 1;
          }
          if (a.trend > b.trend) {
            return -1;
          } else return 0;
        });
      };

      $scope.sortNew = function() {
        $scope.results.sort(function(a, b) {
          if (a.establish < b.establish) {
            return 1;
          }
          if (a.establish > b.establish) {
            return -1;
          } else return 0;
        });
      };

      $scope.sortAlphabet = function() {
        $scope.results.sort(function(a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else return 0;
        });
      };

      //get result goes here
      $scope.showResult = function() {

        Restangular.all('api/organisations').getList({
          name: $scope.search.textField,
          interests: $scope.search.searchInterests
        })
          .then(function(results) {

            $scope.results = results;
          });

        $scope.search.textField = "";
        console.log($scope.results);

      };

      $scope.fetchInterests = function() {

      };
    }
  ]);