/**
 * Created by Bui Dang Khoa on 3/20/2015.
 */
'use strict';
angular.module('voluntr').controller('volunteerSignUpController', ['$scope', '$state', 'ERRORS', 'Validation',
  function($scope, $state, ERRORS, Validation) {
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

    };

    $scope.register = function() {
      $scope.checkAll();
      if (Validation.check($scope.error)) {
        $state.go('home');
      }
    };

  }
]);