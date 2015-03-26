'use strict';

var Organisation = require('./organisation.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {

  var query = Organisation.find({});
  //-------query--------------
  if (req.query.id) {
    query = Organisation.findById(req.query.id);
  } else if (req.query.name) {
    var regExpQuery = new RegExp(req.query.name, 'i');

    query = Organisation.find({
      name: regExpQuery
    });
  } else if (req.query.locations) {
    var location = [req.query.locations];
    console.log(typeof location);
    console.log(location);
    query = Organisation.find({})
      .where('locations')
      . in (location);
  } else if (req.query.interests) {
    var interests;

    //check when type is string or object since the value in mongo 
    //in required an array
    if (typeof req.query.interests == 'string') {
      interests = [req.query.interests];
    } else {

      interests = req.query.interests;
    }

    query = Organisation.find({})
      .where('interests')
      . in (interests);
  }
  //--------------------------*

  query.exec(function(err, organisations) {

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

  Organisation.findById(id, function(err, organisation) {
    if (err) return next(err);
    if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

    organisation.remove(function(err) {
      if (err) return next(err);

      res.status(204).end();
    });
  });
};

exports.managers = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('managers')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation.managers);
    });
};

exports.representatives = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('representatives')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation.representatives);
    });
};

exports.events = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('events')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation.events);
    });
};

exports.recruitments = function(req, res, next) {
  var id = req.params.orgId;

  Organisation.findById(id)
    .populate('recruitments')
    .exec(function(err, organisation) {
      if (err) return next(err);
      if (!organisation) return next(new NotFoundError('No Organisation with that id.'));

      res.json(organisation.recruitments);
    });
};