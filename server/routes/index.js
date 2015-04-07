'use strict';

// Note how 'require' works:
// From index.js we require('./server/routes')
// Require will look for either a file named routes.js
// or index.js inside a folder named 'routes'.

module.exports = function(app) {

  app.use('/api/organisations', require('./organisation'));
  app.use('/api/users', require('./user'));
  app.use('/api/events', require('./event'));
  app.use('/api/recruitments', require('./recruitment'));
  app.use('/api/comments', require('./comment'));
  app.use('/api/search', require('./search'));

  // For testing authentication.
  // TODO: Maybe get rid of once a real endpoint is behind auth
  // and the functionality of auth.isAuthenticated is confirmed.
  if (process.env.NODE_ENV !== 'production') {
    var auth = require('../auth/auth.service');
    app.get('/behindauth', auth.isAuthenticated, function(req, res) {
      res.status(200).end();
    });
  }
};