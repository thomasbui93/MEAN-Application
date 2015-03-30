/**
 * Created by Bui Dang Khoa on 3/25/2015.
 */
'use strict';
angular.module('voluntr').controller('userDashboardController', ['$scope', 'ERRORS', 'Validation', '$timeout',
  function($scope, ERRORS, Validation, $timeout) {
    $scope.edit = {
      show: false,
      state: 'Save'
    };
    $scope.input = {
      skill: '',
      interest: ''
    };
    $scope.user = {
      name: 'Bui Dang Khoa',
      email: 'test@email.com',
      address: 'Oulu, Finland',
      phone: '909990909',
      birthday: Date("October 13, 1993"),
      skillSet: ['Skill Dummy ', 'Skill Expert', 'Skill Average'],
      interestSet: ['Dummy Interest', 'wimpy interest ']
    };
    $scope.errors = ERRORS;
    $scope.notifications = [{
      ngoId: 'asdasasd',
      name: 'Test NGO',
      ngoAvatar: '.....',
      status: 'just update their dummy stuff 5 seconds ago.'
    }, {
      ngoId: 'asdasasd',
      name: 'Test NGO',
      ngoAvatar: '.....',
      status: 'just update their dummy stuff 10 seconds ago.'
    }];

    $scope.activities = [{
      date: new Date("October 20, 2015"),
      name: 'Food catering free'
    }, {
      date: new Date("February 26, 2015"),
      name: 'Help children'
    }, {
      date: new Date("March 11, 2015"),
      name: 'Help elderly'
    }, {
      date: new Date("July 11, 2014"),
      name: 'Other event'
    }];
    $scope.createSkill = function($event) {
      if ($event.keyCode == 13) {
        if ($scope.user.skillSet.indexOf($scope.input.skill) == -1)
          $scope.user.skillSet.push($scope.input.skill);
        $scope.input.skill = '';
      }
    };
    $scope.createInterest = function($event) {
      if ($event.keyCode == 13) {
        if ($scope.user.interestSet.indexOf($scope.input.interest) == -1)
          $scope.user.interestSet.push($scope.input.interest);
        $scope.input.interest = '';
      }
    };

    $scope.removeInterest = function(interest) {
      var index = $scope.user.interestSet.indexOf(interest);
      if (index > -1) {
        $scope.user.interestSet.splice(index, 1);
      }
    };

    $scope.removeSkill = function(skill) {
      var index = $scope.user.skillSet.indexOf(skill);
      if (index > -1) {
        $scope.user.skillSet.splice(index, 1);
      }
    };
    /**
    $scope.parseTime = function(date) {
      if (date.instanceOf(Date)) {
        var elapse = new Date() - date;
        if (elapse.getSeconds() <= 1) {
          return 'just now';
        } else if (elapse.getSeconds() > 1 && elapse.getMinutes() < 1) {
          return elapse.getSeconds() + 'seconds ago';
        }
      } else return null;
    };
    */
    $scope.editInformation = function() {
      $scope.edit = {
        show: true,
        state: 'Save'
      };
    };

    $scope.saveInformation = function() {
      /* if (!Validation.checkPhone($scope.user)) {
        $scope.errors.phone.violate = true;
      }
     */
      if (Validation.checkName($scope.user)) {
        $scope.errors.name.violate = true;
      }
      if (!Validation.checkEmail($scope.user)) {
        $scope.errors.email.violate = true;
      }

      if (Validation.check($scope.errors)) {
        $scope.edit = {
          show: true,
          state: 'Successfully saved!'
        };
        $timeout(function() {
          $scope.edit = {
            show: false,
            state: 'Edit'
          };
        }, 1000);
        ////Todo: Saving staff goes here
      }

    };

  }
]);