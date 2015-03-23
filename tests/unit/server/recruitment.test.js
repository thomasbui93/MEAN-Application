var request = require('supertest');
var app = require('../../../app.js');
var should = require('should');
var NotFoundError = require('../../../server/lib/errors.js').NotFound;
var exampleRecruitment = require('../../../server/config/seed/test').exampleRecruitment;

var otherRecruitment;
var apiUrl = '/api/recruitments';

describe('/recruitments', function() {
  beforeEach(function() {
  });

  it('should return json', function(done) {
    request(app)
      .get(apiUrl)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return example recruitment', function(done) {
    request(app)
      .get(apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body[0].name.should.equal(exampleRecruitment.name);
        done();
      });
  });

  it('should create a new recruitment', function(done) {
    otherRecruitment = {
      name: 'LFG',
      startDate: new Date(),
      endDate: new Date(),
      description: "Healer",
      _id: '22095c4e2d316077823fe46c'
    };

    request(app)
      .post(apiUrl)
      .send(otherRecruitment)
      .expect(201, function(err, res) {
        if (err) return done(err);

        res.body.name.should.equal('LFG');
        done();
      });
  });

  it('should update the recruitment', function(done) {
    request(app)
      .put(apiUrl + '/' + otherRecruitment._id)
      .send({ description: 'DPS' })
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.description.should.equal('DPS');
        done();
      });
  });

  it("should find 2 recruitments", function(done) {
    request(app)
      .get(apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(2);
        done();
      });
  });

  it("should delete the recruitment without error", function(done) {
    request(app)
      .del(apiUrl + '/' + otherRecruitment._id)
      .expect(204, function(err) {
        if (err) return done(err);

        done();
      });
  });

  it("should find no otherRecruitment in that database", function(done) {
    request(app)
      .get(apiUrl + '/' + otherRecruitment._id)
      .expect(404, function(err, res) {
        if (err) return done(err);

        res.body.message.should.equal("No Recruitment with that id.");
        done();
      });
  });
});