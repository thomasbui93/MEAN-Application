/**
 * Created by Bui Dang Khoa on 4/5/2015.
 */
'use strict';
angular.module('voluntr').controller('userMainController', ['$scope', '$stateParams', 'user', 'ERRORS', 'Validation', 'Restangular',
  function($scope, $stateParams, user, ERRORS, Validation, Restangular) {
    $scope.pageUser = user;
    $scope.pageUser.location = $scope.pageUser.address.city + ', ' + $scope.pageUser.address.country;
    $scope.pageUser.birthday = new Date(user.birthDate.year, user.birthDate.month - 1, user.birthDate.date);

    $scope.edit = {
      show: false,
      saving: false
    };

    $scope.errors = ERRORS;

    $scope.editInformation = function() {
      $scope.edit = {
        show: true
      };
    };

    $scope.checkDate = function() {
      var state = false;
      var date = new Date($scope.pageUser.birthDate.year, $scope.pageUser.birthDate.month - 1, $scope.pageUser.birthDate.date);

      if (date.toString() === 'Invalid Date') {
        state = true;
      } else {
        state = false;
      }
      return state;
    };

    $scope.saveInformation = function() {
      $scope.edit.saving = true;

      $scope.errors.email.violate = !Validation.checkEmail($scope.pageUser);
      $scope.errors.birthday.violate = $scope.checkDate();

      if (Validation.checkFinal($scope.errors)) {
        user.birthDate = {
          date: $scope.pageUser.birthDate.date,
          month: $scope.pageUser.birthDate.month + 1,
          year: $scope.pageUser.birthDate.year
        };
        var locationArray = $scope.pageUser.location.split(" ");

        user.address = {
          city: locationArray[0],
          country: locationArray[1] || ' '
        };

        user.email = $scope.pageUser.email;
        user.lastName = $scope.pageUser.lastName;
        user.firstName = $scope.pageUser.firstName;

        user.save().then(function() {
          $scope.edit = {
            show: false,
            saving: false
          };
        });
        $scope.pageUser = user;
      }
    };

  }
]);