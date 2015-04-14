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
    return user.pwd ? user.pwd.length > 7 : false;
  };

  validation.checkPhone = function(user) {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(user.phone);
  };

  validation.checkDescription = function(user, length) {
    if (!user.description) {
      return true;
    } else {
      var array = user.description.split(' ');
      if (array.length < length) {
        return true;
      } else {
        return false;
      }
      console.log(array.length);
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
    angular.forEach(error, function(value, property) {
      if (value.violate) {
        state = false;
      }
    });
    return state;
  };

  validation.checkWithoutPassword = function(error) {
    if (!error.email.violate && !error.name.violate && !error.phone.violate && !error.description.violate) {
      return true;
    } else {
      return false;
    }
  };

  validation.checkBirthdate = function(user) {
    if (!user.birthday) return false;

    try {
      user.birthday.getDate();
      user.birthday.getMonth();
      user.birthday.getFullYear();

      return true;
    } catch (e) {
      return false;
    }
  };

  return validation;
});