'use strict';

var User = require('../../routes/user/user.model');
var Event = require('../../routes/event/event.model');
var Organisation = require('../../routes/organisation/organisation.model');

var user;

User.remove(function() {
  user = new User({
    email: 'user@ex.com',
    firstName: 'First',
    lastName: 'Last',
    password: 'ex',
    _id: '55095c4e2d316055807fe46c'
  });
  user.save();
});

Organisation.find({}).remove(function() {
  Event.find({}).remove(function() {
    var org = new Organisation({
      _id: '55095c4e2d316055807f0000',
      name: 'Greenpeace',
      locations: ['Oulu', 'Helsinki'],
    });

    var newEvent = new Event({
      name: 'Awesome event',
      description: "Awesome",
    });

    newEvent.organisation.push(org._id);
    org.events.push(newEvent);
    org.managers.push(user);


    org.save();
    newEvent.save();
  });
});