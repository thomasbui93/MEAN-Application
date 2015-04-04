/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
describe('ngoEventCreateController', function() {
    var scope;
    var controller;
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('ngoEventCreateController', {
            $scope: scope
        });
    }));
    describe('define variables: ', function(){
       it('should define currentEvent', function(){
           expect(scope.currentEvent).toBeDefined();
       }) ;
        it('should define errors', function(){
            expect(scope.errors).toBeDefined();
        }) ;
        it('should define success', function(){
            expect(scope.success).toBeDefined();
            expect(scope.success).toEqual(false);
        });
    });
    describe('saveEvent method:', function(){
        it('should turn success to true if no error found: ', function(){
            scope.currentEvent = {
                id: '1',
                date: new Date("October 20, 2015"),
                name: 'Food catering free',
                phone: '099 222 3333',
                location: 'Hanhitie 17H B14, Oulu, Finland',
                description: "Morbi in sem quis dui pla Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat."
            };
            scope.saveEvent();
            expect(scope.success).toEqual(true);
        });
    })
});