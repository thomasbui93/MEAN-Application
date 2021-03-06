var request = require('supertest');
var app = require('../../../app.js');
var should = require('should');
var auth = require('../../../server/auth/auth.service');
var User = require('../../../server/routes/user/user.model');
var exampleUser = require('../../../server/config/seed/test').exampleUser;

// Insert test user.
before(function(done) {
  User.remove(function(err) {
    if (err) return done(err);
    User.create(exampleUser, done);
  });
});

after(function(done) {
  User.find({}).remove(done);
});

describe('/api/login', function() {
  it('should respond with 200 to correct credentials', function(done) {
    request(app)
    .post('/api/login')
    .send({
      email: exampleUser.email,
      password: exampleUser.password
    }).expect(200, function(err, res) {
      if (err) return done(err);

      done();
    });
  });

  it('should respond 401 to incorrect credentials', function(done) {
    request(app)
    .post('/api/login')
    .send({
      email: 'not@there.com',
      password: 'asd'
    }).expect(401, done);
  });
});

describe('authentication', function() {

  // There's a dummy route /behindauth defined in routes/index.

  var authCookie;

  before(function(done) {
    request(app)
    .post('/api/login')
    .send(exampleUser)
    .end(function(err, res) {
      authCookie = res.headers['set-cookie'][0].split(';')[0];
      done();
    });
  });

  it('should respond 401 when not logged in', function(done) {
    request(app)
    .get('/behindauth')
    .expect(401, done);
  });

  it('should respond 200 when logged in', function(done) {
    request(app)
    .get('/behindauth')
    .set('Cookie', authCookie)
    .expect(200, done);
  });

  describe('/api/logout', function() {
    // Not using 'done' here to ensure running order.
    it('should respond 200', function() {
      request(app)
      .post('/api/logout')
      .set('Cookie', authCookie)
      .expect(200);
    });

    it('should cause /behindauth to be unaccessible', function() {
      request(app)
      .get('/behindauth')
      .set('Cookie', authCookie)
      .expect(401);
    });
  });
});
