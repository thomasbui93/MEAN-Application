'use strict';

var User = require('./user.model');
var NotFoundError = require('../../lib/errors').NotFound;
var _ = require('lodash');

var excludedFields = ['_id', 'hashedPassword', 'salt', '__v'];

exports.index = function(req, res, next) {
  console.log("called index");
  var query = User.find({});
  console.log(req.query);
  //-------query--------------
  if (req.query.email) {
    var regExpQuery = new RegExp(req.query.email, 'i');
    query = User.find({
      email: regExpQuery
    });
  }

  //--------------------------*

  query.populate('events  managedOrganisations representOrganisations')
    .exec(function(err, user) {

      if (err) return next(err);
      res.json(user);
    });
};

exports.show = function(req, res, next) {
  var id = req.params.userId;
  console.log("called show");
  User.findById(id)
    .populate('events  managedOrganisations representOrganisations')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new NotFoundError('No user with that id.'));

      res.json(user);
    });
};

exports.update = function(req, res, next) {
  var id = req.params.userId;

  // FIXME: This update could use some validations.
  User.findById(id, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new NotFoundError('No user with that id.'));

    for (var field in req.body) {
      if (_.includes(excludedFields, field)) {
        continue;
      }

      if (field in user) {
        user[field] = req.body[field];
      }
    }

    user.save(function(err) {
      if (err) return next(err);

      res.json(user);
    });
  });
};

exports.create = function(req, res, next) {

  console.log(req.body);
  var newUser = req.body;
  //check if email already exist

  User.create(newUser, function(err, user) {
    if (err) return next(err);

    res.status(201).json(user);
  });
};

exports.remove = function(req, res, next) {
  var id = req.params.userId;

  User.findById(id, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new NotFoundError('No user with that id.'));

    user.remove(function(err) {
      if (err) return next(err);

      res.status(204).end();
    });
  });
};