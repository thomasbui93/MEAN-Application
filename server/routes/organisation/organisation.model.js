'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = require('../event/event.model');


var OrganisationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  managers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }], //an array of user id who are managers 
  representatives: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }], //an array of user id who are representatives
  events: [{
    type: Schema.Types.ObjectId,
    ref: "Event"
  }], //an array of event_id belong to this organisation
  recruitments: [{
    type: Schema.Types.ObjectId,
    ref: "Recruitment"
  }], //an array of recruitment_id belong to this organisation
  status: {
    type: String,
    "default": "active"
  }, //status: 1.active, 2.block
  description: {
    type: String
  },
  locations: [{
    type: String,
    required: true
  }],
  interests: [{
    type: String
  }],
  createdDate: {
    type: Date,
    default: Date.now
  },
  followers: {
    type: Number,
    min: 0,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

/*OrganisationSchema.methods = {
  deepRemove: function(req, res, next) {
    console.log("called organisation deepRemove");
    //Event.deepRemove(req, res, next);
  }

};*/

OrganisationSchema.statics.deepRemove = function(events) {

  Event.deepRemove(events);
};

module.exports = mongoose.model('Organisation', OrganisationSchema);