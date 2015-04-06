/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
describe('adminBlacklistController', function(){
    var scope;
    var controller;
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('adminReportController', {
            $scope: scope
        });
    }));
    describe('define variables : ', function(){
        it('should define dialogShow', function(){
            expect(scope.dialogShow).toBeDefined();
        });
        it('define state and set to default', function(){
            expect(scope.state).toBeDefined();
            expect(scope.state).toEqual({
                ignore: {
                    state: false,
                    text: 'ignore'
                },
                block: {
                    state: false,
                    text: 'block'
                }
            });
        });
    });
    describe('ignoreTrigger method: ', function(){
        var user;
        beforeEach(function(){
           user = {
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
           }
        });
        it('change the state of user.state.ignore', function(){
            var originalState = user.state.ignore.state;
            scope.ignoreTrigger(user);
            expect(user.state.ignore.state).toEqual(!originalState);
        });
        it('change the text if the user.state.ignore is false', function(){
            scope.ignoreTrigger(user);
            expect(user.state.ignore.text).toEqual('ignored');
        });
    });
    describe('blockTrigger method: ', function(){
        var user;
        beforeEach(function(){
            user = {
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
            }
        });
        it('change the state of user.state.block', function(){
            var originalState = user.state.block.state;
            scope.blockTrigger(user);
            expect(user.state.block.state).toEqual(!originalState);
        });
        it('change the text if the user.state.ignore is false', function(){
            scope.blockTrigger(user);
            expect(user.state.block.text).toEqual('blocked');
        });
    });
});