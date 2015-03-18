var request = require('supertest');
var app = require('../../../app.js');
var User = require('../../../server/routes/user/user.model');
var should = require('should');


// This example user is inserted into the database in seed/test file.
var exampleUser = {
  email: 'user@ex.com',
  firstName: 'First',
  lastName: 'Last',
  password: 'ex',
  _id: '55095c4e2d316055807fe46c'
};

var otherUser;

describe('/users', function() {
  beforeEach(function() {
  });

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
    var otherUser = {
      email: 'user2@ex.com',
      firstName: 'First',
      lastName: 'Last',
      password: 'ex',
    };

    request(app)
      .post('/api/users')
      .send(otherUser)
      .expect(201, function(err, res) {
        if (err) return done(err);

        res.body.email.should.equal('user2@ex.com');
        done();
      });
  });

  it('should update the user', function(done) {
    request(app)
      .put('/api/users/' + exampleUser._id)
      .send({ firstName: 'NewName' })
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.firstName.should.equal('NewName');
        done();
      });
  });
});