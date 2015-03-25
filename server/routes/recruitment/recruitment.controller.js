'use strict';

var Recruitment = require('./recruitment.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  Recruitment.find(req.query)
    .populate('organisation participants createdBy')
    .exec(function(err, recruitments) {
      if (err) return next(err);
      if (!recruitments) return next(new NotFoundError("No Recruitments found."));

      res.json(recruitments);
    });
};

exports.show = function(req, res, next) {
  var id = req.params.recrId;

  Recruitment.findById(id, function(err, recruitment) {
    if (err) return next(err);
    if (!recruitment) return next(new NotFoundError('No Recruitment with that id.'));

    res.json(recruitment);
  });
};

exports.update = function(req, res, next) {
  var id = req.params.recrId;

  Recruitment.findByIdAndUpdate(id, req.body, function(err, recruitment) {
    if (err) return next(err);
    if (!recruitment) return next(new NotFoundError('No Recruitment with that id.'));

    res.json(recruitment);
  });
};

exports.create = function(req, res, next) {
  var newRecruitment = req.body;
  Recruitment.create(newRecruitment, function(err, recruitment) {
    if (err) return next(err);

    res.status(201).json(recruitment);
  });
};

exports.remove = function(req, res, next) {
  var id = req.params.recrId;
  Recruitment.findByIdAndRemove(id, function(err) {
    if (err) return next(err);

    res.status(204).end();
  });
};