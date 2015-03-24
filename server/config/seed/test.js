'use strict';

var User = require('../../routes/user/user.model');
var Organisation = require('../../routes/organisation/organisation.model');
var Event = require('../../routes/event/event.model');
var Recruitment = require('../../routes/recruitment/recruitment.model');
var Comment = require('../../routes/comment/comment.model');

var exampleUser = {
  email: 'user@ex.com',
  firstName: 'First',
  lastName: 'Last',
  password: 'ex',
  _id: '55095c4e2d316055807fe46c'
};

var exampleOrganisation = {
  name: "Greenpeace",
  description: "Hello world",
  locations: ["Oulu", "Helsinki"],
  participants: [],
  managers: [],
  events: [],
  recruitments: [],
  _id: '22095c4e2d316055823fe46c'
};

var exampleEvent = {
  name: 'Help',
  startDate: new Date(),
  endDate: new Date(),
  participants: [],
  organisation: [],
  description: "Help all the peoople!"
};

var exampleRecruitment = {
  name: "Volunteers wanted!",
  organisation: [],
  description: "Looking for group."
};

var exampleComment = {
  content: "I am a comment",
  _id: '22095c4e2d311234823fe46c'
};

Organisation.remove(function() {
  exampleOrganisation.managers.push(exampleUser._id);
  exampleOrganisation.participants.push(exampleUser._id);
  exampleOrganisation.events.push(exampleEvent._id);
  exampleOrganisation.recruitments.push(exampleRecruitment._id);

  Organisation.create(exampleOrganisation, function(err) {
    if (err) throw err;
  }); 
});

Event.remove(function() {
  exampleEvent.organisation.push(exampleOrganisation._id);
  exampleEvent.createdBy = exampleUser._id;
  exampleEvent.participants.push(exampleUser._id);

  Event.create(exampleEvent, function(err) {
    if (err) throw err;
  });
});

Recruitment.remove(function() {
  exampleRecruitment.organisation.push(exampleOrganisation._id);
  exampleRecruitment.createdBy = exampleUser._id;

  Recruitment.create(exampleRecruitment, function(err) {
    if (err) throw err;
  });
});

Comment.remove(function() {
  exampleComment.createdBy = exampleUser._id;
  exampleComment.event = exampleEvent._id;

  Comment.create(exampleComment, function(err) {
    if (err) throw err;
  });
});

module.exports = {
  exampleUser: exampleUser,
  exampleOrganisation: exampleOrganisation,
  exampleEvent: exampleEvent,
  exampleRecruitment: exampleRecruitment,
  exampleComment: exampleComment,
};