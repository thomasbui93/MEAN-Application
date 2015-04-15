/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoEventManageController', ['$scope', '$state', 'organisation', 'Restangular',
  function($scope, $state, organisation, Restangular) {
    $scope.currentNGO = $scope.$parent.currentNGO || {};
    $scope.events = organisation.events;
    $scope.delete = {
      state: false,
      event: null
    };

    $scope.invokeDelete = function(event) {
      $scope.delete = {
        state: true,
        event: event
      };

    };

    $scope.deleteReset = function() {
      $scope.delete = {
        state: false,
        event: null
      };
    };

    $scope.editTransit = function(id) {
      $state.go('ngoDashboard.eventEdit', id);
    };

    $scope.deleteEvent = function() {
      var index = -1;
      var deleteID = null;
      for (var i = 0; i < organisation.events.length; i++) {
        if (organisation.events[i]._id === $scope.delete.event._id) {
          index = i;
          deleteID = organisation.events[i]._id;
        }
      }
      if (index > -1) {
        organisation.events.splice(index, 1);
        organisation.save().then(function() {
          Restangular.one('api/events', deleteID)
            .remove().then(function() {
              $scope.events = organisation.events;
            });
        });
      }

      $scope.deleteReset();
    };

    $scope.viewVolunteers = function(event) {
      Restangular.one('api/events', event._id)
        .getList('participants')
        .then(function(results) {
          event.volunteers = results;
          event.showVolunteer = !event.showVolunteer;
        });
    };
  }
]).controller('ngoEventEditController', ['$scope', '$stateParams', '$state', 'EVENT_ERRORS', 'Validation', '$timeout', 'event', 'organisation',
  function($scope, $stateParams, $state, EVENT_ERRORS, Validation, $timeout, event, organisation) {
    $scope.currentEvent = event;
    $scope.errors = angular.copy(EVENT_ERRORS);
    $scope.success = false;
    $scope.input = {
      endDate: null,
      startDate: null
    };

    $scope.saveEvent = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentEvent);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentEvent, 20);
      if ($scope.currentEvent.locations === '' || $scope.currentEvent.locations === null) {
        $scope.errors.location.violate = true;
      } else {
        $scope.errors.location.violate = false;
      }
      $scope.currentEvent.startDate = new Date($scope.input.startDate);
      $scope.currentEvent.endDate = new Date($scope.input.endDate);
      if ($scope.currentEvent.startDate > $scope.currentEvent.endDate || $scope.input.startDate === null || $scope.input.endDate === null) {
        console.log($scope.input.startDate, $scope.input.endDate, $scope.currentEvent.startDate > $scope.currentEvent.endDate);
        $scope.errors.time.violate = true;
      } else {
        $scope.errors.time.violate = false;
      }
      console.log($scope.errors);
      if (Validation.checkFinal($scope.errors)) {
        $scope.currentEvent.save().then(function(result) {
          for (var i = 0; i < organisation.events.length; i++) {
            if (organisation.events[i]._id === result._id) {
              organisation.events.splice(i, 1);
            }
          }
          organisation.events.push(result);
          $scope.success = true;
          $timeout(function() {
            $state.transitionTo('ngoDashboard.eventManage', {
              orgId: organisation._id
            });
          }, 1500);
        });
      }
    };
  }
]).controller('ngoEventCreateController', ['$scope', '$stateParams', '$state', 'EVENT_ERRORS', 'Validation', '$timeout', 'organisation', 'Restangular',
  function($scope, $stateParams, $state, EVENT_ERRORS, Validation, $timeout, organisation, Restangular) {
    $scope.currentEvent = {
      name: null,
      locations: null,
      startDate: null,
      endDate: null,
      description: null
    };
    $scope.errors = angular.copy(EVENT_ERRORS);
    $scope.success = false;

    $scope.saveEvent = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentEvent);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentEvent, 20);
      if ($scope.currentEvent.location === '' || $scope.currentEvent.location === null) {
        $scope.errors.location.violate = true;
      } else {
        $scope.errors.location.violate = false;
      }

      if ($scope.currentEvent.startDate > $scope.currentEvent.endDate ||
        $scope.currentEvent.startDate === null ||
        $scope.currentEvent.endDate === null) {

        $scope.errors.time.violate = true;
      } else {
        $scope.errors.time.violate = false;
      }
      if (Validation.checkFinal($scope.errors)) {

        Restangular.all('api/events').post({
          name: $scope.currentEvent.name,
          locations: $scope.currentEvent.location,
          startDate: new Date($scope.currentEvent.startDate),
          endDate: new Date($scope.currentEvent.endDate),
          description: $scope.currentEvent.description
        }).then(function(result) {
          console.log(result);
          organisation.events.push(result);
          organisation.save().then(function() {
            $scope.success = true;
            $timeout(function() {
              $state.transitionTo('ngoDashboard.eventManage', {
                orgId: organisation._id
              });
            }, 1500);
          });
        });
      }
    };
  }
]);