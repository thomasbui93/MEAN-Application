'use strict';

var User = require('../../routes/user/user.model');
var Event = require('../../routes/event/event.model');
var Organisation = require('../../routes/organisation/organisation.model');
var Recruitment = require('../../routes/recruitment/recruitment.model');
var Comment = require('../../routes/comment/comment.model');

var user;

User.remove(function() {
  user = new User({
    email: 'user@ex.com',
    firstName: 'First',
    lastName: 'Last',
    password: 'ex',
    address:{
      city: 'Oulu',
      country: 'Finland'
    },
    birthDate:{
      date:'20',
      month:'10',
      year:'2000'
    },
    avatar: 'images/bbc.png',
    description: 'beautiful',
    loginStatus: {
      ip: '192.168.1.1',
      status: 'active'
    },
    _id: '55095c4e2d316055807fe46c',

  });
  user.save();
});

var exampleRecruitment = {
  name: "Volunteers wanted!",
  description: "Looking for group."
};

Recruitment.remove(function() {
  Recruitment.create(exampleRecruitment, function(err) {
    if (err) throw err;
  });
});

Organisation.find({}).remove(function() {
  Event.find({}).remove(function() {
    var org = new Organisation({
      _id: '55095c4e2d316055807f0000',
      name: 'Greenpeace',
      locations: ['Oulu', 'Helsinki']
    });

    var newEvent = new Event({
      name: 'Awesome event',
      description: "Awesome"
    });

    //newEvent.organisation.push(org._id);
    newEvent.organisation = org._id;
    org.events.push(newEvent);
    org.managers.push(user);


    org.save();
    newEvent.save();
  });
});

Comment.find({}).remove(function(){
  var comment = new Comment({
    content: "beautiful sunday"
  });
  
  comment.save();
});