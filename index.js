'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var _ = require('lodash');
var bodyParser = require('body-parser');
var errorHandler = require('./server/lib/error-handler');
var errorLogger = require('./server/lib/error-logger');

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

// Parsers to populate the request object with useful
// attributes.
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// Apply api routes
// TODO: Find out what's the difference between __dirname and './'
require('./server/routes')(app);

app.use('/*', function(req, res) {
  // If someone navigates to an unkown url, send them index.html
  // to start the Angular app. But if it's an ajax request to
  // an illegal API endpoint, send 404.
  // Rationale: Sending the index.html results in better user
  // experience, but without this check I've spent countless
  // hours wondering why a misspelled/configured endpoint returns
  // some odd text (being index.html).
  // NB: If this causes problems at some point or just seems stupid,
  // please challenge my rationale or just delete the if block.
  if (_.includes(req.headers.accept, 'application/json')) {
    console.log('It seems like an ajax call was made to an unkown url.');
    console.log('Please refer to index.js server script.');
    return res.status(404).end();
  }

  res.sendFile(__dirname + '/public/index.html');
});

// More verbose error logging for development.
if (process.env.NODE_ENV !== 'production') {
  app.use(errorLogger);
}

// Handle all the errors delegated by the previous steps.
app.use(errorHandler);

app.listen(config.port, 'localhost');


