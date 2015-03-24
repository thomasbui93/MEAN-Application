'use strict';

var User = require('../../routes/user/user.model');
var Event = require('../../routes/event/event.model');
var Organisation = require('../../routes/organisation/organisation.model');
var Recruitment = require('../../routes/recruitment/recruitment.model');
var Comment = require('../../routes/comment/comment.model');

var user;
var newEvent;

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

var exampleRecruitment = {
  name: "Volunteers wanted!",
  description: "Looking for group."
};

Recruitment.remove(function() {
  Recruitment.create(exampleRecruitment, function(err) {
    if (err) throw err;
  });
});

Organisation.remove(function() {
  Event.remove(function() {
    var org = new Organisation({
      _id: '55095c4e2d316055807f0000',
      name: 'Greenpeace',
      locations: ['Oulu', 'Helsinki'],
    });

    newEvent = new Event({
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

Comment.remove(function() {
  var newComment = {
    createdBy: user,
    event: newEvent,
    content: "I'm da bes"
  };

  Comment.create(newComment, function(err) {
    if (err) return err;
  });
});