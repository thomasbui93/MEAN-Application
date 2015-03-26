/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
describe('userDashboardController', function(){
    var scope;
    var validation;
    var ERRORS;
    var controller;
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(angular.mock.inject(function($injector, $controller, $rootScope){
        validation = $injector.get('Validation');
        ERRORS = $injector.get('ERRORS');
        scope = $rootScope.$new();
        controller = $controller('userDashboardController', {
            $scope: scope
        });
    }));

    describe('define variables test', function(){
        it('should defined scope.edit', function(){
            expect(scope.edit).toBeDefined();

            expect(scope.edit).toEqual({
                show: false,
                state: 'Save'
            });
        });

        it('should defined scope.user', function(){
            expect(scope.user).toBeDefined();
        });

        it('should defined scope.errors as ERRORS', function(){
            expect(scope.errors).toEqual(ERRORS);
        });

        it('should defined scope.notifications', function(){
            expect(scope.notifications).toBeDefined();
        });

        it('should defined scope.activities', function(){
            expect(scope.activities).toBeDefined();
        });
    });

    describe('scope.removeSkill', function(){
        it('should remove the skill if it is in the scope.user.skillSet', function(){
            var skill = 'Skill Expert';

            scope.removeSkill(skill);
            expect(scope.user.skillSet.indexOf(skill)).toEqual(-1);
        });

        it('should do nothing if the skill is not in the scope.user.skillSet', function(){
            var skill ='test';
            var cloneSkillSet = scope.user.skillSet;

            scope.removeSkill(skill);
            expect(scope.user.skillSet).toEqual(cloneSkillSet);
        });
    });

    describe('scope.removeInterest', function(){
        it('should remove the interest if it is in the scope.user.interestSet', function(){
            var interest = 'Dummy Interest';

            scope.removeInterest(interest);
            expect(scope.user.interestSet.indexOf(interest)).toEqual(-1);
        });

        it('should do nothing if the interest is not in the scope.user.interestSet', function(){
            var interest ='test';
            var cloneInterestSet = scope.user.interestSet;

            scope.removeInterest(interest);
            expect(scope.user.interestSet).toEqual(cloneInterestSet);
        });
    });
    describe('scope.editInformation', function(){
        it('should change the scope.edit as desired', function(){
            scope.editInformation();
            expect(scope.edit).toEqual({
                show: true,
                state: 'Save'
            });
        });
    });
    describe('scope.saveInformation', function(){
        it('should change error.name.violate to true if the scope.user.name is empty', function(){
            scope.user.name = '';
            scope.saveInformation();

            expect(scope.errors.name.violate).toEqual(true);
        });
        it('should change error.email.violate to true if the scope.user.email is invalid', function(){
            scope.user.email = 'wrong email';
            scope.saveInformation();

            expect(scope.errors.email.violate).toEqual(true);
        });

        it('should change the scope.edit to assigned value and after 300ms it should change back to another value if succeed', function(){
            scope.saveInformation();

            expect(scope.edit).toEqual({
                show: false,
                state: 'Save'
            });
        })
    })
})