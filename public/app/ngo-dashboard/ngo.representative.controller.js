/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoRepresentativeManageController', ['$scope', '$state', 'organisation', 'Restangular',
  function($scope, $state, organisation, Restangular) {
    $scope.reps = organisation.representatives;
    $scope.state = {
      check: true,
      dialog: false
    };
    $scope.input = {
      email: '',
      repeatedError: false
    };
    $scope.matchUser = [];
    $scope.showUser = function($event) {
      console.log($scope.input.email);
      $scope.matchUser = [];
      if ($scope.input.email.length > 0) {
        Restangular.all('api/users')
          .getList({
            email: $scope.input.email
          })
          .then(function(result) {
            $scope.matchUser = result;
          });
      }
    }
    $scope.addRepresentative = function(user) {
      var index = findObject(organisation.representatives, user);
      console.log(index);
      if (index === -1) {
        $scope.input.repeatedError = false;
        console.log(user);
        console.log(organisation.representatives);

        //circular reference
        //http://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
        var representative = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        //---------------
        organisation.representatives.push(representative);
        organisation.save()
          .then(function(result) {
            console.log("save organisation succeed");
          });

        user.representOrganisations.push(organisation);

        user.save().then(function(result) {
          console.log("save representative succeed");
        });
      } else {
        $scope.input.repeatedError = true;
      }
    }
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
    $scope.checkRemoveAll = function() {
      angular.forEach($scope.reps, function(rep) {
        rep.selected = true;
      });
      $scope.state = {
        check: false
      };
    };

    $scope.unCheck = function() {
      angular.forEach($scope.reps, function(rep) {
        rep.selected = false;
      });

      $scope.state = {
        check: true
      };
    };

    $scope.addUser = function(rep) {
      rep.selected = !rep.selected;
    };

    $scope.removeInvoke = function() {
      $scope.state.dialog = true;
    };

    $scope.removeRepresentative = function() {
      //TODO: server remove
      for (var i = 0; i < $scope.reps.length; i++) {
        var rep = $scope.reps[i];
        if (rep.selected === true) {
          var index = findObject(organisation.representatives, rep);
          if (index !== -1) {
            organisation.representatives.splice(index, 1);

          }
        }
      }
      organisation.save().then(function() {
        console.log(organisation);
      });
      $scope.deleteReset();
    };

    $scope.deleteReset = function() {
      $scope.state = {
        check: true,
        dialog: false
      };
    };
  }
]);