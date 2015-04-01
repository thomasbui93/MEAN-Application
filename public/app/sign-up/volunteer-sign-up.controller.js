/**
 * Created by Bui Dang Khoa on 3/20/2015.
 */
'use strict';
angular.module('voluntr').controller('volunteerSignUpController', ['$scope', '$state', 'ERRORS', 'Validation', 'Restangular',
  function($scope, $state, ERRORS, Validation, Restangular) {
    $scope.user = {
      name: null,
      email: null,
      pwd: null,
      repwd: null,
      address: null,
      phone: null,
      birthday: null,
      skillSet: [],
      interestSet: []
    };

    $scope.input = {
      interest: '',
      skill: ''
    };

    $scope.error = ERRORS;

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
    $scope.checkAll = function() {
      if ($scope.user.name === '' || $scope.user.name === null) {
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
      $scope.error.passwordNotStrong.violate = !Validation.checkPassword($scope.user);
      $scope.error.phone.violate = !Validation.checkPhone($scope.user);
    };

    $scope.checkIdenticalEmail = function() {

      Restangular.all('api/users').getList({
        email: $scope.user.email
      })
        .then(function(results) {

          if (results.length !== 0) console.log("email is already used");
          else {
            Restangular.all('api/users').post({
              firstname: $scope.user.firstname,
              lastname: $scope.user.lastname,
              email: $scope.user.email,
              password: $scope.user.pwd

            })
              .then(function(results) {

                console.log("user is created");
              });
          }

        });
    };

    $scope.register = function() {
      //event.preventDefault();
      $scope.checkAll();
      $scope.checkIdenticalEmail();


      /* if (Validation.check()) {
        $state.go('home');
      }*/
    };

  }
]);