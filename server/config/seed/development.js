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


var newComment = new Comment({
  createdBy: user,
  content: "I'm da bes",
  _id: '55095c4e2d316055807fa21c'

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
  startDate: new Date(2015, 4,1, 17, 0),
  endDate: Date.now(),
  _id: '59195c4e2d316055807f0000'
});

var exampleRecruitment = new Recruitment({
  name: "Volunteers wanted!",
  description: "Looking for group.",
  startDate: Date.now(),
  endDate: Date.now(),
  _id: '59195c4e2d316055807f0050'
});


User.remove(function() {
  user.save();
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

    org.save();
    newEvent.save();
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
  newComment.save();
});