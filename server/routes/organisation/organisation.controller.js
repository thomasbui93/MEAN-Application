'use strict';

var Organisation = require('./organisation.model');
var NotFoundError = require('../../lib/errors').NotFound;
var QueryBuilder = require('../../lib/query-builder.js');

var _ = require('lodash');

var excludedFields = ['_id', 'hashedPassword', 'salt', '__v'];

exports.index = function(req, res, next) {
  var query = new QueryBuilder(req.query).query;

  Organisation.find(query)
    .populate('events managers representatives recruitments')
    .exec(function(err, organisations) {
      if (err) return next(err);

      res.json(organisations);
    });
};

exports.show = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('events managers representatives recruitments')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation);
    });
};

exports.update = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('events managers representatives recruitments')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      for (var field in req.body) {

        if (_.includes(excludedFields, field)) {
          continue;
        }

        if (field in organisation) {
          organisation[field] = req.body[field];
        }
      }
      organisation.save(function(err) {
        if (err) return next(err);

        res.json(organisation);
      });
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
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate("events")
    .exec(function(err, organisation) {

      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      organisation.remove(function(err) {
        if (err) return next(err);

        res.status(204).end();
      });

      //removed function called dell in event
      Organisation.deepRemove(organisation.events);



    });

};



exports.getManagers = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('managers')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation.managers);
    });
};

exports.getRepresentatives = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('representatives')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation.representatives);
    });
};

exports.getEvents = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('events')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation.events);
    });
};

exports.getRecruitments = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('recruitments')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation.recruitments);
    });
};

exports.getTopTen = function(req, res, next) {
  Organisation.find()
    .sort({
      followers: -1
    })
    .limit(10)
    .exec(function(err, organisations) {
      if (err) return next(err);

      res.json(organisations);
    });
};