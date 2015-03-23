'use strict';

var Organisation = require('./organisation.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  Organisation.find(req.query)
    .populate('events managers representatives recruitments')
    .exec(function(err, organisations) {
      if (err) return next(err);
      if (!organisations) return next(new NotFoundError("No organisations found."));

      res.json(organisations);
    });
};

exports.show = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id, function(err, organisation) {
    if (err) return next(err);
    if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

    res.json(organisation);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findByIdAndUpdate(id, req.body, function(err, organisation) {
    if (err) return next(err);
    if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

    res.json(organisation);
  });
};

exports.create = function(req, res, next) {
  var newOrganisation = req.body;
  Organisation.create(newOrganisation, function(err, organisation) {
    if (err) return next(err);

    res.status(201).json(organisation);
  });
};

exports.remove = function(req, res, next) {
  var id = req.param.orgId;
  Organisation.remove(id, function(err) {
    if (err) return next(err);

    res.status(204).end();
  });
};