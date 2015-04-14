/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
describe('Validation service unit test', function(){
    var validation;
    var user;
    var ERRORS;

    beforeEach(angular.mock.module('voluntr'));

    beforeEach(angular.mock.inject(function($injector){
        validation = $injector.get('Validation');
        user = {
            name: 'Bui Dang Khoa',
            email: 'test@email.com',
            address: 'Oulu, Finland',
            phone: '909990909',
            birthday: Date("October 13, 1993"),
            skillSet: ['Skill Dummy ', 'Skill Expert', 'Skill Average'],
            interestSet: ['Dummy Interest', 'wimpy interest ']
        };
        ERRORS = $injector.get('ERRORS');
    }));

    describe('Validation. checkEmail', function(){
        it('should return true if the email is match', function(){
            user.email = 'abc@xyz.mnq';
            expect(validation.checkEmail(user)).toEqual(true);
        });

        it('should return false if the email is not match', function(){
            user.email = 'abc@some';
            expect(validation.checkEmail(user)).toEqual(false);
        });

        it('should return false if the email is not match', function(){
            user.email = 'abc.xyz';
            expect(validation.checkEmail(user)).toEqual(false);
        });

        it('should return false if the email is not match', function(){
            user.email = 'abcxyz';
            expect(validation.checkEmail(user)).toEqual(false);
        });
    });

    describe('Validation: checkPassword', function(){
        it('should return true if the password is match', function(){
            user.pwd = 'ABCabc12300324';
            expect(validation.checkPassword(user)).toEqual(true);
        });
        
        it('should return false if the password is not match', function(){
            user.pwd = 'ABCabc';
            expect(validation.checkPassword(user)).toEqual(false);
        });
    });

    describe('validation: checkPhone', function(){
        it('should return true if a phone number is match', function () {
            user.phone = '090 090 1001';
            expect(validation.checkPhone(user)).toEqual(true);
        });

        it('should return false if a phone number is not match', function(){
            user.phone = 'a 0009090ds0909';
            expect(validation.checkPhone(user)).toEqual(false);
        });
    });

    describe('validation: check', function(){
        it('should return true if all the state violate of error is set to be false', function(){
            var error = ERRORS;
            error.name.violate = false;
            error.email.violate = false;
            error.passwordNotMatch.violate = false;
            error.passwordNotStrong.violate = false;
            error.phone.violate = false;
            expect(validation.check(error)).toEqual(true);
        });
        it('should return false if one of the state violate of error is set to be true', function(){
            var error = ERRORS;
            error.name.violate = true;
            expect(validation.check(error)).toEqual(false);
        });
    });

   describe('validation: checkBirthdate', function() {
        it('should return false if null date is passed', function() {
            user.birthday = null;
            expect(validation.checkBirthdate(user)).toEqual(false);
        });

        it('should return true on valid date', function() {
            user.birthday = new Date("2/2/2000");
            expect(validation.checkBirthdate(user)).toEqual(true);
        });

        it('should return false if the date is in the future', function() {
            user.birthday = new Date("2/2/3300");
            expect(validation.checkBirthdate(user)).toEqual(false);
        });
   }); 
})