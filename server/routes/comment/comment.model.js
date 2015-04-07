'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  }, //the id of event this comment belongs to
  content: {
    type: String,
    required: true
  },
  createdTime: {
      type: Date,
      default: Date.now
  }

});

module.exports = mongoose.model("Comment", CommentSchema);