'use strict';

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
  representatives: [],
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
  comments: [],
  description: 'Help all the people!',
  _id: '44095c4e2d311234823fe46d'
};

var exampleRecruitment = {
  name: "Volunteers wanted!",
  description: "Looking for group.",
  _id: '22095c4e2d311234823fbca2'
};

var exampleComment = {
  content: "I am a comment",
  _id: '22095c4e2d311234823fe46c'
};

Organisation.remove(function() {
  exampleOrganisation.managers.push(exampleUser._id);
  exampleOrganisation.representatives.push(exampleUser._id);
  exampleOrganisation.events.push(exampleEvent._id);
  exampleOrganisation.recruitments.push(exampleRecruitment._id);

  Organisation.create(exampleOrganisation, function(err, org) {
    if (err) throw err;
  });
});

Event.remove(function() {
  exampleEvent.organisation = exampleOrganisation._id;
  exampleEvent.createdBy = exampleUser._id;
  exampleEvent.participants.push(exampleUser._id);
  exampleEvent.comments.push(exampleComment._id);

  Event.create(exampleEvent, function(err) {
    if (err) throw err;
  });
});

Recruitment.remove(function() {
  exampleRecruitment.organisation = exampleOrganisation._id;
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