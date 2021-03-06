/**
 * Created by Bui Dang Khoa on 3/26/2015.
 */
'use strict';
angular.module('voluntr').filter('Past', function() {
  return function(input, boolean) {
    var output = [];
    for (var i = 0; i < input.length; i++) {
      if (new Date(input[i].endDate) <= new Date() || input[i].date <= new Date()) {
        if (boolean === true) {
          output.push(input[i]);
        }
      } else {
        if (boolean === false) {
          output.push(input[i]);
        }
      }
    }
    return output;
  };
}).filter('undefinedString', function() {
  return function(input) {
    if (input === '' || input === null || input === undefined) {
      return 'Unknown data';
    } else {
      return input;
    }
  };
});