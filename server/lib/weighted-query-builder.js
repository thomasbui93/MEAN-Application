'use strict';

var _ = require('lodash');

var generalSearchFields = [
  'name', 'firstName', 'lastName',
  'interests', 'description'
];

var WeightedQueryBuilder = function(query) {
  this.query = query;
};

var buildParameters = function(query) {
  if (!query.q) return {};

  var queryParams = query.q.split(" ");

  queryParams = queryParams.map(function(param) {
    return new RegExp(param, 'ig');
  });

  return prepareQuery(queryParams);
};

var prepareQuery = function(parameters) {
  var builtQuery = {
    $or: []
  };

  parameters.forEach(function(parameter) {
    generalSearchFields.forEach(function(field) {
      var temp = {};
      temp[field] = parameter;

      builtQuery.$or.push(temp);
    });
  });

  return builtQuery;
};


module.exports = WeightedQueryBuilder;