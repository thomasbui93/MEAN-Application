var request = require('supertest');
var app = require('../../../app.js');
var should = require('should');
var NotFoundError = require('../../../server/lib/errors.js').NotFound;
var exampleOrganisation = require('../../../server/config/seed/test').exampleOrganisation;

var otherOrganisation;
var apiUrl = '/api/organisations';

describe('/organisation', function() {
  beforeEach(function() {
  });

  it('should return json', function(done) {
    request(app)
      .get(apiUrl)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return example organisation', function(done) {
    request(app)
      .get(apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body[0].name.should.equal(exampleOrganisation.name);
        done();
      });
  });

  it('should create a new organisation', function(done) {
    otherOrganisation = {
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
      .post(apiUrl)
      .send(otherOrganisation)
      .expect(201, function(err, res) {
        if (err) return done(err);

        res.body.name.should.equal('Red Cross');
        done();
      });
  });

  it('should update the organisation', function(done) {
    request(app)
      .put(apiUrl + '/' + exampleOrganisation._id)
      .send({ description: 'Red damnit' })
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.description.should.equal('Red damnit');
        done();
      });
  });

  it("should find 2 organisations", function(done) {
    request(app)
      .get(apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(2);
        done();
      });
  });

  it("should find organisation with location Tampere", function(done) {
    request(app)
      .get(apiUrl + '?locations=Tampere')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(1);
        res.body[0].name.should.equal('Red Cross');
        done();
      });
  });

  it("should delete the organisation without error", function(done) {
    request(app)
      .del(apiUrl + '/' + otherOrganisation._id)
      .expect(204, function(err) {
        if (err) return done(err);

        done();
      });
  });

  it("should find no otherOrganisation in that database", function(done) {
    request(app)
      .get(apiUrl + '/' + otherOrganisation._id)
      .expect(404, function(err, res) {
        if (err) return done(err);

        res.body.message.should.equal("No Organisation with that id.");
        done();
      });
  });
});