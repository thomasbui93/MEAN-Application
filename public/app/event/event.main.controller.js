'use strict';
angular.module('voluntr').controller('eventMainController', ['$scope', '$stateParams', 'event', 'EVENT_ERRORS', 'Validation', '$rootScope','Restangular',
  function($scope, $stateParams, event, EVENT_ERRORS, Validation, $rootScope, Restangular) {
    $scope.currentUser = $rootScope.user;

    $scope.input={
        comment:''
    };
    $scope.currentEvent = event;
    $scope.comments = event.comments;
    $scope.currentEvent.date = event.startDate;
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

    $scope.saveComment = function($event){
        if($rootScope.user._id !== undefined){
            if ($event.keyCode == 13) {
                Restangular.all('api/comments').post({
                    event: event._id,
                    content: $scope.input.comment,
                    createdBy: $rootScope.user._id
                }).then(function(comment){
                    event.comments.push(comment);
                    event.save().then(function(msg){

                        $scope.input.comment='';
                    });
                });
            }
        }
    }
    $scope.follow = function() {
     /* //TODO: logined user can follow the event.
        //console.log(event);
        //console.log($rootScope.user);
       $scope.currentUser.events.push(event);
       $scope.currentUser.save();

        console.log($scope.currentUser.events);
        //event.participants.push($scope.currentUser);
        event.save().then(function(data){
         //   console.log(data);
        });*/
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