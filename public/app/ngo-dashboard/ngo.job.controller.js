/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
angular.module('voluntr').controller('ngoJobManageController', ['$scope', '$state',
  function($scope, $state) {
    $scope.currentNGO = $scope.$parent.currentNGO || {};
    $scope.currentNGO.jobs = [{
      id: '1',
      position: 'Volunteer Job',
      address: 'Oulu Halli, Oulu',
      description: 'Capecare runs a cafe twice a week for residents. ' +
        'This role involves making coffee and tea and serving cakes to residents at the cafe.',
      postDate: new Date('24 Feb 2015'),
      expireDate: new Date('30 Feb 2015'),
      phone: '123 234 1111',
      volunteers: [{
        id: '12',
        name: 'Test User 1'
      }, {
        id: '13',
        name: 'Test User 2'
      }, {
        id: '14',
        name: 'Test User 3'
      }],
      state: {
        candidate: false
      }
    }, {
      id: '2',
      position: 'Volunteer Job',
      address: 'Oulu Halli, Oulu',
      description: 'Capecare runs a cafe twice a week for residents. ' +
        'This role involves making coffee and tea and serving cakes to residents at the cafe.',
      postDate: new Date('24 Feb 2015'),
      expireDate: new Date('30 Feb 2015'),
      phone: '123 234 1111',
      volunteers: [{
        id: '12',
        name: 'Test User 1'
      }, {
        id: '13',
        name: 'Test User 2'
      }, {
        id: '14',
        name: 'Test User 3'
      }],
      state: {
        candidate: false
      }
    }];
    $scope.delete = {
      state: false,
      jobs: []
    };
    $scope.viewVolunteers = function(job) {
      job.state.candidate = !job.state.candidate;
    };
    $scope.invokeDelete = function(job) {
      $scope.delete = {
        state: true,
        jobs: [job]
      };
    };
    $scope.deleteReset = function() {
      $scope.delete = {
        state: false,
        jobs: []
      };
    };
    $scope.deleteJob = function(jobs) {
      jobs.forEach(function(job) {
        //TODO: backEnd delete goes here
        //simulation:
        var index = $scope.currentNGO.jobs.indexOf(job);
        if (index > -1) {
          $scope.currentNGO.jobs.splice(index, 1);
        }
      });
      $scope.deleteReset();
    };
    $scope.editTransit = function(id) {
      $state.transitionTo('ngoDashboard.jobEdit', {
        id: id
      });
    };
    $scope.fetchJobs = function() {
      //TODO: get jobs from server
    };
  }
]).controller('ngoJobEditController', ['$scope', '$state', '$stateParams', 'JOB_ERRORS', 'Validation', '$timeout',
  function($scope, $state, $stateParams, JOB_ERRORS, Validation, $timeout) {
    $scope.currentJob = {
      id: '1',
      position: 'Volunteer Job',
      address: 'Oulu Halli, Oulu',
      description: 'Capecare runs a cafe twice a week for residents. ' +
        'This role involves making coffee and tea and serving cakes to residents at the cafe.',
      postDate: new Date('24 Feb 2015'),
      expireDate: new Date('30 Feb 2015'),
      phone: '123 234 1111'
    };
    $scope.errors = angular.copy(JOB_ERRORS);
    $scope.success = false;
    $scope.fetchJob = function(id) {
      //Todo retrieve the event with the specific id
    };
    $scope.checkError = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentJob);
      $scope.errors.description.violate = !Validation.checkDescription($scope.currentJob, 20);
      $scope.errors.phone.violate = !Validation.checkPhone($scope.currentJob);
      if ($scope.currentJob.location === '' || $scope.currentJob.location === null) {
        $scope.errors.location.violate = true;
      } else {
        $scope.errors.location.violate = false;
      }
      if ($scope.currentJob.postDate >= $scope.currentJob.expireDate) {
        $scope.errors.time.violate = true;
      } else {
        $scope.errors.time.violate = false;
      }
    };
    $scope.saveJob = function() {
      $scope.checkError();
      if (Validation.checkFinal($scope.errors)) {
        //TODO: save job server work
        $scope.success = true;
        $timeout(function() {
          $state.transitionTo('ngoDashboard.jobManage');
        }, 1500);
      }
    };
  }
]).controller('ngoJobCreateController', ['$scope', '$state', 'JOB_ERRORS', 'Validation', '$timeout',
  function($scope, $state, $stateParams, JOB_ERRORS, Validation, $timeout) {
    $scope.currentJob = {
      id: null,
      position: null,
      address: null,
      description: null,
      postDate: null,
      expireDate: null,
      phone: null
    };
    $scope.errors = angular.copy(JOB_ERRORS);
    $scope.success = false;
    $scope.checkError = function() {
      $scope.errors.name.violate = Validation.checkName($scope.currentJob);
      $scope.errors.description.violate = !Validation.checkDescription($scope.currentJob, 20);
      $scope.errors.phone.violate = !Validation.checkPhone($scope.currentJob);
      if ($scope.currentJob.location === '' || $scope.currentJob.location === null) {
        $scope.errors.location.violate = true;
      } else {
        $scope.errors.location.violate = false;
      }
      if ($scope.currentJob.postDate >= $scope.currentJob.expireDate) {
        $scope.errors.time.violate = true;
      } else {
        $scope.errors.time.violate = false;
      }
    };
    $scope.saveJob = function() {
      $scope.checkError();
      if (Validation.checkFinal($scope.errors)) {
        //TODO: save job server work
        $scope.success = true;
        $timeout(function() {
          $state.transitionTo('ngoDashboard.jobManage');
        }, 1500);
      }
    };
  }
]);