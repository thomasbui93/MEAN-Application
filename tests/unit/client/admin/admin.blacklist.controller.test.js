/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
describe('adminBlacklistController', function(){
    var scope;
    var controller;
    var blockedUser;
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        controller = $controller('adminBlacklistController', {
            $scope: scope
        });
        blockedUser = {
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
    }));
    describe('define variables: ',function(){
        it('defined displayArray', function(){
            expect(scope.displayArray).toBeDefined();
        });
        it('defined option', function(){
            expect(scope.option).toBeDefined();
        });
        it('defined removedUser', function(){
            expect(scope.removedUsers).toBeDefined();
        });
        it('defined userShow', function(){
            expect(scope.userShow).toBeDefined();
        });
        it('defined dialogShow', function(){
            expect(scope.dialogShow).toBeDefined();
        });
    });
    describe('check method:', function(){
        it('alter the option.users state if the parameter set to be "user"', function(){
            var state = scope.option.users;
            scope.check('user');
            expect(scope.option.users).toEqual(!state);
        });
        it('set scope.displayArray to exclude the scope.blocked.users if option.users set to be false', function(){
           scope.blocked = blockedUser;
           scope.check('user');
           var status = false;
           angular.forEach(scope.blocked.users, function(user){
               if(scope.displayArray.indexOf(user)>-1){
                   status = true;
               }
           });
           expect(status).toEqual(false);
        });
        it('set scope.displayArray to exclude the scope.blocked.orgs if option.orgs set to be false', function(){
            scope.blocked = blockedUser;
            scope.check('org');
            var status = false;
            angular.forEach(scope.blocked.orgs, function(user){
                if(scope.displayArray.indexOf(user)>-1){
                    status = true;
                }
            });
            expect(status).toEqual(false);
        });
    });
    describe('showDialog', function(){
        it('should alter state of useShow and dialogShow', function(){
            var user = {}
           scope.showDialog(user);
            expect(scope.dialogShow).toEqual(true);
            expect(scope.userShow).toEqual(false);
        });
        it('should push user to the array removedUser', function(){
            var user = {
                name:' name',
                id: 'adad'
            };
            scope.showDialog(user);
            expect(scope.removedUsers.indexOf(user)).toBeGreaterThan(-1);
        });
    });
    describe('cancelDialog', function(){
        it('should alter state of useShow and dialogShow', function(){
            scope.cancelDialog();
            expect(scope.dialogShow).toEqual(false);
            expect(scope.userShow).toEqual(true);
        });
    });

})