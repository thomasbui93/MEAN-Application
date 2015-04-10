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
  },
  location: {
      violate: false,
      message: 'Your organisation should have a specific address.'
  }

});