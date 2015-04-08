'use strict';

angular.module('voluntr').constant('JOB_ERRORS', {
  name: {
    violate: false,
    message: 'Please enter name of your Job'
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
    message: "The given time is not available"
  },
  description: {
    violate: false,
    message: 'Your description should be informative (more than 20 words)'
  }
});