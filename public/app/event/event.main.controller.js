'use strict';
angular.module('voluntr').controller('eventMainController', ['$scope', '$stateParams', 'event', 'EVENT_ERRORS', 'Validation', '$rootScope', 'Restangular',
  'comments','organisation',
  function($scope, $stateParams, event, EVENT_ERRORS, Validation, $rootScope, Restangular, comments, organistion) {
    $scope.currentUser = $rootScope.user;
    var findObject = function(array, object) {
      var index = -1;
      if (object === undefined) {
        return -1;
      }
      for (var i = 0; i < array.length; i++) {
        if (array[i]._id === object._id) {
          index = i;
          break;
        }
      }
      return index;

    };
    $scope.organisation = organistion;
    $scope.isFollowed = findObject(event.participants, $rootScope.user) !== -1;
    $scope.input = {
      comment: ''
    };

    $scope.currentEvent = event;
    $scope.currentEvent.time = new Date($scope.currentEvent.date);
    $scope.comments = comments;
    $scope.currentEvent.date = event.startDate;
    $scope.errors = EVENT_ERRORS;
    $scope.edit = {
      show: false
    };

    $scope.checkFollowed = function() {
      var index = $scope.currentUser.events.indexOf(event);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    };
    $scope.checkOwner = function () {
      if($rootScope.user === undefined){
          return false;
      } else{
          // TODO: check owner
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

      event.save().then(function() {
        $scope.edit = {
          show: false,
          saving: false
        };
      });

      if (Validation.checkFinal($scope.errors)) {
        $scope.edit = {
          show: false
        };
      }
    };

    $scope.saveComment = function($event) {
      if ($rootScope.user._id !== undefined) {
        if ($event.keyCode == 13) {
          Restangular.all('api/comments').post({
            event: event._id,
            content: $scope.input.comment,
            createdBy: $rootScope.user._id
          }).then(function(comment) {
            var userComment = {
              createdBy: {},
              content: ''
            };
            userComment.content = comment.content;
            userComment.createdBy.firstName = $rootScope.user.firstName;
            userComment.createdBy.lastName = $rootScope.user.lastName;
            comments.push(userComment);
            $scope.input.comment = '';
            event.comments.push(comment);
            event.save().then(function(msg) {});
          });
        }
      }
    };

    $scope.follow = function() {
      $scope.currentUser.events.push(event);
      $scope.currentUser.save();
      var user = {
          _id : $scope.currentUser._id
      };
      event.participants.push(user);
      event.save().then(function(data) {
        //TODO: check if this is working fine-> done
        $scope.isFollowed = true;
      });
    };

    $scope.unFollow = function() {
      var indexEvent = findObject($rootScope.user.events, event);
      if (indexEvent !== -1) {
        $rootScope.user.events.splice(indexEvent, 1);
        $rootScope.user.save();
      }
      var indexUser = findObject(event.participants, $rootScope.user);

      if (indexUser !== -1) {
        event.participants.splice(indexUser, 1);

        event.save().then(function() {
          console.log('deleted');
          $scope.isFollowed = false;
        });
      }

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