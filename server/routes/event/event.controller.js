'use strict';

var Event = require('./event.model');

exports.index = function(req, res) {
  Event.find({}, function(err, events) {
    if (err) return res.status(500).json(err);

    res.json(events);
  });
};