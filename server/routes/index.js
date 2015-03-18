'use strict';

// Note how 'require' works:
// From index.js we require('./server/routes')
// Require will look for either a file named routes.js
// or index.js inside a folder named 'routes'.

module.exports = function(app) {
  // Any requirests to /api/examples will be redirected
  // to the examples module.
  app.use('/api/example', require('./example'));
  app.use('/api/organization', require('./organization'));
  app.use('/api/login', require('./login'));
};