'use strict';

var _ = require('lodash');

// In this object we'll specify the configuration common
// to all environments.
var config = {
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT || 8080,
  // super random
  sessionSecret: 'asd38ad20asdjADSJJ--asdj',
  mongo: {
    uri: 'mongodb://db/voluntr',
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Just and empty object if the file isn't found.
var envSpecificConfig = require('./' + config.env + '.js') || {};

// Merge the common and environment-specific configuration.
module.exports = _.merge(config, envSpecificConfig);