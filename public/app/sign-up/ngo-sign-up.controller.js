/**
 * Created by Bui Dang Khoa on 4/8/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoSignUpController', ['$scope', '$state', 'ERRORS', 'Validation', 'Restangular', '$timeout',
  function($scope, $state, ERRORS, Validation, Restangular, $timeout) {
    $scope.org = {
      name: null,
      email: null,
      locations: [],
      phone: null,
      causes: [],
      description: null
    };
    $scope.error = angular.copy(ERRORS);
    $scope.input = {
      location: '',
      cause: ''
    };
    $scope.createCause = function($event) {
      if ($event.keyCode == 13) {
        if ($scope.org.causes.indexOf($scope.input.cause) == -1)
          $scope.org.causes.push($scope.input.cause);
        $scope.input.cause = '';
      }
    };
    $scope.createLocation = function($event) {
      if ($event.keyCode == 13 && $scope.input.location !== '') {
        if ($scope.org.locations.indexOf($scope.input.location) == -1)
          $scope.org.locations.push($scope.input.location);
        $scope.input.location = '';
      }
    };
    $scope.removeLocation = function(location) {
      var index = $scope.org.locations.indexOf(location);
      if (index > -1) {
        $scope.org.locations.splice(index, 1);
      }
    };
    $scope.removeCause = function(cause) {
      console.log(true);
      var index = $scope.org.causes.indexOf(cause);
      if (index > -1) {
        $scope.org.causes.splice(index, 1);
      }
    };
    $scope.register = function() {
      Restangular.all('api/organisations').post({
        name: $scope.org.name,
        email: $scope.org.email,
        locations: $scope.org.locations,
        interests: $scope.org.causes,
        description: $scope.org.description,
        owner: $rootScope.user._id
      })
        .then(function(results) {
          console.log('create');
          $rootScope.user.managedOrganisations.push(results);
          $rootScope.user.save();
          $scope.success = true;

        });
    };
  }
]);