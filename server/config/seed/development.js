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
  admin: true,
  _id: '55095c4e2d316055808fe46c'
});

var user1 = new User({
  email: 'k@ex.com',
  firstName: 'Khoa',
  lastName: 'Bui Dang ',
  password: 'ex',
  birthDate: {
    date: 11,
    month: 5,
    year: 1993
  },
  address: {
    city: 'Oulu',
    country: 'Finland'
  },
  _id: '55095c4e2d3160f5907fe46c'
});

var user2 = new User({
  email: 'k',
  firstName: 'Khdddoa',
  lastName: 'Bui Dang ',
  password: 'ex',
  birthDate: {
    date: 11,
    month: 5,
    year: 1993
  },
  address: {
    city: 'Oulu',
    country: 'Finland'
  },
  _id: '5509524e2d3160f5907fe46c'
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

var org3 = new Organisation({
  _id: '55095c4e2d316055307f00fd',
  name: 'Khoa KK',
  locations: ['Bangkok'],
  interests: ['drink']
});

var org4 = new Organisation({
  _id: '55095c4e2d316255807f00fd',
  name: 'Tom VV',
  locations: ['Bangkok'],
  interests: ['drink']
});

var org5 = new Organisation({
  _id: '55095c4e2d216055807f00fd',
  name: 'Social',
  locations: ['Bangkok'],
  interests: ['drink']
});

var org6 = new Organisation({
  _id: '55495c4e2d316055807f00fd',
  name: 'Panda',
  locations: ['Bangkok'],
  interests: ['drink']
});

var newEvent = new Event({
  name: 'Awesome event',
  description: "Awesome",
  startDate: new Date(2015, 4, 1, 17, 0),
  endDate: Date.now(),
  locations: "Oulu",
  participants: [],
  //   endDate: Date.now,

  _id: '59195c4e2d316055807f0000'
});

var evt2 = new Event({
  name: 'event',
  description: "Awesome",
  participants: [],
  //   endDate: Date.now,
  _id: '59195c4e2d316125807f0000'
});

var newEvent1 = new Event({
  name: 'Tom event',
  description: "Tom",
  startDate: new Date(2015, 4, 1, 17, 0),
  endDate: Date.now(),
  locations: "Oulu",
  _id: '59195c4e2d316035807f0100'
});

var newEvent2 = new Event({
  name: 'Khosa event WWW',
  description: "Tom",
  startDate: new Date(2015, 4, 1, 17, 0),
  endDate: Date.now(),
  locations: "Oulu",
  _id: '59295c4e2d316035807f0100'
});

var newEvent3 = new Event({
  name: 'Tom event WWW',
  description: "Tom",
  startDate: new Date(2015, 4, 1, 17, 0),
  endDate: Date.now(),
  locations: "Oulu",
  _id: '59395c4e2d316035807f0100'
});

var exampleRecruitment = new Recruitment({
  name: "Volunteers wanted!",
  description: "Looking for group.",
  startDate: Date.now(),
  endDate: Date.now(),
  email: "eeee@eac.com",
  phone: "01234567891",
  _id: '59195c4e2d316055807f0050'
});

var exampleRecruitment1 = new Recruitment({
  name: "Volunteers kokol!",
  description: "hhhh for group.",
  startDate: Date.now(),
  endDate: Date.now(),
  email: "erdsfs@eac.com",
  phone: "56487213456",
  _id: '58195c4e2d316055807f0050'
});


User.remove(function() {
  user.managedOrganisations.push(org);
  user.representOrganisations.push(org2);
  user.events.push(newEvent);
  user.save();

  user1.managedOrganisations.push(org1);
  user1.representOrganisations.push(org2);
  user1.followOrganisations.push(org3);
  user1.followOrganisations.push(org4);
  user1.events.push(newEvent1);
  user1.save();

  user2.save();


});

/*Recruitment.remove(function() {
 exampleRecruitment.save();
 exampleRecruitment1.save();
 });*/

Organisation.remove(function() {
  Event.remove(function() {
    newEvent.organisation = org._id;
    evt2.organisation = org._id;
    newEvent.comments.push(newComment._id);

    newEvent2.organisation = org1._id;
    newEvent3.organisation = org1._id;

    newEvent2.createdBy = user2._id;
    newEvent3.createdBy = user1._id;


    // org.recruitment.push(exampleRecruitment);
    org.events.push(newEvent);
    org.managers.push(user);

    org1.events.push(newEvent2);
    org1.events.push(newEvent3);
    newEvent.participants.push(user);
    evt2.participants.push(user);
    evt2.participants.push(user);

    newEvent1.organisation = org._id;
    newEvent1.comments.push(newComment1._id);
    newEvent1.participants.push(user);
    newEvent1.participants.push(user1);



    // org.recruitment.push(exampleRecruitment);
    org.events.push(newEvent1);
    org.managers.push(user);

    org1.managers.push(user1);
    org1.owner = user1._id;

    org2.representatives.push(user1);
    org2.representatives.push(user2);
    org2.representatives.push(user);

    org.save();
    org1.save();
    org2.save();

    newEvent.save();
    evt2.save();
    newEvent1.save();
    newEvent2.save();
    newEvent3.save();
  });

  Recruitment.remove(function() {
    exampleRecruitment.organisation = org._id;
    exampleRecruitment1.organisation = org1._id;
    org.recruitments.push(exampleRecruitment);
    org1.recruitments.push(exampleRecruitment1);

    org.save();
    org1.save();

    exampleRecruitment.save();
    exampleRecruitment1.save();
  });
  org1.representatives.push(user1);
  org1.representatives.push(user);

  org3.followers.push(user1._id);
  org4.followers.push(user1._id);

  org1.save();
  org2.save();
  org3.save();
  org4.save();
  org5.save();
  org6.save();
});


Comment.remove(function() {
  newComment.event = newEvent._id;
  newComment1.event = newEvent1._id;
  newComment.save();
  newComment1.save();
});