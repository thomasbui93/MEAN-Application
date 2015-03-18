'use strict';

var Event = require('./event.model');

exports.index = function(req, res, next) {
  Event.find({}, function(err, events) {
    if (err) return next(err);

    res.json(events);
  });
};