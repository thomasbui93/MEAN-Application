/**
 * Created by Bui Dang Khoa on 3/31/2015.
 */
'use strict';
describe('ngoEventEditController', function(){
    var scope;
    var controller;
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(angular.mock.inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        controller = $controller('ngoEventEditController', {
            $scope: scope
        });
    }));
    describe('define variables: ', function(){
        it('should define the scope.errors', function(){
            expect(scope.errors).toBeDefined();
        });
        it('should define the scope.success and default to be false', function(){
            expect(scope.success).toBeDefined();
            expect(scope.success).toEqual(false);
        });
    });
    describe('saveEvent method: ', function(){
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
    });
})