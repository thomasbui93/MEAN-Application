'use strict';

var User = require('../routes/user/user.model');
var Errors = require('../lib/errors');

module.exports = {
  authenticate: function(credentials, cb) {
    var email = credentials.email;
    var password = credentials.password;

    if (!email || !password) {
      return cb(new Errors.BadRequest('Incorrect login credentials.'));
    }

    User.findByEmail(email, function(err, user) {
      if (err) return cb(err);
      if (!user) return cb(new Errors.Unauthorized('Incorrect login credentials.'));

      if (user.authenticate(password)) {
        cb(null, user);
      } else {
        cb(new Errors.Unauthorized('Incorrect login credentials.'));
      }
    });
  },

  isAuthenticated: function(req, res, next) {
    // TODO: Is this validation enough? There shouldn't be
    // a req.session.user available if a login hasn't succeeded.
    if (!req.session.user) {
      return next(new Errors.Unauthorized());
    }

    next()
  }
};