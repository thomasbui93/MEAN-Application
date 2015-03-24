'use strict';

var Event = require('./event.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  Event.find(req.query)
    .populate('organisation participants comments')
    .exec(function(err, events) {
      if (err) return next(err);
      if (!events) return next(new NotFoundError("No events found"));

      res.json(events);
    });
};

exports.show = function(req, res, next) {
  var id = req.params.eventId;

  Event.findById(id, function(err, evt) {
    if (err) return next(err);
    if (!evt) return next(new NotFoundError('No event with that id.'));

    res.json(evt);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.eventId;

  Event.findByIdAndUpdate(id, req.body, function(err, evt) {
    if (err) return next(err);
    if (!evt) return next(new NotFoundError('No event with that id.'));

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

exports.remove = function(req, res, next) {
  var id = req.params.eventId;

  Event.remove(id, function(err, evt) {
    if (err) return next(err);

    res.status(204).end();
  });
};