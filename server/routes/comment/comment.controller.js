'use strict';

var Comment = require('./comment.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {

  Comment.find(req.query)
    .populate('event createdBy')
    .exec(function(err, comments) {
      if (err) return next(err);
      if (!comments) return next(new NotFoundError("No Comments found."));

      res.json(comments);
    });
};

exports.show = function(req, res, next) {
  var id = req.params.commentId;

  Comment.findById(id, function(err, comment) {
    if (err) return next(err);
    if (!comment) return next(new NotFoundError('No Comment with that id.'));

    res.json(comment);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.commentId;

  Comment.findByIdAndUpdate(id, req.body, function(err, comment) {
    if (err) return next(err);
    if (!comment) return next(new NotFoundError('No Comment with that id.'));

    res.json(comment);
  });
};

exports.create = function(req, res, next) {
  var newRecruitment = req.body;
  Comment.create(newRecruitment, function(err, comment) {
    if (err) return next(err);

    res.status(201).json(comment);
  });
};

exports.remove = function(req, res, next) {
  var id = req.param.commentId;
  Comment.remove(id, function(err) {
    if (err) return next(err);

    res.status(204).end();
  });
};