var request = require('supertest');
var app = require('../../../app.js');
var User = require('../../../server/routes/user/user.model');
var should = require('should');

var exampleUser = {
  email: 'user@ex.com',
  password: 'ex'
};

beforeEach(function(done) {
  User.find({}).remove(function() {
    User.create(exampleUser, done);
  });
});

describe('/users', function() {
  it('should return json', function(done) {
    request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

  it('should return example user', function(done) {
    request(app)
    .get('/api/users')
    .expect(200, function(err, res) {
      if (err) return done(err);

      res.body[0].email.should.equal(exampleUser.email);
      done();
    });
  });

  it('should create a new user', function(done) {
    request(app)
    .post('/api/users')
    .send({
      email: 'user2@ex.com',
      password: 'ex'
    }).expect(201, function(err, res) {
      if (err) return done(err);

      res.body.email.should.equal('user2@ex.com');
      done();
    });
  });
});