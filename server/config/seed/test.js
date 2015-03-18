'use strict';

var User = require('../../routes/user/user.model');

var exampleUser = {
  email: 'user@ex.com',
  firstName: 'First',
  lastName: 'Last',
  password: 'ex',
  _id: '55095c4e2d316055807fe46c'
};

User.find({}).remove(function() {
  User.create(exampleUser, function(err) {
    if (err) throw err;
  });
});