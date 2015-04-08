'use strict';

angular.module('voluntr').constant('EVENT_ERRORS', {
  name: {
    violate: false,
    message: 'Please enter name of your Event'
  },
  location: {
    violate: false,
    message: 'Your location should be defined'
  },
  phone: {
    violate: false,
    message: 'Your phone number is not found.'
  },
  time: {
    violate: false,
    message: "The given time is invalid or in the past"
  },
  description: {
    violate: false,
    message: 'Your description should be informative (more than 30 words)'
  }
});