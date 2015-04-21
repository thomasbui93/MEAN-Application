'use strict';

var Event = require('./event.model');
var NotFoundError = require('../../lib/errors').NotFound;
var UnknownError = require('../../lib/errors').Unknown;
var QueryBuilder = require('../../lib/query-builder.js');
var ImageSaver = require('../../lib/image-saver');

var _ = require('lodash');
var excludedFields = ['_id', '__v'];

exports.index = function(req, res, next) {
  var query = new QueryBuilder(req.query);

  Event.find(query)
    .populate('organisation participants comments createdBy')
    .exec(function(err, events) {
      if (err) return next(err);
      if (!events) return next(new NotFoundError("No events found"));

      res.json(events);
    });
};

exports.show = function(req, res, next) {
  var id = req.params.eventId;

  Event.findById(id)
    .populate('organisation participants comments createdBy')
    .exec(function(err, evt) {
      if (err) return next(err);
      if (!evt) return next(new NotFoundError('No event with that id.'));

      res.json(evt);
    });
};

exports.update = function(req, res, next) {
  var id = req.params.eventId;
  Event.findById(id, function(err, evt) {
    if (err) return next(err);
    if (!evt) return next(new NotFoundError('No event with that id.'));

    for (var field in req.body) {

      if (_.includes(excludedFields, field)) {
        continue;
      }

      if (field in evt) {
        evt[field] = req.body[field];
      }
    }

    evt.save(function(err) {
      if (err) return next(err);

      res.json(evt);
    });
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

  Event.findById(id)
    .populate('comments')
    .exec(function(err, evt) {

      if (err) return next(err);
      if (!evt) return next(new NotFoundError('No event with that id.'));

      evt.remove(function(err) {
        if (err) return next(err);
        res.status(204).end();
      });

      //remove all of comments in the event
      if (evt.comments) {
        for (var i = 0; i < evt.comments.length; ++i) {
          evt.comments[i].remove();
        }
      }
    });
};

exports.uploadPicture = function(req, res, next) {
  var imageSaver = new ImageSaver('/img/events/', req.params.eventId);

  imageSaver.saveImageFromRequest(req, function(err, response) {
    if (err) {
      console.log(err);
      return next(new UnknownError('Image upload failed.'));
    }

    res.json(response);
  });
};

exports.getCreatedBy = function(req, res, next) {
  var id = req.params.eventId;

  Event.findById(id)
    .populate('createdBy')
    .exec(function(err, evt) {
      if (err) return next(err);
      if (!evt) return next(new NotFoundError('No event with that id.'));

      res.json(evt.createdBy);
    });
};

exports.getOrganisation = function(req, res, next) {
  var id = req.params.eventId;

  console.log("called get organisation");
  Event.findById(id)
    .populate('organisation')
    .exec(function(err, evt) {
      if (err) return next(err);
      if (!evt) return next(new NotFoundError("No event with that id."));

      console.log(evt.organisation);
      res.json(evt.organisation);
    });
};

exports.getParticipants = function(req, res, next) {
  var id = req.params.eventId;

  Event.findById(id)
    .populate('participants')
    .exec(function(err, evt) {
      if (err) return next(err);
      if (!evt) return next(new NotFoundError("No event with that id."));

      res.json(evt.participants);
    });
};

exports.getComments = function(req, res, next) {
  var id = req.params.eventId;

  Event.findById(id)
    .populate('comments')
    .exec(function(err, evt) {
      if (err) return next(err);
      if (!evt) return next(new NotFoundError("No event with that id."));

      res.json(evt.comments);
    });
};