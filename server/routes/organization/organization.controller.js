'use strict';

var Organization = require('./organization.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  Organization.find(req.query, function(err, organizations) {
    if (err) next(err);
    if (!organizations) next(new NotFoundError("No organizations found."));

    res.json(organizations);
  });
};
//     .populate('events')
//     .exec(function(err, organizations) {
//       if (err) return next(err);

//       res.json(organizations);
//     });
// };

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

  Organization.findByIdAndUpdate(id, req.body, function(err, organization) {
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

exports.remove = function(req, res, next) {
  var id = req.param.orgId;
  Organization.remove(id, function(err) {
    if (err) next(err);
    
    res.status(204).end();
  });
};