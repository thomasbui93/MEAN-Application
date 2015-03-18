'use strict';

var Organization = require('./organization.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  console.log(req.query);
  Organization.find(req.query)
    .populate('events')
    .exec(function(err, organizations) {
      if (err) return next(err);

      res.json(organizations);
    });
};

exports.show = function(req, res, next) {
  var id = req.params.orgId;

  Organization.findById(id, function(err, organization) {
    if (err) next(err);
    if (!organization) next(new NotFoundError('No Organization with this id.'));

    res.json(organization);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.orgId;

  Organization.findById(id, function(err, organization) {
    if (err) return next(err);
    if (!organization) return next(new NotFoundError('No Organization with that id.'));

    res.json(organization);
  });
};

exports.create = function(req, res, next) {
  var newOrganization = req.body;
  Organization.create(newOrganization, function(err, organization) {
    if (err) return next(err);

    res.status(201).json(organization);
  });
};