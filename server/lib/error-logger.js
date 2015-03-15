'use strict';

module.exports = function(err, req, res, next) {
  console.log(err);
  if (err.stack) {
    console.log(err.stack);
  }

  next(err);
};