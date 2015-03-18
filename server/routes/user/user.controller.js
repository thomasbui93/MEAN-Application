'use strict';

var User = require('./user.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
};

exports.show = function(req, res, next) {
  var id = req.params.userId;

  User.findById(id, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new NotFoundError('No user with that id.'));

    res.json(user);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.userId;

  User.findById(id, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new NotFoundError('No user with that id.'));

    // TODO: Safely merge the needed fields from req.body to user

    res.json(user);
  });
};

exports.create = function(req, res, next) {
  var newUser = req.body;
  User.create(newUser, function(err, user) {
    if (err) return next(err);

    res.status(201).json(user);
  });
};