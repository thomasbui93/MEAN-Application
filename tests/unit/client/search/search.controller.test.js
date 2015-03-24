/**
 * Created by Bui Dang Khoa on 3/18/2015.
 */
'use strict';
describe('Testing Search Controller', function(){
    var scope;
    var controller;

    var compareArray = function(array1, array2){
        var match = true;
        if(!angular.equals(array1, array2)){
            array1.forEach(function(element){
                if(array2.indexOf(element)==-1){
                    match = false;
                }
            })
        }
        return match;
    }

    beforeEach(angular.mock.module('voluntr'));

    beforeEach(inject(function($injector, $rootScope, $controller){
        scope = $rootScope.$new();
        controller = $controller('searchController', {
            $scope: scope
        })
    }));

    describe('Defined variables: ', function(){
        it('should have $scope.search', function(){
            expect(scope.search).toBeDefined();
        });

        it('should have $scope.results', function(){
            expect(scope.results).toBeDefined();
        } );
    })

    describe(' scope:removeInterest', function(){
        var randElement;
        beforeEach(inject(function(){
            scope.addInterest(scope.search.Interests[0]);
            scope.addInterest(scope.search.Interests[1]);
            randElement = scope.search.searchInterests[
                Math.floor(
                    Math.random()*scope.search.searchInterests.length)];
            scope.removeInterest(randElement);
        }));

        it('should have remove the element added before in the scope.searchInterests', function(){
            expect(scope.search.searchInterests.indexOf(randElement)).toEqual(-1);
        });

        it('should return the element to scope.Interests:', function(){
            expect(scope.search.Interests.indexOf(randElement)/Math.abs(scope.search.Interests.indexOf(randElement))).toEqual(1);
        });
    })

    describe('scope:addInterest', function(){
        var randElement ;
        beforeEach(inject(function(){
            randElement = scope.search.Interests[
                Math.floor(
                    Math.random()*scope.search.Interests.length)];
            scope.addInterest(randElement);
        }));

        it('should add element from the scope.Interest to the scope.search.searchInterests', function(){
            expect((scope.search.searchInterests.indexOf(randElement)+1)/Math.abs(scope.search.Interests.indexOf(randElement))).toEqual(1);
        });

        it('should remove element from the scope.Interest to the scope.search.Interests', function(){
            expect(scope.search.Interests.indexOf(randElement)/Math.abs(scope.search.Interests.indexOf(randElement))).toEqual(-1);
        });
    })

    describe('scope: unCheck', function(){
        var randElement;
        var originalInterests;
        beforeEach(inject(function(){
            originalInterests = scope.search.Interests;
            randElement = scope.search.Interests[
                Math.floor(
                    Math.random()*scope.search.Interests.length)];
            scope.addInterest(randElement);
            scope.unCheck();
        }));

        it('should remove all the element from the scope.search.searchInterests', function () {
            expect(scope.search.searchInterests.length).toEqual(0);
        });

        it('should reverse the scope.search.Interests to the original array', function(){
            expect(compareArray(originalInterests, scope.search.Interests)).toEqual(true);
        });
    })

    describe('scope: checkAll', function(){
        var randElement;
        var originalInterests;
        beforeEach(inject(function(){
            originalInterests = scope.search.Interests;
            randElement = scope.search.Interests[
                Math.floor(
                    Math.random()*scope.search.Interests.length)];
            scope.addInterest(randElement);
            scope.checkAll();
        }));

        it('should remove all the element from the scope.search.Interests', function(){
            expect(scope.search.Interests.length).toEqual(0);
        });

        it('should buff for the scope.search.searchInterests to be the original scope.search.Interests', function(){
            expect(compareArray(originalInterests, scope.search.searchInterests)).toEqual(true);
        });
    });

    describe('scope: sortAlphabet', function(){
        var originalResults;
        beforeEach(inject(function(){
            originalResults = scope.results;
            scope.sortAlphabet();
        }))
        it('should make the scope.results have the same element original array', function(){
            expect(compareArray(originalResults, scope.results)).toEqual(true);
        });
        it('should make the scope.results to have alphabet order in name', function(){
            var match = true;
            for(var i = 0; i < scope.results.length; i++ ){
                for(var j = 0; j < scope.results  ; j++  ){
                    if ( (j-i)(scope.results[j].name-scope.results[i].name) < 0){
                        match = false;
                    }
                }
            }
            expect(match).toEqual(true);
        });
    });

    describe('scope: sortTrending', function(){
        var originalResults;
        beforeEach(inject(function(){
            originalResults = scope.results;
            scope.sortTrending();
        }))

        it('should keep the scope.results have the same element original array', function(){
            expect(compareArray(originalResults, scope.results)).toEqual(true);
        });

        it('should make the scope.results have the trend order from big to small', function(){
            var match = true;
            for(var i = 0; i < scope.results.length; i++ ){
                for(var j = 0; j < scope.results  ; j++  ){
                    if ( (j-i)(scope.results[j].trend-scope.results[i].trend) > 0){
                        match = false;
                    }
                }
            }
            expect(match).toEqual(true);
        });
    });

    describe('scope: sortNew', function(){
        var originalResults;
        beforeEach(inject(function(){
            originalResults = scope.results;
            scope.sortNew();
        }))

        it('should keep the scope.results have the same element original array', function(){
            expect(compareArray(originalResults, scope.results)).toEqual(true);
        });

        it('should make the scope.results have the trend order from big to small', function(){
            var match = true;
            for(var i = 0; i < scope.results.length; i++ ){
                for(var j = 0; j < scope.results  ; j++  ){
                    if ( (j-i)(scope.results[j].establish-scope.results[i].establish) > 0){
                        match = false;
                    }
                }
            }
            expect(match).toEqual(true);
        });
    });
})