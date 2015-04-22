'use strict';

angular.module('voluntr').controller('ngoHomePageController',
  function($scope, $state, $stateParams, Restangular, organisation, NGO_ERRORS, Validation, $timeout, $rootScope) {
    $scope.currentUser = $rootScope.user;
    $scope.currentNGO = organisation;
    $scope.events = organisation.events;
    $scope.recruitments = organisation.recruitments;
    $scope.errors = NGO_ERRORS;
    $scope.edit = {
      show: false,
      state: 'edit'
    };
    $scope.userShow = true;
    $scope.dialogShow = false;
    $scope.removeEvent = null;
    $scope.deleteSuccess = false;

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

    $scope.editInformation = function() {
      $scope.edit = {
        show: true,
        state: 'Save'
      };
    };
    $scope.createCause = function($event) {
      if ($event.keyCode == 13) {
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
    $scope.saveInformation = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentNGO);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentNGO, 20);
      if (Validation.checkFinal($scope.errors)) {
        //TODO: save information
        //Authenticated Saving implementations

        organisation.save().then(function() {
          $scope.edit = {
            show: false,
            saving: false
          };
        });
        $scope.edit = {
          show: false,
          state: 'edit'
        };
      }
    };
    $scope.deleteJob = function(job) {

    };
    $scope.deleteEvent = function(event) {
      var index = organisation.events.indexOf(event);
      if (index > -1) {
        organisation.events.splice(index, 1);
        organisation.save().then(function() {
          $scope.deleteSuccess = true;
          $timeout(function() {
            $scope.deleteSuccess = false;
            $scope.cancelDialog();
          }, 500);
        });
      }
    };

    $scope.showDialog = function(event) {
      $scope.userShow = false;
      $scope.dialogShow = true;
      $scope.removeEvent = event;
    };
    $scope.cancelDialog = function() {
      $scope.userShow = true;
      $scope.dialogShow = false;
      $scope.removeEvent = null;
    };
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
    $scope.isOwner = function() {
      if ($rootScope.user === undefined) {
        return false;
      } else {
        var index = $rootScope.user.managedOrganisations.indexOf(organisation._id);
        return (index !== -1);
      }
    };
    $scope.checkFollowed = function() {
      var index = -1;
      if ($rootScope.user !== undefined) {
        index = organisation.followers.indexOf($rootScope.user._id);
        console.log(index);
        return (index !== -1);
      } else {
        return false;
      }
    };
    $scope.isFollowed = $scope.checkFollowed();

    $scope.unFollow = function() {

      if ($scope.isFollowed) {
        var index = $rootScope.user.followOrganisations.indexOf(organisation._id);
        console.log($rootScope.user, organisation);
        if (index !== -1) {
          $rootScope.user.followOrganisations.splice(index, 1);
          $rootScope.user.save().then(function(user) {
            $rootScope.user = user;

            var indexUser = organisation.followers.indexOf($rootScope.user._id);
            console.log(indexUser);
            if (indexUser !== -1) {
              organisation.followers.splice(indexUser, 1);
              organisation.save().then(function(org) {
                organisation = org;

                $scope.isFollowed = $scope.checkFollowed();

              });
            }
          });
        }

      }
    };
    $scope.follow = function() {

      if (!$scope.isFollowed) {
        $rootScope.user.followOrganisations.push(organisation._id);
        $rootScope.user.save().then(function(user) {
          $rootScope.user = user;
          organisation.followers.push($rootScope.user._id);
          organisation.save().then(function(org) {
            organisation = org;
            $scope.isFollowed = $scope.checkFollowed();

          });
        });
      }

    };
  }
);