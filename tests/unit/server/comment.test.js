var request = require('supertest');
var app = require('../../../app.js');
var should = require('should');
var NotFoundError = require('../../../server/lib/errors.js').NotFound;
var exampleComment = require('../../../server/config/seed/test').exampleComment;

var otherComment;
var apiUrl = '/api/comments';

describe('/comments', function() {
  beforeEach(function() {
  });

  it('should return json', function(done) {
    request(app)
      .get(apiUrl)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return example Comment', function(done) {
    request(app)
      .get(apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body[0].content.should.equal(exampleComment.content);
        done();
      });
  });

  it('should create a new Comment', function(done) {
    otherComment = {
      content: "Yes",
      _id: '87095c4e2d316055807fe46c'
    };

    request(app)
      .post(apiUrl)
      .send(otherComment)
      .expect(201, function(err, res) {
        if (err) return done(err);

        res.body.content.should.equal('Yes');
        done();
      });
  });

  it('should update the Comment', function(done) {
    request(app)
      .put(apiUrl + '/' + exampleComment._id)
      .send({ content: 'Oops!' })
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.content.should.equal('Oops!');
        done();
      });
  });

  it("should find 2 Comments", function(done) {
    request(app)
      .get(apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(2);
        done();
      });
  });

  it("should delete the Comment without error", function(done) {
    request(app)
      .del(apiUrl + '/' + otherComment._id)
      .expect(204, function(err) {
        if (err) return done(err);

        done();
      });
  });

  it("should find no exampleComment in that database", function(done) {
    request(app)
      .get(apiUrl + '/' + otherComment._id)
      .expect(404, function(err, res) {
        if (err) return done(err);

        res.body.message.should.equal("No Comment with that id.");
        done();
      });
  });
});