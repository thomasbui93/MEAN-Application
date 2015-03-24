'use strict';

var User = require('../../routes/user/user.model');
var Event = require('../../routes/event/event.model');
var Organisation = require('../../routes/organisation/organisation.model');
var Recruitment = require('../../routes/recruitment/recruitment.model');
var Comment = require('../../routes/comment/comment.model');

var user = new User({
  email: 'user@ex.com',
  firstName: 'First',
  lastName: 'Last',
  password: 'ex',
  _id: '55095c4e2d316055807fe46c'
});

var newComment = new Comment({
  createdBy: user,
  content: "I'm da bes",
  _id: '55095c4e2d316055807fa21c'
});

var org = new Organisation({
  _id: '55095c4e2d316055807f0000',
  name: 'Greenpeace',
  locations: ['Oulu', 'Helsinki'],
});

var newEvent = new Event({
  name: 'Awesome event',
  description: "Awesome",
  _id: '59195c4e2d316055807f0000'
});

var exampleRecruitment = new Recruitment({
  name: "Volunteers wanted!",
  description: "Looking for group."
});

User.remove(function() {
  user.save();
});

Recruitment.remove(function() {
  exampleRecruitment.save();
});

Organisation.remove(function() {
  Event.remove(function() {
    newEvent.organisation.push(org._id);
    newEvent.comments.push(newComment._id);
    org.events.push(newEvent);
    org.managers.push(user);


    org.save();
    newEvent.save();
  });
});

Comment.remove(function() {
  newComment.event = newEvent._id;
  newComment.save();
});