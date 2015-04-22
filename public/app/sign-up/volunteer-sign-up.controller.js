/**
 * Created by Bui Dang Khoa on 3/20/2015.
 */
'use strict';
angular.module('voluntr').controller('volunteerSignUpController', ['$scope', '$state', 'ERRORS', 'Validation', 'Restangular', '$timeout',
  function($scope, $state, ERRORS, Validation, Restangular, $timeout) {
    $scope.user = {
      firstName: null,
      lastName: null,
      email: null,
      pwd: null,
      repwd: null,
      city: null,
      country: null,
      phone: null,
      birthday: null,
      skillSet: [],
      interestSet: []
    };

    $scope.input = {
      interest: '',
      skill: ''
    };
    $scope.success = false;
    $scope.error = angular.copy(ERRORS);

    $scope.createSkill = function($event) {
      if ($event.keyCode === 13 || $event.keyCode === 9) {
        if ($scope.user.skillSet.indexOf($scope.input.skill) == -1 && $scope.input.skill !== '')
          $scope.user.skillSet.push($scope.input.skill);
        $scope.input.skill = '';
      }
    };

    $scope.createInterest = function($event) {
      if ($event.keyCode == 13 || $event.keyCode === 9) {
        if ($scope.user.interestSet.indexOf($scope.input.interest) == -1 && $scope.input.interest !== '')
          $scope.user.interestSet.push($scope.input.interest);
        $scope.input.interest = '';
      }
    };
    $scope.removeSkill = function(skill) {
      var index = $scope.user.skillSet.indexOf(skill);
      if (index > -1) {
        $scope.user.skillSet.splice(index, 1);
      }
    };
    $scope.removeInterest = function(interest) {
      var index = $scope.user.interestSet.indexOf(interest);
      if (index > -1) {
        $scope.user.interestSet.splice(index, 1);
      }
    };
    $scope.checkAll = function() {
      if ($scope.user.firstname === '' || $scope.user.firstname === null) {
        $scope.error.name.violate = true;
      } else {
        $scope.error.name.violate = false;
      }
      if ($scope.user.lastname === '' || $scope.user.lastname === null) {
        $scope.error.name.violate = true;
      } else {
        $scope.error.name.violate = false;
      }
      $scope.error.email.violate = !Validation.checkEmail($scope.user);

      if ($scope.user.pwd !== $scope.user.repwd) {
        $scope.error.passwordNotMatch.violate = true;
      } else {
        $scope.error.passwordNotMatch.violate = false;
      }

      if ($scope.user.phone && $scope.user.phone !== '') {
        $scope.error.phone.violate = !Validation.checkPhone($scope.user);
      }

      $scope.error.passwordNotStrong.violate = !Validation.checkPassword($scope.user);
      $scope.error.birthday.violate = !Validation.checkBirthdate($scope.user);
    };

    $scope.checkIdenticalEmail = function() {
      Restangular.all('api/users').getList({
        email: $scope.user.email
      })
        .then(function(results) {
          console.log(results.length);
          if (results.length !== 0) {
            console.log("email is already used");
            $scope.error.identicalEmail = {
              violate: true,
              message: 'Your email already existed.'
            };
          } else {
            $scope.error.identicalEmail = {
              violate: false,
              message: 'Your email already existed.'
            };
            console.log('not identical email');
            if (Validation.checkFinal($scope.error)) {
              $scope.save();
            }

          }
        });
    };

    $scope.save = function() {
      console.log('save called');
      Restangular.all('api/users').post({
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        email: $scope.user.email,
        password: $scope.user.pwd,
        birthDate: {
          date: $scope.user.birthday.getDate(),
          month: $scope.user.birthday.getMonth(),
          year: $scope.user.birthday.getFullYear()
        },
        address: {
          city: $scope.user.city,
          country: $scope.user.country
        },
        skills: $scope.user.skillSet,
        interests: $scope.user.interestSet,
        phoneNumber: $scope.user.phone
      })
        .then(function(results) {
          $scope.success = true;
          $timeout(function() {
            $state.transitionTo('login');
          }, 2000);
        });
    };

    $scope.register = function() {

      $scope.checkAll();

      //if (Validation.checkFinal($scope.error)) {
      $scope.checkIdenticalEmail();
      //}
    };
  }
]);