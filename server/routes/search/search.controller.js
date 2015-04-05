'use strict';

var Organisation = require('../organisation/organisation.model');
var Event = require('../event/event.model');
var WeightedQueryBuilder = require('../../lib/weighted-query-builder');

exports.index = function(req, res, next) {
  var queryBuilder = new WeightedQueryBuilder(req.query);

  var query = queryBuilder.query;

  Organisation.find(query, function(err, organisation) {
    if (err) return next(err);

    Event.find(query, function(err, evt) {
      if (err) return next(err);

      var searchResults = evt.concat(organisation);

      var sortedResults = queryBuilder.getWeightedResults(searchResults);

      res.send(sortedResults);
    });
  });
};