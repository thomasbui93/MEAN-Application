/**
 * Created by Bui Dang Khoa on 3/21/2015.
 */
describe('volunteerSignUpController unit test', function(){
    var scope,
        controller;
    //
    beforeEach(angular.mock.module('voluntr'));
    beforeEach(inject(function ($injector, $controller, $rootScope) {
        scope= $rootScope.$new();
        controller = $controller('volunteerSignUpController', {
            $scope: scope
        });
    }));
    describe('Defines variables:', function(){
        it('Should have $scope.user', function(){
            expect(scope.user).toBeDefined();
        })
        it('Should have $scope.input', function(){
            expect(scope.input).toBeDefined();
        })
    })
    describe('scope : createSkill', function(){
        beforeEach(inject(function(){
            scope.input.skill = 'Test Skill';
        }));

        it('Should have push the $scope.input.skill to $scope.user.skillSet', function(){

        });
    });
    describe('scope: checkAll: ', function(){
        it('should set violate state of all properties in error objects to be false', function(){
            scope.user = {
                name: 'Test User',
                email: 'test@email.com',
                pwd: 'abcABC1900',
                repwd: 'abcABC1900',
                address: 'Hanhitie',
                phone: '900 000 090',
                birthday: 'Feb 27 9000',
                skillSet: [],
                interestSet: []
            };

            expect(scope.error.name.violate).toEqual(false);
            expect(scope.error.email.violate).toEqual(false);
            expect(scope.error.passwordNotMatch.violate).toEqual(false);
            expect(scope.error.passwordNotStrong.violate).toEqual(false);
            expect(scope.error.phone.violate).toEqual(false);
        });

        it('should set error.name.violate to be true if name is not match', function(){
            scope.user.name = '';
            scope.checkAll();
            expect(scope.error.name.violate).toEqual(true);
        });

        it('should set error.email.violate to be true if email is not match requirements', function(){
            scope.user.email = 'adasd';
            scope.checkAll();
            expect(scope.error.email.violate).toEqual(true);
        });

        it('should set error.passwordNotMatch.violate to be true if password is match', function(){
            scope.user.pwd = 'test';
            scope.user.repwd = '#test';
            scope.checkAll();
            expect(scope.error.passwordNotMatch.violate).toEqual(true);
        });

        it('should set error.passwordNotStrong.violate to be true if password is not match requirements', function(){
            scope.user.pwd = 'sometest';
            scope.checkAll();
            expect(scope.error.passwordNotStrong.violate).toEqual(true);
        });

        it('should set error.phone.violate to be true if phone is not match requirements', function(){
            scope.user.phone = 'asdads111';
            scope.checkAll();
            expect(scope.error.phone.violate).toEqual(true);
        });
    })

})
