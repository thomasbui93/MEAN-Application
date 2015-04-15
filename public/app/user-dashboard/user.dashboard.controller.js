/**
 * Created by Bui Dang Khoa on 3/25/2015.
 */
'use strict';





angular.module('voluntr').controller('userDashboardController', function($scope, ERRORS, Validation,
  $timeout, $rootScope, Restangular, managedOrganisations, representOrganisations, events, $http) {

  $scope.edit = {
    show: false,
    state: 'Save',
    success: false
  };
  $scope.detele = {
    state: false,
    org: null
  };
  $scope.input = {
    skill: '',
    interest: ''
  };
  $scope.unFollow = {
    state: false,
    org: null
  };
  $scope.user = $rootScope.user;

  $scope.user.birthday = new Date($rootScope.user.birthDate.year, $rootScope.user.birthDate.month, $rootScope.user.birthDate.date);
  $scope.user.location = $scope.user.address.city + ", " + $scope.user.address.country;
  $scope.errors = ERRORS;
  $scope.notifications = [];
  $scope.managedOrganisations = managedOrganisations;
  $scope.representOrganisations = representOrganisations;
  $scope.events = events;

  $scope.uploadFile = function(files) {
    var file = files[0];
    if (!file) return;

    var fd = new FormData();

    fd.append("file", file);

    var uploadUrl = '/api/users/' + $rootScope.user._id + '/avatar';

    $http.post(uploadUrl, fd, {
      withCredentials: true,
      headers: {
        'Content-Type': undefined
      },
      transformRequest: angular.identity
    }).success(function(data) {
      $scope.user.avatar = data.url;
      $scope.user.save();
    }).error(function(err) {
      console.log(err);
    });
  };

  $scope.createSkill = function($event) {
    if ($event.keyCode == 13) {
      if ($scope.user.skills.indexOf($scope.input.skill) == -1)
        $scope.user.skills.push($scope.input.skill);
      $scope.input.skill = '';
    } else if ($scope.keyCode === 9) {
      $scope.input.skill = '';
    }
  };
  $scope.createInterest = function($event) {
    if ($event.keyCode == 13) {
      if ($scope.user.interests.indexOf($scope.input.interest) == -1)
        $scope.user.interests.push($scope.input.interest);
      $scope.input.interest = '';
    } else if ($scope.keyCode === 9) {
      $scope.input.interest = '';
    }
  };

  $scope.removeInterest = function(interest) {
    var index = $scope.user.interests.indexOf(interest);
    if (index > -1) {
      $scope.user.interests.splice(index, 1);
    }
  };

  $scope.removeSkill = function(skill) {
    var index = $scope.user.skills.indexOf(skill);
    if (index > -1) {
      $scope.user.skills.splice(index, 1);
    }
  };
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
    if (Validation.checkFinal($scope.errors)) {
      Restangular.all('api/users').getList({
        email: $scope.user.email
      })
        .then(function(results) {
          //console.log($rootScope.user.getList('managedOrganisations'));
          if (results.length !== 0 && results[0].email !== $scope.user.email) {

            $scope.errors.identicalEmail = {
              violate: true,
              message: 'Your email already existed.'
            };
          } else {
            $scope.errors.identicalEmail = {
              violate: false,
              message: 'Your email already existed.'
            };
            $rootScope.user.save().then(function() {
              $scope.edit = {
                show: true,
                state: 'saved!',
                success: true
              };
              $timeout(function() {
                $scope.edit = {
                  show: false,
                  state: 'Edit',
                  success: false
                };
              }, 1000);
            });
          }
        });
    }
  };
  $scope.invokeDelete = function(org) {
    $scope.delete = {
      state: true,
      org: org
    };
  };
  $scope.deleteReset = function() {
    $scope.delete = {
      state: false,
      org: null
    };
  };
  $scope.removeOrg = function() {
    Restangular.one('api/organisations', $scope.delete.org._id)
      .remove()
      .then(function() {
        for (var i = 0; i < $scope.managedOrganisations.length; i++) {
          if ($scope.delete.org._id === $scope.managedOrganisations[i]._id) {
            $scope.managedOrganisations.splice(i, 1);
          }
        }
        $scope.deleteReset();
      });
  };
  $scope.invokeUnFollow = function(org) {
    $scope.unFollow = {
      state: true,
      org: org
    };
  };
  $scope.unFollowReset = function() {
    $scope.unFollow = {
      state: false,
      org: null
    };
  };
  //findObject
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
  $scope.unFollowOrg = function() {
    var index = $rootScope.user.representOrganisations.indexOf($scope.unFollow.org._id);
    if (index > -1) {
      $rootScope.user.representOrganisations.splice(index, 1);
      $rootScope.user.save()
        .then(function() {
          console.log($scope.unFollow.org);
          $scope.unFollow.org.save()
            .then(function() {
              var index = findObject($scope.representOrganisations, $scope.unFollow.org);
              $scope.representOrganisations.splice(index, 1);
              $scope.unFollowReset();
            });

        });
    }


  };

});