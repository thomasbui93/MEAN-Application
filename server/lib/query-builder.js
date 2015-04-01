'use strict';

var _ = require('lodash');

var excludedFields = ['hashedPassword', 'salt', '__v'];
var arrayFields = [
  'interests', 'participants', 'comments',
  'managers', 'representatives', 'events',
  'recruitments', 'locations', 'managedOrganisations',
  'representOrganisations'
];

var QueryBuilder = function(query) {
  this.query = query ? build(query) : {};
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
      query[field] = {
        $in: createRegexArray(query[field])
      };
    } else {
      query[field] = new RegExp(query[field], 'ig');
    }
  }

  // There is a chance that the query fields are all in the excluded filter.
  // So we have to ensure that atleast an empty object is returned if that happens.
  return query || {};
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