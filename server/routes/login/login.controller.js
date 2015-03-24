'use strict';

exports.login = function(req, res, next) {
  console.log("Would process login for user: " + req.body.username + " password: " + req.body.password);

  // Dummy response:
  res.json({
    id: 1234,
    user: {
      id: 5678,
      role: 'volunteer',
      name: req.body.username
    }
  });
};