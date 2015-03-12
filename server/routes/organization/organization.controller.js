'use strict';

var Organization = require('./organization.model');

exports.index = function(req, res) {
  Organization.find({})
    .populate('events')
    .exec(function(err, organizations) {
      if (err) return res.status(500).json(err);

      res.json(organizations);
    });
};