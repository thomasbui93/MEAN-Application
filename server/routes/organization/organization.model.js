'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('Organization', OrganizationSchema);