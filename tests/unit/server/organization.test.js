var request = require('supertest');
var app = require('../../../app.js');
var User = require('../../../server/routes/organization/organization.model');
var should = require('should');
var NotFoundError = require('../../../server/lib/errors.js').NotFound;


// This example Organization is inserted into the database in seed/test file.
var exampleOrganization = {
  name: "Greenpeace",
  managers: [],
  representatives: [],
  events: [],
  recruitments: [],
  status: "active",
  description: "Hello world",
  locations: ["Oulu", "Helsinki"],
  _id: '22095c4e2d316055823fe46c'
};

var otherOrganization;

describe('/organization', function() {
  beforeEach(function() {
  });

  it('should return json', function(done) {
    request(app)
      .get('/api/organization')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return example organization', function(done) {
    request(app)
      .get('/api/organization')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body[0].name.should.equal(exampleOrganization.name);
        done();
      });
  });

  it('should create a new organization', function(done) {
    otherOrganization = {
      name: "Red Cross",
      managers: [],
      representatives: [],
      events: [],
      recruitments: [],
      status: "active",
      description: "Blue",
      locations: ["Tampere"],
      _id: '33395c4e2d316055823fe46c'
    };

    request(app)
      .post('/api/organization')
      .send(otherOrganization)
      .expect(201, function(err, res) {
        if (err) return done(err);

        res.body.name.should.equal('Red Cross');
        done();
      });
  });

  it('should update the organization', function(done) {
    request(app)
      .put('/api/organization/' + exampleOrganization._id)
      .send({ description: 'Red damnit' })
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.description.should.equal('Red damnit');
        done();
      });
  });

  it("should find 2 organizations", function(done) {
    request(app)
      .get('/api/organization')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(2);
        done();
      });
  });

  it("should find organization with location Tampere", function(done) {
    request(app)
      .get('/api/organization?locations=Tampere')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(1);
        res.body[0].name.should.equal('Red Cross');
        done();
      });
  });

  it("should delete the organization without error", function(done) {
    request(app)
      .del('/api/organization/' + otherOrganization._id)
      .expect(204, function(err) {
        if (err) return done(err);

        done();
      });
  });

  it("should find no otherOrganization in that database", function(done) {
    request(app)
      .get('/api/organization/' + otherOrganization._id)
      .expect(404, function(err, res) {
        if (err) return done(err);

        res.body.message.should.equal("No Organization with that id.");
        done();
      });
  });
});