'use strict';

angular.module('voluntr')
  .controller('searchAdvancedController', ['$scope', '$http', 'Restangular', '$stateParams', 'initialResult',
    function($scope, $http, Restangular, $stateParams, initialResult) {
      $scope.results = initialResult;

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
          jobs: false,
          events: false
        }
      };

      $scope.settingToggle = function() {
        $scope.state.setting = !$scope.state.setting;

      };

      $scope.resultToggle = function(params) {
        $scope.showResult();
        if (params === 'orgs') {
          $scope.state.results = {
            orgs: true,
            jobs: false,
            events: false
          };
          $scope.showOrgs();
        } else if (params === 'jobs') {
          $scope.state.results = {
            orgs: false,
            jobs: true,
            events: false
          };
          $scope.showJobs();
        } else if (params === 'events') {
          $scope.state.results = {
            orgs: false,
            jobs: false,
            events: true
          };
          $scope.showEvents();
        }
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
      $scope.showOrgs = function() {
        Restangular.all('api/organisations').getList({
          name: $scope.search.keyword,
          locations: $scope.search.location,
          //createdDate: new Date($scope.search.startDate.year,$scope.search.startDate.month, $scope.search.startDate.date),
          interests: $scope.search.Interests
        }).then(function(results) {
          $scope.results.organizations = results;
        });
      };
      $scope.showJobs = function() {
        Restangular.all('api/events').getList({
          name: $scope.search.keyword
        })
          .then(function(results) {
            $scope.results.jobs = results;
          });
      };
      $scope.showEvents = function() {

        Restangular.all('api/events').getList({
          name: $scope.search.keyword,
          locations: $scope.search.location,
          interests: $scope.search.Interests
        })
          .then(function(results) {
            $scope.results.events = results;
          });

      };

      $scope.showResult = function($event) {
        // 13 is enter key
        if (!$event || $event.keyCode === 13) {
          $scope.state.setting = false;
          if ($scope.state.results.orgs) {
            $scope.showOrgs();
          } else if ($scope.state.results.jobs) {
            $scope.showJobs();
          } else if ($scope.state.results.events) {
            $scope.showEvents();

          }
        }
      };
    }
  ]);