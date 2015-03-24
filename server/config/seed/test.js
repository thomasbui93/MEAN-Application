'use strict';

// var User = require('../../routes/user/user.model');
var Organisation = require('../../routes/organisation/organisation.model');
var Event = require('../../routes/event/event.model');
var Recruitment = require('../../routes/recruitment/recruitment.model');

var exampleUser = {
  email: 'user@ex.com',
  firstName: 'First',
  lastName: 'Last',
  password: 'ex',
  _id: '55095c4e2d316055807fe46c'
};

var exampleOrganisation = {
  name: "Greenpeace",
  managers: [exampleUser._id],
  representatives: [exampleUser._id],
  events: [],
  recruitments: [],
  status: "active",
  description: "Hello world",
  locations: ["Oulu", "Helsinki"],
  _id: '22095c4e2d316055823fe46c'
};

var exampleEvent = {
  name: 'Help',
  organisation: [exampleOrganisation._id],
  createdBy: exampleUser._id,
  startDate: new Date(),
  endDate: new Date(),
  participants: [exampleUser._id],
  description: "Help all the peoople!"
};

var exampleRecruitment = {
  name: "Volunteers wanted!",
  organisation: [exampleOrganisation._id],
  createdBy: exampleUser._id,
  description: "Looking for group."
};

Organisation.remove(function() {
  Organisation.create(exampleOrganisation, function(err) {
    if (err) throw err;
  });
});

Event.remove(function() {
  Event.create(exampleEvent, function(err) {
    if (err) throw err;
  });
});

Recruitment.remove(function() {
  Recruitment.create(exampleRecruitment, function(err) {
    if (err) throw err;
  });
});

module.exports = {
  exampleUser: exampleUser,
  exampleOrganisation: exampleOrganisation,
  exampleEvent: exampleEvent,
  exampleRecruitment: exampleRecruitment
};