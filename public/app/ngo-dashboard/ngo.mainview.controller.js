/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoEventManageController', ['$scope', '$state',
  function($scope, $state) {
    $scope.currentNGO = $scope.$parent.currentNGO || {};

    $scope.delete = {
      state: false,
      events: []
    };

    //methods
    $scope.invokeDelete = function(event) {
      $scope.delete = {
        state: true,
        events: [event]
      };
    };

    $scope.deleteReset = function() {
      $scope.delete = {
        state: false,
        events: []
      };
    };

    $scope.editTransit = function(id) {
      $state.transitionTo('ngoDashboard.eventEdit', {
        id: id
      });
    };

    $scope.deleteEvent = function(events) {
      events.forEach(function(event) {
        //TODO: backEnd delete goes here
        //simulation:
        var index = $scope.currentNGO.events.indexOf(event);
        if (index > -1) {
          $scope.currentNGO.events.splice(index, 1);
        }
      });
      $scope.deleteReset();
    };

    $scope.viewVolunteers = function(event) {
      event.showVolunteer = !event.showVolunteer;
    };

    //backEnd implements
    $scope.fetchEvent = function() {

    };
  }
]).controller('ngoEventEditController', ['$scope', '$stateParams', '$state', 'EVENT_ERRORS', 'Validation', '$timeout',
  function($scope, $stateParams, $state, EVENT_ERRORS, Validation, $timeout) {
    $scope.currentEvent = {
      id: '1',
      date: new Date("October 20, 2015"),
      name: 'Food catering free',
      phone: '099 222 3333',
      location: 'Hanhitie 17H B14, Oulu, Finland',
      description: "Morbi in sem quis dui pla Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
    };

    $scope.errors = EVENT_ERRORS;
    $scope.success = false;

    $scope.fetchEvent = function(id) {
      //Todo retrieve the event with the specific id
    };

    $scope.saveEvent = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentEvent);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentEvent, 20);
      $scope.errors.phone.violate = !Validation.checkPhone($scope.currentEvent);

      if ($scope.currentEvent.location === '' || $scope.currentEvent.location === null) {
        $scope.errors.location.violate = true;
      } else {
        $scope.errors.location.violate = false;
      }
      if (Validation.checkFinal($scope.errors)) {
        $scope.success = true;
        //TODO: server saving ngo profile
        $timeout(function() {
          $state.transitionTo('ngoDashboard.eventManage');
        }, 1500);
      }
    };
  }
]).controller('ngoEventCreateController', ['$scope', '$stateParams', '$state', 'EVENT_ERRORS', 'Validation', '$timeout',
  function($scope, $stateParams, $state, EVENT_ERRORS, Validation, $timeout) {
    $scope.currentEvent = {
      id: null,
      date: null,
      name: '',
      phone: '',
      location: '',
      description: ""
    };

    $scope.errors = EVENT_ERRORS;
    $scope.success = false;

    $scope.saveEvent = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentEvent);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentEvent, 20);
      $scope.errors.phone.violate = !Validation.checkPhone($scope.currentEvent);

      if ($scope.currentEvent.location === '' || $scope.currentEvent.location === null) {
        $scope.errors.location.violate = true;
      } else {
        $scope.errors.location.violate = false;
      }

      if ($scope.currentEvent.date < new Date() || $scope.currentEvent.date === null) {
        $scope.errors.time.violate = true;
      } else {
        $scope.errors.time.violate = false;
      }
      if (Validation.checkFinal($scope.errors)) {
        $scope.success = true;
        $timeout(function() {
          $state.transitionTo('ngoDashboard.eventManage');
        }, 1500);
      }
    };
  }
]);