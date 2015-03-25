'use strict';

var Organisation = require('./organisation.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {


  var regExpQuery = new RegExp(req.query.q, 'i');
  var interests = ["default"];

  //check when type is string or object since the value in mongo 
  //in required an array
  if (typeof req.query.interests == 'string') {
    interests.push(req.query.interests);
  } else {
    for (var value in req.query.interests) {
      interests.push(req.query.interests[value]);
    }
  }
  //-------query--------------
  if (interests.length == 1) {
    Organisation.find({
      name: regExpQuery
    })
      .populate('events managers representatives recruitments')
      .exec(function(err, organisations) {
        if (err) return next(err);

        res.json(organisations);
      });
  } else {
    console.log(interests);
    Organisation.find({})
      .where('interests')
      . in (interests)
      .exec(function(err, organisations) {
        if (err) return next(err);

        res.json(organisations);
      });
  }
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

  Organisation.findByIdAndUpdate(id, req.body)
    .populate('events managers representatives recruitments')
    .exec(function(err, organisation) {
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
  var id = req.params.orgId;

  Organisation.findByIdAndRemove(id, function(err) {
    if (err) return next(err);

    res.status(204).end();
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

/*exports.showByName = function(req, res, next) {
  //search by name
   var name = req.params.orgName;
  var query = Organisation.find({'name':name})
    .select('_id name createdDate description interests locations');

  query.exec(function(err, organisations) {

    if (err) return next(err);
    if (organisations.length === 0) return next(new NotFoundError('No Organisation'));

    res.json(organisations);
  });
};*/