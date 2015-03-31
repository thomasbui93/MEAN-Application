/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
angular.module('voluntr').constant('NGO_ERRORS', {
  name: {
    violate: false,
    message: 'Please enter name of your Organisation'
  },
  email: {
    violate: false,
    message: 'You must provide an appropriate email.'
  },
  phone: {
    violate: false,
    message: 'Your phone number is not found.'
  },
  description: {
    violate: false,
    message: 'Your description should be informative (more than 30 words)'
  }
})
  .constant('EVENT_ERRORS', {
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