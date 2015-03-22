'use strict';

var User = require('../../routes/user/user.model');
var Organisation = require('../../routes/organisation/organisation.model');

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

Organisation.remove(function() {
  Organisation.create(exampleOrganisation, function(err) {
    if (err) throw err;
  });
});