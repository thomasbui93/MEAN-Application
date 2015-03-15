'use strict';

var Example = require('./example.model');
var NotFoundError = require('../../lib/errors').NotFound;

exports.index = function(req, res, next) {
  Example.find({}, function(err, data) {
    // We're sending all errors to a centralized error handler
    // middleware, defined as the last middleware in index.js.
    if (err) return next(err);

    if (data.length === 0) {
      // 'Errors' contains custom errors for each http error code.
      return next(new NotFoundError());
    }

    // Otherwise send the data as json.
    res.json(data);
  });
};

exports.show = function(req, res, next) {
  // This is the number passed as the id in url
  // /api/example/:id
  var id = req.params.id;

  Example.findById(id, function(err, item) {
    if (err) return next(err);
    if (!item) return next(new NotFoundError());

    res.json(item);
  });
};

exports.create = function(req, res, next) {
  // create new item with the data POSTed.
  var newItem = new Example(req.body);

  newItem.save(function(err, item) {
    if (err) return next(err);

    // 201 is the http code for "Created".
    // The RESTful way is to always return what you've created.
    res.status(201).json(item);
  });
};