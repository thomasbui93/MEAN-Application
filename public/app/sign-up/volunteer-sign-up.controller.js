/**
 * Created by Bui Dang Khoa on 3/20/2015.
 */
'use strict';
angular.module('voluntr').controller('volunteerSignUpController', function($scope, $state) {
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

  $scope.error = {
    name: {
      violate: false,
      message: 'You must enter your full name.'
    },
    email: {
      violate: false,
      message: 'You must provide an appropriate email.'
    },
    passwordNotMatch: {
      violate: false,
      message: 'Your password you enter is not match.'
    },
    passwordNotStrong: {
      violate: false,
      message: 'Your password should contain at least one number,one uppercase letter, one lowercase letter and have a strength of 8'
    },
    phone: {
      violate: false,
      message: 'Your phone number is not found.'
    }
  };

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

  $scope.checkEmail = function() {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test($scope.user.email);
  };

  $scope.checkPassword = function() {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test($scope.user.password);
  };

  $scope.checkPhone = function() {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test($scope.user.phone);
  };

  $scope.checkAll = function() {
    if ($scope.user.name === '' || $scope.user.name === null) {
      $scope.error.name.violate = true;
    }
    if (!$scope.checkEmail()) {
      $scope.error.email.violate = true;
    }
    if ($scope.user.pwd !== $scope.user.repwd) {
      $scope.error.passwordNotMatch.violate = true;
    }
    if (!$scope.checkPassword()) {
      $scope.error.passwordNotStrong.violate = true;
    }
    if (!$scope.checkPhone()) {
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

});