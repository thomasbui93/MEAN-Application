/**
 * Created by Bui Dang Khoa on 3/29/2015.
 */
'use strict';
angular.module('voluntr').controller('adminReportController', ['$scope',
  function($scope) {
    $scope.reportUsers = [{
      user: {
        name: 'Bui Dang Khoa',
        id: '1'
      },
      reporter: {
        name: 'Thomas Bui',
        id: '2'
      },
      date: new Date('Feb 22 2015'),
      reason: 'Some dump reason',
      state: {
        ignore: {
          state: false,
          text: 'ignore'
        },
        block: {
          state: false,
          text: 'block'
        }
      }
    }, {
      user: {
        name: 'Bui Dang Khoa',
        id: '1'
      },
      reporter: {
        name: 'Thomas Bui',
        id: '2'
      },
      date: new Date('Feb 22 2015'),
      reason: 'Some dump reason',
      state: {
        ignore: {
          state: false,
          text: 'ignore'
        },
        block: {
          state: false,
          text: 'block'
        }
      }
    }, {
      user: {
        name: 'Bui Dang Khoa',
        id: '1'
      },
      reporter: {
        name: 'Thomas Bui',
        id: '2'
      },
      date: new Date('Feb 22 2015'),
      reason: 'Some dump reason',
      state: {
        ignore: {
          state: false,
          text: 'ignore'
        },
        block: {
          state: false,
          text: 'block'
        }
      }
    }];
    $scope.dialogShow = false;
    $scope.state = {
      ignore: {
        state: false,
        text: 'ignore'
      },
      block: {
        state: false,
        text: 'block'
      }
    };
    $scope.ignoreTrigger = function(user) {
      user.state.ignore.state = !user.state.ignore.state;
      if (user.state.ignore.state) {
        user.state.ignore.text = 'ignored';
      } else {
        user.state.ignore.text = 'ignore';
      }
    };
    $scope.ignoreServerHandler = function(user) {

    };
    $scope.blockTrigger = function(user) {
      user.state.block.state = !user.state.block.state;
      if (user.state.block.state) {
        user.state.block.text = 'blocked';
      } else {
        user.state.block.text = 'block';
      }
    };
    $scope.saveWork = function() {

    };
  }
]);