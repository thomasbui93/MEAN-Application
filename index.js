'use strict';

var express = require('express');
var app = express();

// Port can be assigned as a environment variable.
var PORT = process.env.NODE_PORT || 8080;

// All assets in the public folder are served statically.
app.use(express.static(__dirname + '/public'));

// Expose node_modules as /scripts. Might have some security issues.
app.use('/scripts', express.static(__dirname + '/node_modules'));

// Apply api routes
// TODO: Find out what's the difference between __dirname and './'
require('./server/routes')(app);

app.listen(PORT, 'localhost');


