var request = require('supertest');
var app = require('../../../app.js');
var User = require('../../../server/routes/user/user.model');
var should = require('should');
var exampleUser = require('../../../server/config/seed/test').exampleUser;

var otherUser;

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

  // it('should not return password hash and salt', function(done) {
  //   request(app)
  //     .get('/api/users/' + exampleUser._id)
  //     .expect(200, function(err, res) {
  //       if (err) return done(err);

  //       var user = res.body;
  //       user.should.not.have.property('hashedPassword');
  //       user.should.not.have.property('salt');
  //       user.should.not.have.property('__v');
  //     });
  // });
});