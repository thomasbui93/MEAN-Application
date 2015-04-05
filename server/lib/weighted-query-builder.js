'use strict';

var _ = require('lodash');

var generalSearchFields = [
  'name', 'interests', 'description', 'locations'
];

var matchScore = {
  name: 100,
  description: 50,
  locations: 75,
  interests: 75
};

var WeightedQueryBuilder = function(query) {
  // Internal query that remaines unprepared
  this._query = undefined;
  // Avoid build logic if query is empty
  this.query = !isEmptyObj(query) ? this.buildParameters(query) : {};
};

// Creates a regex expression out of parameters then prepares the query
WeightedQueryBuilder.prototype.buildParameters = function(query) {
  if (!query.q) return {};

  var queryParams = query.q.split(" ");

  queryParams = queryParams.map(function(param) {
    return new RegExp(param, 'ig');
  });

  this._query = queryParams;
  return prepareQuery(queryParams);
};

// Gives the results an ordering based on relevace. The relevance of an item is determined 
// by how closely it matches the word that was used in the query.
// Different fields are assigned different value. The values can be found in the 
// matchScore object.
WeightedQueryBuilder.prototype.getWeightedResults = function(queryResults) {

  queryResults.map(function(result) {
    result.score = generateMatchScore(result);

    console.log(result, result.score);
  });

  return sortByScore(queryResults);
};

var generateMatchScore = function(data) {
  for (var matchType in matchScore) {
    var matchPercentage = calculateMatchPercentage(data[matchType]);
  }
};

var sortByScore = function(data) {
  return data;
};

// Calculates how closely the text matches the search data
// Returns a value between 0 and 1 where 1 is an exact match
var calculateMatchPercentage = function(data) {
  return 1;
};

// Puts all the search parameters into an or to find general results
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

var isEmptyObj = function(obj) {
  return Object.keys(obj).length === 0;
};


module.exports = WeightedQueryBuilder;