'use strict';

var generalSearchFields = [
  'name', 'interests', 'description', 'locations'
];

// Lower is better
var matchScore = {
  name: 25,
  description: 50,
  locations: 25,
  interests: 25
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
  this._query = queryParams;

  queryParams = queryParams.filter(function(param){
      return param !== "";
    })
    .map(function(param) {
      return new RegExp(param, 'ig');
    });

  return prepareQuery(queryParams);
};

// Gives the results an ordering based on relevace. The relevance of an item is determined 
// by how closely it matches the word that was used in the query.
// Different fields are assigned different value. The values can be found in the 
// matchScore object.
WeightedQueryBuilder.prototype.getWeightedResults = function(queryResults) {
  var self = this;

  // Return early if query is empty
  if (!this._query) return queryResults;

  queryResults.map(function(result) {
    result.score = self._generateMatchScore(result);
  });

  return sortByScore(queryResults);
};

// Generates levenshtein score for every query result and adds them to create a score
WeightedQueryBuilder.prototype._generateMatchScore = function(data) {
  var score = 0;

  this._query.forEach(function(term) {
    for (var match in matchScore) {
      if (data[match]) {
        score += calculateScore(data[match], match, term);
      }
    }
  });

  return score;
};

// Returns an int score for a data field
var calculateScore = function(data, matchType, term) {
  if (isArray(data)) {
    // Reduce fails on empty arrays
    if (data.length === 0) return matchScore[matchType];

    return data.map(function(item) {
      return matchScore[matchType] * levenshteinDistance(item, term);
    }).reduce(adder);

  } else if (matchType === "description") {
    // Minumum description length is enforced by the database
    return data.split(" ")
      .map(function(item) {
        return matchScore[matchType] * levenshteinDistance(item, term);
      }).reduce(adder);

  } else {
    return matchScore[matchType] * levenshteinDistance(data, term);
  }
};

// Sorts data by lowest score
var sortByScore = function(data) {
  return data.sort(function(a, b) {
    return a.score >= b.score;
  });
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

// Calculates how closely the text matches the search data
// http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
var levenshteinDistance = function(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

var isArray = function(a) {
  return a.constructor === Array;
};

var adder = function(a, b) {
  return a + b;
};

module.exports = WeightedQueryBuilder;