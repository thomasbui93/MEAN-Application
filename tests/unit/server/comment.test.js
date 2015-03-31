var request = require('../../util/ajaxUtil.js');
var should = require('should');
var NotFoundError = require('../../../server/lib/errors.js').NotFound;
var exampleComment = require('../../../server/config/seed/test').exampleComment;

var otherComment;
var apiUrl = '/api/comments';

describe('/comments', function() {
  beforeEach(function() {
  });

  it('should return json', function(done) {
    request('get', apiUrl)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return example Comment', function(done) {
    request('get', apiUrl)
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

    request('post', apiUrl, otherComment)
      .expect(201, function(err, res) {
        if (err) return done(err);

        res.body.content.should.equal('Yes');
        done();
      });
  });

  it('should update the Comment', function(done) {
    request('put', apiUrl + '/' + exampleComment._id, { content: 'Oops!' })
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.content.should.equal('Oops!');
        done();
      });
  });

  it("should find 2 Comments", function(done) {
    request('get', apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(2);
        done();
      });
  });

  it("should delete the Comment without error", function(done) {
    request('del', apiUrl + '/' + otherComment._id)
      .expect(204, function(err) {
        if (err) return done(err);

        done();
      });
  });

  it("should find no otherComment in that database", function(done) {
    request('get', apiUrl + '/' + otherComment._id)
      .expect(404, function(err, res) {
        if (err) return done(err);

        res.body.message.should.equal("No Comment with that id.");
        done();
      });
  });

  it("should retrieve the creator of the comment", function(done) {
    request('get', apiUrl + '/' + exampleComment._id + '/createdBy')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.firstName.should.equal("First");
        done();
      });
  });

  it("should retrieve the event of the comment", function(done) {
    request('get', apiUrl + '/' + exampleComment._id + '/event')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.name.should.equal('Help');
        done();
      });
  });
});