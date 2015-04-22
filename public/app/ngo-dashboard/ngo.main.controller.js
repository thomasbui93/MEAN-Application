/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoDashBoardMainController',
  function($scope, NGO_ERRORS, KEY_CODES, Validation, $timeout, organisation, FileUploader) {

    $scope.currentNGO = organisation;
    $scope.edit = {
      show: false,
      state: 'Save'
    };
    $scope.cancelSave = function() {
      $scope.edit = {
        show: false,
        state: 'Save'
      };
    };
    $scope.errors = angular.copy(NGO_ERRORS);
    $scope.inputCause = '';

    //method

    $scope.uploadFile = function(files) {
      var file = files[0];
      if (!file) return;

      var uploadUrl = '/api/organisations/' + $scope.currentNGO._id + '/picture';

      FileUploader.upload(uploadUrl, file)
        .success(function(data) {
          $scope.currentNGO.picture = data.url;
          $scope.currentNGO.save();
        }).error(function(err) {
          console.log(err);
        });
    };

    $scope.uploadBanner = function(files) {
      var file = files[0];
      if (!file) return;

      var uploadUrl = '/api/organisations/' + $scope.currentNGO._id + '/banner';

      FileUploader.upload(uploadUrl, file)
        .success(function(data) {
          $scope.currentNGO.banner = data.url;
          $scope.currentNGO.save();
        }).error(function(err) {
          console.log(err);
        });
    };

    $scope.createCause = function($event) {
      if ($event.keyCode === KEY_CODES.enter) {
        if ($scope.currentNGO.interests.indexOf($scope.inputCause) == -1)
          $scope.currentNGO.interests.push($scope.inputCause);
        $scope.inputCause = '';
      }
    };

    $scope.removeCause = function(cause) {
      var index = $scope.currentNGO.interests.indexOf(cause);
      if (index > -1) {
        $scope.currentNGO.interests.splice(index, 1);
      }
    };

    $scope.editInformation = function() {
      $scope.edit = {
        show: true,
        state: 'Save'
      };
    };

    $scope.removeLocation = function(location) {
      var index = $scope.currentNGO.locations.indexOf(location);
      if (index > -1) {
        $scope.currentNGO.locations.splice(index, 1);
      }

    };

    $scope.addLocation = function($event) {
      if ($scope.input.address !== '' && $event.keyCode === KEY_CODES.enter) {
        $scope.currentNGO.locations.push($scope.input.address);
        $scope.input.address = '';
      }
    };

    $scope.saveInformation = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentNGO);
      $scope.errors.phone.violate = !Validation.checkPhone($scope.currentNGO);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentNGO, 20);
      if (Validation.checkFinal($scope.errors)) {
        $scope.currentNGO.save().then(function() {
          $scope.edit = {
            show: true,
            state: 'Saved'
          };
          $timeout(function() {
            $scope.edit = {
              show: false,
              state: 'Edit'
            };
          }, 1000);
        });
      }
    };
  }
);