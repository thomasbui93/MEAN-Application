/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
describe('filter: Past', function() {
        var Past;
        var testDateArray = [{
            date: new Date("October 20, 2015"),
            name: 'Food catering free'
        }, {
            date: new Date("February 26, 2015"),
            name: 'Help children'
        }, {
            date: new Date("March 11, 2015"),
            name: 'Help elderly'
        }, {
            date: new Date("July 11, 2014"),
            name: 'Other event'
        }];

        beforeEach(angular.mock.module('voluntr'));
        beforeEach(angular.mock.inject(function($filter){
            Past = $filter('Past');
        }))

        it('should filter out the array of date in the past if second parameter is set to true',function(){
            var output = Past(testDateArray, true);
            var pastObject = [{
                date: new Date("February 26, 2015"),
                name: 'Help children'
            }, {
                date: new Date("March 11, 2015"),
                name: 'Help elderly'
            }, {
                date: new Date("July 11, 2014"),
                name: 'Other event'
            }];

            expect(output).toEqual(pastObject);
        });
        it('should filter out the array of date in the past if second parameter is set to true',function(){
            var futureObject = [{
                 date: new Date("October 20, 2015"),
                 name: 'Food catering free'
             }];
            expect(Past(testDateArray, false)).toEqual(futureObject);
        })
    }
)