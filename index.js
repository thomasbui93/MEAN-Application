'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');

// Default environment is development.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config');

// Connect to database.
mongoose.connect(config.mongo.uri, config.mongo.options);

// Run a script to clean out and populate the database
// in development and test environments.
if (config.seedDB) {
  require('./server/config/seed');
}

// All assets in the public folder are served statically.
app.use(express.static(__dirname + '/public'));

// Expose node_modules as /scripts. Might have some security issues.
app.use('/scripts', express.static(__dirname + '/node_modules'));

// Apply api routes
// TODO: Find out what's the difference between __dirname and './'
require('./server/routes')(app);

app.listen(config.port, 'localhost');


