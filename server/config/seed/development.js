'use strict';

var Event = require('../../routes/event/event.model');
var Organization = require('../../routes/organization/organization.model');

Organization.find({}).remove(function() {
  Event.find({}).remove(function() {
    var org = new Organization({
      name: 'Greenpeace',
      locations: ['Oulu', 'Helsinki']
    });

    var newEvent = new Event({
      name: 'Awesome event',
      description: "Awesome"
    });

    org.events.push(newEvent);

    org.save();
    newEvent.save();
  });
});