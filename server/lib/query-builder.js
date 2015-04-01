'use strict';

var _ = require('lodash');

var excludedFields = ['hashedPassword', 'salt', '__v'];
var arrayFields = [
  'interests', 'participants', 'comments',
  'managers', 'representatives', 'events',
  'recruitments', 'locations', 'managedOrganisations',
  'representOrganisations'
];

var generalSearchFields = [
  'name', 'firstName', 'lastName',
  'interests', 'description'
];

var QueryBuilder = function(query) {
  this.query = query ? build(query) : {};
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

var build = function(query) {
  for (var field in query) {
    if (isExcluded(field)) {
      delete query[field];
      continue;
    }

    if (!isArray(query[field]) && isArrayField(field)) {
      query[field] = [query[field]];
    }

    if (isArray(query[field])) {
      query[field] = { $in: createRegexArray(query[field])};
    } else {
      query[field] = new RegExp(query[field], 'ig');
    }
  }

  // There is a chance that the query fields are all in the excluded filter.
  // So we have to ensure that atleast an empty object is returned if that happens.
  return query || {};
};

var parseQuotedText = function(query) {
  var indicesOfQuotes = findQuoteIndeces(query);
  var quotedText = [];

  for (var i = 0; i < indicesOfQuotes.length; i += 2) {
    // We add 1 to the starting index as that is a quotation mark
    var text = query.substring(indicesOfQuotes[i] + 1, indicesOfQuotes[i + 1]);

    // If empty strings get pushed in in quotes, just ignore them
    if (text.length === 0) continue;

    quotedText.push(text);
  }

  return quotedText;
};


var isExcluded = function(item) {
  return _.contains(excludedFields, item);
};

var createRegexArray = function(items) {
  return items.map(function(item) {
    return new RegExp(item, 'ig');
  });
};

var isArray = function(item) {
  return item.constructor === Array;
};

var isArrayField = function(item) {
  return _.contains(arrayFields, item);
};

module.exports = QueryBuilder;