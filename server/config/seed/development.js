'use strict';

var Example = require('../../routes/example/example.model');
var Event = require('../../routes/event/event.model');
var Organization = require('../../routes/organization/organization.model');

// Find all, remove them and create new ones.
// Example.find({}).remove(function() {
//   var data = [{
//     id: 1,
//     name: 'Joonas'
//   }, {
//     id: 2,
//     name: 'Richard'
//   }, {
//     id: 3,
//     name: 'Claudia'
//   }, {
//     id: 4,
//     name: 'Tri'
//   }, {
//     id: 5,
//     name: 'Khoa'
//   }];

//   Example.create(data);
// });

Organization.find({}).remove(function() {
  Event.find({}).remove(function() {
    var org = new Organization({
      name: 'Greenpeace',
      locations: ['Oulu', 'Helsinki']
    });

    var newEvent = new Event({
      name: 'Awesome event'
    });

    org.events.push(newEvent);

    org.save();
    newEvent.save();
  });
});