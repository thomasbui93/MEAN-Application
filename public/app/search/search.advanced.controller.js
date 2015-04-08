'use strict';

angular.module('voluntr')
  .controller('searchAdvancedController', ['$scope', '$http', 'Restangular', '$stateParams',
    function($scope, $http, Restangular, $stateParams) {
      $scope.search = {
        keyword: $stateParams.key,
        location: '',
        startDate: {
          date: '',
          month: '',
          year: ''
        },
        endDate: {
          date: '',
          month: '',
          year: ''
        },
        Interests: []
      };

      $scope.state = {
        setting: false,
        results: {
          orgs: true,
          volunteers: false,
          events: false
        }
      };

      $scope.settingToggle = function() {
        $scope.state.setting = !$scope.state.setting;
      };

      $scope.resultToggle = function(params) {
        if (params === 'orgs') {
          $scope.state.results = {
            orgs: true,
            volunteers: false,
            events: false
          };
        } else if (params === 'volunteers') {
          $scope.state.results = {
            orgs: false,
            volunteers: true,
            events: false
          };
        } else if (params === 'events') {
          $scope.state.results = {
            orgs: false,
            volunteers: false,
            events: true
          };
        }
      };

      $scope.results = {
        organizations: [],
        volunteers: [],
        events: []
      };

      $scope.input = {
        cause: ''
      };

      $scope.addInterest = function($event) {
        if ($event.keyCode === 13) {
          var index = $scope.search.Interests.indexOf($scope.input.cause);
          if (index == -1) {
            $scope.search.Interests.push($scope.input.cause);
            $scope.input = {
              cause: ''
            };
          }
        }
      };

      $scope.removeInterest = function(interest) {
        var index = $scope.search.Interests.indexOf(interest);
        if (index !== -1) {
          $scope.search.Interests.splice(index, 1);
        }
      };

      $scope.unCheck = function() {
        if ($scope.search.Interests.length !== 0) {
          $scope.search.Interests = [];
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
        $scope.state.setting = false;
        Restangular.all('api/organisations').getList({
            name: $scope.search.textField,
            interests: $scope.search.searchInterests
          })
          .then(function(results) {

            $scope.results = results;
          });
      };
    }
  ]);