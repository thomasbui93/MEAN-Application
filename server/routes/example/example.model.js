'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExampleSchema = new Schema({
  name: String
});

// Export as a mongoose model named 'Example'.
module.exports = mongoose.model('Example', ExampleSchema);