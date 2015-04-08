'use strict';

var User = require('./user.model');
var NotFoundError = require('../../lib/errors').NotFound;
var UnauthorizedError = require('../../lib/errors').Unauthorized;

var _ = require('lodash');

var excludedFields = ['_id', 'hashedPassword', 'salt', '__v'];

var QueryBuilder = require('../../lib/query-builder');

exports.index = function(req, res, next) {
  var query = new QueryBuilder(req.query).query;


  User.find(query)
    .populate('managedOrganisations representOrganisations events recruiments')
    .exec(function(err, users) {
      if (err) return next(err);
      res.json(users);

    });
};

exports.self = function(req, res, next) {
  if (!req.session || !req.session.user) {
    return next(new UnauthorizedError());
  }

  // TODO: Omit hashedPassword etc.
  res.json(req.session.user);
};

exports.show = function(req, res, next) {
  var id = req.params.userId;

  console.log("called show");
  User.findById(id)
    .populate('events  managedOrganisations representOrganisations')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new NotFoundError('No user with that id.'));
    });
  User.findById(id)
    .populate('managedOrganisations representOrganisations events recruiments')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new NotFoundError('No user with that id.'));

      res.json(user);
    });
};

exports.update = function(req, res, next) {
  var id = req.params.userId;

  console.log("called user update");
  // FIXME: This update could use some validations.
  User.findById(id)
    .populate('managedOrganisations representOrganisations events recruiments')
    .exec(function(err, user) {
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

exports.getManagedOrganisations = function(req, res, next) {
  var id = req.params.userId;

  User.findById(id)
    .populate('managedOrganisations')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new NotFoundError('No user with that id.'));

      res.json(user.managedOrganisations);
    });
};

exports.getRepresentOrganisations = function(req, res, next) {
  var id = req.params.userId;

  User.findById(id)
    .populate('representOrganisations')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new NotFoundError('No user with that id.'));

      res.json(user.representOrganisations);
    });
};

exports.getEvents = function(req, res, next) {
  var id = req.params.userId;

  User.findById(id)
    .populate('events')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new NotFoundError('No user with that id.'));

      res.json(user.events);
    });
};

exports.getRecruitments = function(req, res, next) {
  var id = req.params.userId;

  User.findById(id)
    .populate('recruiments')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new NotFoundError('No user with that id.'));

      res.json(user.recruitments);
    });
};