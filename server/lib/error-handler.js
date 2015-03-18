'use strict';

var Errors = require('./errors');

var isCustomError = function(error) {
  for (var className in Errors) {
    if (error.constructor === Errors[className]) {
      return true;
    }
  }

  return false;
};

// TODO: Harmonize all different errors into a common scheme, e.g.
// {
//   status: <http status>, // Actually not sure if needed.
//   message: <safe message to present to end-user>
// }

module.exports = function(err, req, res, next) {
  // If error is a custom error defined by us,
  // respond with the corresponding http status
  // and json-encoded error object.
  if (isCustomError(err)) {
    return res.status(err.status).json(err);
  }

  // ValidationError from mongoose.
  if (err.name === 'ValidationError') {
    // TODO: Different http codes for different kinds
    // of validation errors.
    return res.status(500).json(err);
  }

  // Rest of the errors just assume internal server error:
  res.status(500).end();
};