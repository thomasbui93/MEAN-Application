'use strict';

var User = require('../../routes/user/user.model');
var Organization = require('../../routes/organization/organization.model');

var exampleUser = {
  email: 'user@ex.com',
  firstName: 'First',
  lastName: 'Last',
  password: 'ex',
  _id: '55095c4e2d316055807fe46c'
};

var exampleOrganization = {
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

User.find({}).remove(function() {
  User.create(exampleUser, function(err) {
    if (err) throw err;
  });
});

Organization.find({}).remove(function() {
  Organization.create(exampleOrganization, function(err) {
    if (err) throw err;
  });
});
