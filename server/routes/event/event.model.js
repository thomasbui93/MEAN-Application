'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  organisation: [{
    type: Schema.Types.ObjectId,
    ref: "Organisation"
  }], //id of own organisation
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }, //id of creator
  createdDate: {
    type: Date,
    "default": Date.now
  },
  startDate: {
    type: Date,
    "default": Date.now
  },
  endDate: {
    type: Date
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }], // id of people join event
  description: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }], //could be seperate in another schema
  status: {
    type: String,
    "default": "active"
  }, //status. 1.active, 2.block(when reach due date)
});

module.exports = mongoose.model('Event', EventSchema);