/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoJobManageController', ['$scope', '$state', 'organisation', 'recruitments', 'Restangular',
  function($scope, $state, organisation, recruitments, Restangular) {
    $scope.currentNGO = $scope.$parent.currentNGO || {};

    $scope.jobs = recruitments;
    $scope.delete = {
      state: false,
      job: null,
      error: false
    };

    $scope.viewVolunteers = function(job) {
      job.state.candidate = !job.state.candidate;
    };

    $scope.invokeDelete = function(job) {
      $scope.delete = {
        state: true,
        job: job,
        error: false
      };
    };

    $scope.deleteReset = function() {
      $scope.delete = {
        state: false,
        job: null,
        error: false
      };
    };

    $scope.deleteJob = function() {
      var index = -1;
      var deleteID = null;
      for (var i = 0; i < organisation.recruitments.length; i++) {
        if (organisation.recruitments[i]._id === $scope.delete.job._id) {
          index = i;
          deleteID = organisation.recruitments[i]._id;
        }
      }
      if (index > -1) {
        organisation.recruitments.splice(index, 1);
        organisation.save().then(function() {
          Restangular.one('api/recruitments', deleteID)
            .remove().then(function() {
              $scope.jobs = organisation.recruitments;
              $scope.deleteReset();
            });
        });
      }

    };
    $scope.backToManage = function() {
      $state.transitionTo('ngoDashboard.jobManage', {
        id: $scope.currentJob._id,
        orgId: organisation._id
      });
    };
  }
]).controller('ngoJobEditController', ['$scope', '$state', '$stateParams', 'JOB_ERRORS', 'Validation', '$timeout', 'recruitment', 'organisation',
  function($scope, $state, $stateParams, JOB_ERRORS, Validation, $timeout, recruitment, organisation) {
    $scope.currentJob = recruitment;
    $scope.currentJob.input = {
      startDate: new Date($scope.currentJob.startDate),
      endDate: new Date($scope.currentJob.endDate)
    }
    $scope.errors = angular.copy(JOB_ERRORS);
    $scope.success = false;

    $scope.checkError = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentJob);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentJob, 20);

      if ($scope.currentJob.input.startDate > $scope.currentJob.input.endDate) {
        $scope.errors.time.violate = true;
      } else {
        $scope.errors.time.violate = false;
      }
    };

    $scope.saveJob = function() {
      $scope.checkError();
      if (Validation.checkFinal($scope.errors)) {
        $scope.currentJob.startDate = $scope.currentJob.input.startDate;
        $scope.currentJob.endDate = $scope.currentJob.input.endDate;
        console.log($scope.currentJob);
        $scope.currentJob.save().then(function() {
          $scope.success = true;
          $timeout(function() {
            $state.transitionTo('ngoDashboard.jobManage', {
              id: $scope.currentJob._id,
              orgId: organisation._id
            });
          }, 1500);
        });
      }
    };
  }
]).controller('ngoJobCreateController', ['$scope', '$state', '$stateParams', 'JOB_ERRORS', 'Validation', '$timeout', 'Restangular', 'organisation',
  function($scope, $state, $stateParams, JOB_ERRORS, Validation, $timeout, Restangular, organisation) {
    $scope.currentJob = {
      name: null,
      email: null,
      description: null,
      endDate: null,
      startDate: null,
      phone: null
    };

    $scope.errors = angular.copy(JOB_ERRORS);
    $scope.success = false;

    $scope.checkError = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentJob);
      $scope.errors.description.violate = Validation.checkDescription($scope.currentJob, 20);
      if ($scope.currentJob.startDate > $scope.currentJob.endDate) {
        $scope.errors.time.violate = true;
      } else {
        $scope.errors.time.violate = false;
      }
    };

    $scope.saveJob = function() {
      $scope.checkError();
      console.log($scope.currentJob.startDate);
      if (Validation.checkFinal($scope.errors)) {
        Restangular.all('api/recruitments').post({
          name: $scope.currentJob.name,
          email: $scope.currentJob.email,
          startDate: new Date($scope.currentJob.startDate),
          endDate: new Date($scope.currentJob.endDate),
          phone: $scope.currentJob.phone,
          description: $scope.currentJob.description
        }).then(function(result) {
          organisation.recruitments.push(result);
          organisation.save().then(function() {
            $scope.success = true;
            $timeout(function() {
              $state.transitionTo('ngoDashboard.jobManage', {
                id: $scope.currentJob._id,
                orgId: organisation._id
              });
            }, 1500);
          });
        });
      }
    };
  }
]);