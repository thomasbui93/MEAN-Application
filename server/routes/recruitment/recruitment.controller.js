'use strict';

var Recruitment = require('./recruitment.model');
var NotFoundError = require('../../lib/errors').NotFound;

var _ = require('lodash');
var excludedFields = ['_id', 'hashedPassword', 'salt', '__v'];
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
  console.log("called recruiment update");

  Recruitment.findById(id)
    .populate('organisation participants createdBy')
    .exec(function(err, recruitment) {

      if (err) return next(err);
      if (!recruitment) return next(new NotFoundError('No user with that id.'));

      for (var field in req.body) {

        if (_.includes(excludedFields, field)) {
          continue;
        }

        if (field in recruitment) {
          recruitment[field] = req.body[field];
        }
      }

      recruitment.save(function(err) {
        if (err) return next(err);

        res.json(recruitment);
      });
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