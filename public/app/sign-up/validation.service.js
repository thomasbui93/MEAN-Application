/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
angular.module('voluntr').factory('Validation', function() {
  var validation = {

  };
  validation.checkName = function(user) {
    if (user.name === '' || user.name === null) {
      return true;
    } else {
      return false;
    }
  };
  validation.checkEmail = function(user) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(user.email);
  };

  validation.checkPassword = function(user) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test(user.password);
  };

  validation.checkPhone = function(user) {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(user.phone);
  };
  validation.checkDescription = function(user, length) {
    if (user.description === undefined) {
      //not found
      return true;
    } else {
      var array = user.description.split(" ");
      if (array.length < length) {
        return false;
      } else {
        return true;
      }
    }
  };
  validation.checkPast = function(user) {
    if (user.date <= new Date()) {
      return true;
    } else if (user.date === null) {
      return true;
    } else return false;
  };
  validation.check = function(error) {
    if (!error.email.violate && !error.name.violate && !error.passwordNotMatch.violate && !error.passwordNotStrong.violate && !error.phone.violate) {
      return true;
    } else {
      return false;
    }
  };
  validation.checkFinal = function(error) {
    var state = true;
    angular.forEach(error, function(property) {
      if (property.violate === true) {
        state = false;
      }
    })
    return state;
  }
  validation.checkWithoutPassword = function(error) {
    if (!error.email.violate && !error.name.violate && !error.phone.violate && !error.description.violate) {
      return true;
    } else {
      return false;
    }
  };
  return validation;
}).constant(
  'ERRORS', {
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
    }
  }
);