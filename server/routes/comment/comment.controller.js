'use strict';

var Comment = require('./comment.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  Comment.find({}, function(err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
};