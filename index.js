// Default environment is development.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config');
var app = require('./app');

app.listen(config.port, 'localhost');
