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
    describe('scope: checkEmail', function(){
        it('should return true if the email is match', function(){
            scope.user.email = 'abc@xyz.mnq';
            expect(scope.checkEmail()).toEqual(true);
        });

        it('should return false if the email is not match', function(){
            scope.user.email = 'abc@some';
            expect(scope.checkEmail()).toEqual(false);
        });

        it('should return false if the email is not match', function(){
            scope.user.email = 'abc.xyz';
            expect(scope.checkEmail()).toEqual(false);
        });

        it('should return false if the email is not match', function(){
            scope.user.email = 'abcxyz';
            expect(scope.checkEmail()).toEqual(false);
        });
    });

    describe('scope: checkPassword', function(){
        it('should return true if the password is match', function(){
            scope.user.password = 'ABCabc12300324';
            expect(scope.checkPassword()).toEqual(true);
        });
        it('should return false if the password is not match', function(){
            scope.user.password = 'ABCabc';
            expect(scope.checkPassword()).toEqual(false);
        });
        it('should return false if the password is not match', function(){
            scope.user.password = 'ABC12300324';
            expect(scope.checkPassword()).toEqual(false);
        });
        it('should return false if the password is not match', function(){
            scope.user.password = 'abc12300324';
            expect(scope.checkPassword()).toEqual(false);
        });

        it('should return false if the password is not match', function(){
            scope.user.password = 'ABCabc1';
            expect(scope.checkPassword()).toEqual(false);
        });
    });
    describe('scope: checkPhone', function(){
        it('should return true if a phone number is match', function () {
            scope.user.phone = '090 090 1001';
            expect(scope.checkPhone()).toEqual(true);
        });

        it('should return false if a phone number is not match', function(){
            scope.user.phone = 'a 0009090ds0909';
            expect(scope.checkPhone()).toEqual(false);
        });

    })
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

    describe('scope: check', function(){
        it('should return true if all the state violate of error is set to be false', function(){
            scope.error.name.violate = false;
            scope.error.email.violate = false;
            scope.error.passwordNotMatch.violate = false;
            scope.error.passwordNotStrong.violate = false;
            scope.error.phone.violate = false;
            expect(scope.check()).toEqual(true);
        });
        it('should return false if one of the state violate of error is set to be true', function(){
            scope.error.name.violate = true;
            expect(scope.check()).toEqual(false);
        });
    })
})
