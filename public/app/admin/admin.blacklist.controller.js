/**
 * Created by Bui Dang Khoa on 3/29/2015.
 */
'use strict';
angular.module('voluntr').controller('adminBlacklistController', ['$scope',
  function($scope) {
    $scope.blocked = {
      users: [{
        id: '1',
        name: 'Johny Law',
        blocker: {
          id: 'admin1',
          name: 'Thomas Bui'
        },
        date: new Date('Feb 24 2014')
      }, {
        id: '5',
        name: 'Test User',
        blocker: {
          id: 'admin2',
          name: 'Another Admin'
        },
        date: new Date('Jan 24 2013')
      }, {
        id: '7',
        name: 'Test User 2',
        blocker: {
          id: 'admin1',
          name: 'Admin2'
        },
        date: new Date('Apr 24 2014')
      }, {
        id: '9',
        name: 'Kind One',
        blocker: {
          id: 'admin1',
          name: 'Thomas Bui'
        },
        date: new Date('Oct 24 2014')
      }, ],
      orgs: [{
        id: '5',
        name: 'Fake Org',
        blocker: {
          id: 'admin1',
          name: 'Thomas Bui'
        },
        date: new Date('Feb 24 2014')
      }, {
        id: '67',
        name: 'Junk Org',
        locker: {
          id: 'admin2',
          name: 'Another Admin'
        },
        date: new Date('Jan 24 2013')
      }, {
        id: '123',
        name: 'Dump Org',
        blocker: {
          id: 'admin1',
          name: 'Admin2'
        },
        date: new Date('Apr 24 2014')
      }, {
        id: '456',
        name: 'Fake One',
        blocker: {
          id: 'admin1',
          name: 'Thomas Bui'
        },
        date: new Date('Oct 24 2014')
      }, ]
    };
    $scope.displayArray = $scope.blocked.users.concat($scope.blocked.orgs);
    $scope.option = {
      users: true,
      orgs: true
    };
    $scope.check = function(param) {
      if (param == 'user') {
        $scope.option.users = !$scope.option.users;
      }
      if (param === 'org') {
        $scope.option.orgs = !$scope.option.orgs;
      }
      $scope.displayArray = [];
      angular.forEach($scope.option, function(value, key) {
        if (value === true) {
          $scope.displayArray = $scope.displayArray.concat($scope.blocked[key]);
        }
      });
    };
    $scope.removedUsers = [];
    $scope.userShow = true;
    $scope.dialogShow = false;
    $scope.showDialog = function(user) {
      $scope.userShow = false;
      $scope.dialogShow = true;
      //
      $scope.removedUsers.push(user);
    };
    $scope.cancelDialog = function() {
      $scope.userShow = true;
      $scope.dialogShow = false;
    };
    $scope.removeBlocked = function(users) {
      //TODO: server removes blocked users.
      users.forEach(function(user) {
        var index = $scope.blocked.users.indexOf(user);
        if (index > -1) {
          $scope.blocked.users.splice(index, 1);
          $scope.removedUsers = [];
        }
      });
      $scope.cancelDialog();
    };
  }
]);