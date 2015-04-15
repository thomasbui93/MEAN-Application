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
    message: 'The passwords you entered don\'t match!'
  },
  passwordNotStrong: {
    violate: false,
    message: 'Your password should be at least 8 characters long'
  },
  phone: {
    violate: false,
    message: 'Invalid phone number'
  },
  location: {
    violate: false,
    message: 'You should enter your location'
  },
  birthday: {
    violate: false,
    message: 'That doesn\'t seem like a valid birthday!'
  }
});