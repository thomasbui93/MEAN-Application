'use strict';
angular.module('voluntr').controller('eventMainController', ['$scope', '$stateParams', 'event', 'EVENT_ERRORS', 'Validation', '$rootScope',
  function($scope, $stateParams, event, EVENT_ERRORS, Validation, $rootScope) {
    $scope.currentUser = $rootScope.user;
    $scope.currentEvent = event;
    $scope.currentEvent.date = new Date('Feb 26, 2015');
    $scope.comments = event.comments;
    console.log($scope.comments);
    $scope.errors = EVENT_ERRORS;
    $scope.edit = {
      show: false
    };
    $scope.checkFollowed = function() {
      var index = $scope.currentUser.events.indexOf(event);
      if (index = -1) {
        return false;
      } else {
        return true;
      }
    };
    $scope.editInformation = function() {
      $scope.edit = {
        show: true
      };
    };
    $scope.saveInformation = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentEvent);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentEvent, 20);
      if (Validation.checkFinal($scope.errors)) {
        $scope.edit = {
          show: false
        };
      }
    };
    $scope.follow = function() {
      //TODO: logined user can follow the event.
      //
      // $scope.user.events.push(event._id);
      // $scope.user.put();
    };
  }
]).filter('timeParse', function() {
  return function(input) {
    var now = new Date();
    var timeStatus = '';

    var SECOND = 1000;
    var MINUTE = SECOND * 60;
    var HOUR = MINUTE * 60;
    var DAY = HOUR * 24;

    var elapse = now - input;

    if (elapse < SECOND / 10) {
      timeStatus = 'just now';
    } else if (elapse <= SECOND) {
      timeStatus = 'less than a second';
    } else if (elapse <= MINUTE) {
      timeStatus = 'about' + Math.floor(elapse / SECOND) + 'seconds';
    } else if (elapse < HOUR) {
      var minute = Math.floor(elapse / MINUTE);
      if (minute === 1) {
        timeStatus = 'about one minute ago';
      } else {
        timeStatus = 'about' + minute + 'minutes ago';
      }
    } else if (elapse < DAY) {
      var hour = Math.floor(elapse / HOUR);
      if (hour === 1) {
        timeStatus = 'about an hour and ' + Math.floor((elapse % HOUR) / MINUTE) + ' minutes ago';
      } else {
        timeStatus = 'about ' + hour + ' hours ' + Math.floor((elapse % HOUR) / MINUTE) + ' minutes ago';
      }
    } else if (elapse < 2 * DAY) {
      var hour = Math.floor(elapse / HOUR) - 24;
      if (hour <= 1) {
        timeStatus = 'Yesterday ';
      } else {
        timeStatus = 'Yesterday, ' + hour + ' hours';
      }
    } else {
      var year = input.getFullYear();
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var month = monthNames[input.getMonth()];
      var day = input.getDate();

      timeStatus = month + ' ' + day + ' ' + year;
    }
    return timeStatus;
  };
});