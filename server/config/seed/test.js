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

var exampleOrganisation1 = {
  name: "Tom Organisation",
  description: "Moi Moi Mama",
  locations: ["New York", "Chicago"],
  representatives: [],
  managers: [],
  events: [],
  recruitments: [],
  _id: '22095c4e2d316045823fe46c'
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

var exampleEvent1 = {
  name: 'TomEvent',
  startDate: new Date(),
  endDate: new Date(),
  participants: [],
  organisation: [],
  comments: [],
  description: 'Kill all the people!',
  _id: '44095c4e2d311234823fd46d'
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

var exampleComment1 = {
  content: "Tom comment",
  _id: '22095c4e2d3112348d3fe46c'
};

Organisation.remove(function() {
  exampleOrganisation.managers.push(exampleUser._id);
  exampleOrganisation.representatives.push(exampleUser._id);
  exampleOrganisation.events.push(exampleEvent._id);
  exampleOrganisation.recruitments.push(exampleRecruitment._id);

  exampleOrganisation1.managers.push(exampleUser._id);
  exampleOrganisation1.representatives.push(exampleUser._id);
  exampleOrganisation1.events.push(exampleEvent1._id);
  exampleOrganisation1.recruitments.push(exampleRecruitment._id);

  Organisation.create(exampleOrganisation, function(err, org) {
    if (err) throw err;
  });

  Organisation.create(exampleOrganisation1, function(err, org) {
    if (err) throw err;
  });

});

Event.remove(function() {
  exampleEvent.organisation = exampleOrganisation._id;
  exampleEvent.createdBy = exampleUser._id;
  exampleEvent.participants.push(exampleUser._id);
  exampleEvent.comments.push(exampleComment._id);

  exampleEvent1.organisation = exampleOrganisation1._id;
  exampleEvent1.createdBy = exampleUser._id;
  exampleEvent1.participants.push(exampleUser._id);
  exampleEvent1.comments.push(exampleComment1._id);

  Event.create(exampleEvent, function(err) {
    if (err) throw err;
  });

   Event.create(exampleEvent1, function(err) {
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

  exampleComment1.createdBy = exampleUser._id;
  exampleComment1.event = exampleEvent1._id;

  Comment.create(exampleComment, function(err) {
    if (err) throw err;
  });

  Comment.create(exampleComment1, function(err) {
    if (err) throw err;
  });
});

module.exports = {
  exampleUser: exampleUser,
  exampleOrganisation: exampleOrganisation,
  exampleEvent: exampleEvent,
  exampleEvent1: exampleEvent1,
  exampleRecruitment: exampleRecruitment,
  exampleComment: exampleComment,
  exampleComment1: exampleComment1,
};