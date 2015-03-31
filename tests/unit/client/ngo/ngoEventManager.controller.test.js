/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
describe('ngoEventManagerController unit test', function(){
   var scope;
   var controller;
   var $state;
   var $rootScope;
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(angular.mock.inject(function($controller, $rootScope, _$state_, _$rootScope_){
        scope = $rootScope.$new();
        $state = _$state_;
        controller = $controller('ngoEventManageController', {
            $scope: scope,
            $state: $state
        });
        $rootScope = _$rootScope_;
    }));
    describe('define variable in the function', function(){
       it('should define the scope.delete', function(){
           expect(scope.delete).toBeDefined();
       }) ;
    });
    describe('invokeDelete method: ', function(){
       it('should pass the event to the scope.delete and turn state to be true: ', function(){
           var event = {
               id: '1',
               date: new Date("October 20, 2015"),
               name: 'Food catering free',
               location: 'Hanhitie 17H B14, Oulu, Finland',
               showVolunteer: false,
               volunteers: [{
                   id: '1',
                   name: 'Marry Jane',
                   image: 'aasdasd'
               }]
           };
          scope.invokeDelete(event);
          expect(scope.delete).toEqual({
              state: true,
              events: [event]
          }) ;
       }) ;
    });
    describe('deleteReset method: ', function(){
        it('should purge the events to the scope.delete and turn state to be false:', function(){
            scope.deleteReset();
            expect(scope.delete).toEqual({
                state: false,
                events: []
            });
        });
    });
    describe('viewVolunteers', function(){
        it('alter the boolean state of event.showVolunteer', function(){
            var event = {
                id: '1',
                date: new Date("October 20, 2015"),
                name: 'Food catering free',
                location: 'Hanhitie 17H B14, Oulu, Finland',
                showVolunteer: false,
                volunteers: [{
                    id: '1',
                    name: 'Marry Jane',
                    image: 'aasdasd'
                }, {
                    id: '3',
                    name: 'Marry Currie',
                    image: 'aasdasd'
                }, {
                    id: '3',
                    name: 'Marry Currie',
                    image: 'aasdasd'
                }]
            };
            scope.viewVolunteers(event);
            expect(event.showVolunteer).toEqual(true);
        });
    });
});