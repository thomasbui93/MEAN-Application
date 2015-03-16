'use strict';

var Organization = require('./organization.model');

exports.index = function(req, res, next) {
  Organization.find({})
    .populate('events')
    .exec(function(err, organizations) {
      if (err) return next(err);

      res.json(organizations);
    });
};