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
  birthDate: {
    date: 11,
    month: 4,
    year: 1993
  },
  address: {
    city: 'Oulu',
    country: 'Finland'
  },
  _id: '55095c4e2d316055807fe46c'
});

var user1 = new User({
  email: 'k@ex.com',
  firstName: 'K',
  lastName: 'B',
  password: 'ex',
  birthDate: {
    date: 11,
    month: 5,
    year: 1993
  },
  address: {
    city: 'll',
    country: 'hh'
  },
  _id: '55095c4e2d3160f5907fe46c'
});


var newComment = new Comment({
  createdBy: user,
  content: "I'm da bes",
  _id: '55095c4e2d316055807fa21c'

});

var newComment1 = new Comment({
  createdBy: user,
  content: "Tom ss ks",
  _id: '55095c4f4d316055807fa21c'

});

var org = new Organisation({
  _id: '55095c4e2d316055807f0000',
  name: 'Greenpeace',
  locations: ['Oulu', 'Helsinki'],
  interests: ['food', 'drink']
});

var org1 = new Organisation({
  _id: '55095c4e2d316055807f00dd',
  name: 'WWW',
  locations: ['Oulu', 'Helsinki', 'New York'],
  interests: ['food', 'helping children']
});

var org2 = new Organisation({
  _id: '55095c4e2d316055807f00fd',
  name: 'Lovely',
  locations: ['Bangkok'],
  interests: ['drink']
});

var newEvent = new Event({
  name: 'Awesome event',
  description: "Awesome",
  startDate: new Date(2015, 4, 1, 17, 0),
  endDate: Date.now(),
  _id: '59195c4e2d316055807f0000'
});

var newEvent1 = new Event({
  name: 'Tom event',
  description: "Tom",
  startDate: new Date(2015, 4, 1, 17, 0),
  endDate: Date.now(),
  _id: '59195c4e2d316035807f0100'
});

var exampleRecruitment = new Recruitment({
  name: "Volunteers wanted!",
  description: "Looking for group.",
  startDate: Date.now(),
  endDate: Date.now(),
  _id: '59195c4e2d316055807f0050'
});


User.remove(function() {
  user.managedOrganisations.push(org);
  user.representOrganisations.push(org2);
  user.events.push(newEvent);
  user.save();

  user1.managedOrganisations.push(org1);
  user1.representOrganisations.push(org2);
  user1.events.push(newEvent1);
  user1.save();


});

Recruitment.remove(function() {
  exampleRecruitment.save();
});

Organisation.remove(function() {
  Event.remove(function() {
    newEvent.organisation = org._id;
    newEvent.comments.push(newComment._id);

    // org.recruitment.push(exampleRecruitment);
    org.events.push(newEvent);
    org.managers.push(user);

    newEvent1.organisation = org._id;
    newEvent1.comments.push(newComment1._id);

    // org.recruitment.push(exampleRecruitment);
    org.events.push(newEvent1);
    org.managers.push(user);

    org.save();
    newEvent.save();
    newEvent1.save();
  });

  Recruitment.remove(function() {
    exampleRecruitment.organisation = org._id;

    org.recruitments.push(exampleRecruitment);

    org.save();
    exampleRecruitment.save();
  });

  org1.save();
  org2.save();
});


Comment.remove(function() {
  newComment.event = newEvent._id;
  newComment1.event = newEvent1._id;
  newComment.save();
  newComment1.save();
});