'use strict';

angular.module('voluntr').constant('ERRORS', {
  name: {
    violate: false,
    message: 'You must enter your full name.'
  },
  email: {
    violate: false,
    message: 'You must provide an appropriate email.'
  },
  passwordNotMatch: {
    violate: false,
    message: 'Your password you enter is not match.'
  },
  passwordNotStrong: {
    violate: false,
    message: 'Your password should contain at least one number,one uppercase letter, one lowercase letter and have a strength of 8'
  },
  phone: {
    violate: false,
    message: 'Your phone number is not found.'
  },
  location: {
    violate: false,
    message: 'Your location must be defined.'
  },
  birthday: {
    violate: false,
    message: 'Your birthdate is not defined'
  }
});