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
      }
      if (!Validation.checkEmail($scope.user)) {
        $scope.error.email.violate = true;
      }
      if ($scope.user.pwd !== $scope.user.repwd) {
        $scope.error.passwordNotMatch.violate = true;
      }
      if (!Validation.checkPassword($scope.user)) {
        $scope.error.passwordNotStrong.violate = true;
      }
      if (!Validation.checkPhone($scope.user)) {
        $scope.error.phone.violate = true;
      }
    };

    $scope.check = function() {
      if (!$scope.error.email.violate && !$scope.error.name.violate && !$scope.error.passwordNotMatch.violate && !$scope.error.passwordNotStrong.violate && !$scope.error.phone.violate) {
        return true;
      } else {
        return false;
      }
    };

    $scope.checkIdenticalEmail = function() {

    };

    $scope.register = function() {
      //event.preventDefault();
      $scope.checkAll();
      if ($scope.check()) {
        $state.go('home');
      }
    };

  }
]);