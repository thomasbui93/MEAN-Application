'use strict';

var Event = require('./event.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  Event.find({}, function(err, events) {
    if (err) return next(err);

    res.json(events);
  });
};

exports.show = function(req, res, next) {
  var id = req.params.eventId;

  Event.findById(id, function(err, evt) {
    if (err) next(err);
    if (!evt) next(new NotFoundError('No evt with this id.'));

    res.json(evt);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.orgId;

  Event.findById(id, function(err, evt) {
    if (err) return next(err);
    if (!evt) return next(new NotFoundError('No evt with that id.'));

    // TODO: Safely merge the needed fields from req.body to user

    res.json(evt);
  });
};

exports.create = function(req, res, next) {
  var newevt = req.body;
  Event.create(newevt, function(err, evt) {
    if (err) return next(err);

    res.status(201).json(evt);
  });
};