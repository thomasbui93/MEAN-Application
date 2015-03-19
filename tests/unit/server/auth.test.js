var request = require('supertest');
var app = require('../../../app.js');
var should = require('should');


// This example user is inserted into the database in seed/test file.
var exampleUser = {
  email: 'user@ex.com',
  firstName: 'First',
  lastName: 'Last',
  password: 'ex',
  _id: '55095c4e2d316055807fe46c'
};

describe('/login', function() {
  it('should respond with 200', function(done) {
    request(app)
      .post('/login')
      .send({
        email: exampleUser.email,
        password: exampleUser.password
      }).expect(200, function(err, res) {
        if (err) return done(err);

        console.log(res);
        done();
      });
  });
});