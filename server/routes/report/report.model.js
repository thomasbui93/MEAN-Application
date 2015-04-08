'use strict';

var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var ReportSchema = new Schema({

  reporterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reportedId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  description: {
    type: String
  },

  createdOn: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    default: "active"
  } //status: 1.active, 2.block



});



module.exports = mongoose.model('Report', ReportSchema);