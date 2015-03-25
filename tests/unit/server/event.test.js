var request = require('../../util/ajaxUtil.js');
var should = require('should');
var NotFoundError = require('../../../server/lib/errors.js').NotFound;
var exampleEvent = require('../../../server/config/seed/test').exampleEvent;

var otherEvent;
var apiUrl = '/api/events';

describe('/events', function() {
  beforeEach(function() {
  });

  it('should return json', function(done) {
    request('get', apiUrl)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return example Event', function(done) {
    request('get', apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body[0].name.should.equal(exampleEvent.name);
        done();
      });
  });

  it('should create a new Event', function(done) {
    otherEvent = {
      name: 'Homeless help',
      startDate: new Date(),
      endDate: new Date(),
      description: "Help homeless!",
      _id: '55095c4e2d313735807fe46c'
    };

    request('post', apiUrl, otherEvent)
      .expect(201, function(err, res) {
        if (err) return done(err);

        res.body.name.should.equal('Homeless help');
        done();
      });
  });

  it('should update the Event', function(done) {
    request('put', apiUrl + '/' + otherEvent._id, { description: 'Help others!' })
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.description.should.equal('Help others!');
        done();
      });
  });

  it("should find 2 Events", function(done) {
    request('get', apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(2);
        done();
      });
  });

  it("should find Event with name Homeless help", function(done) {
    request('get', apiUrl + '?name=Homeless+help')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(1);
        res.body[0].name.should.equal('Homeless help');
        done();
      });
  });

  it("should delete the Event without error", function(done) {
    request('del', apiUrl + '/' + otherEvent._id)
      .expect(204, function(err) {
        if (err) return done(err);

        done();
      });
  });

  it("should find no otherEvent in that database", function(done) {
    request('get', apiUrl + '/' + otherEvent._id)
      .expect(404, function(err, res) {
        if (err) return done(err);

        res.body.message.should.equal("No event with that id.");
        done();
      });
  });

  it("should find the exampleEvent", function(done) {
    request('get', apiUrl + '/' + exampleEvent._id)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.name.should.equal(exampleEvent.name);
        done();
      });
  });

  it("should find the creator of the event", function(done) {
    request('get', apiUrl + '/' + exampleEvent._id + '/createdBy')
      .expect(200, function(err, res) {
        if (err) return next(err);

        res.body.firstName.should.equal("First");
        done();
      });
  });

  it("should find the organisation of the event", function(done) {
    request('get', apiUrl + '/' + exampleEvent._id + '/organisation')
      .expect(200, function(err, res) {
        if (err) return next(err);

        res.body.name.should.equal("Greenpeace");
        done();
      });
  });

  it("should find the participants of the event", function(done) {
    request('get', apiUrl + '/' + exampleEvent._id + '/participants')
      .expect(200, function(err, res) {
        if (err) return next(err);

        res.body[0].firstName.should.equal("First");
        done();
      });
  });

  it("should find the comments of the event", function(done) {
    request('get', apiUrl + '/' + exampleEvent._id + '/comments')
      .expect(200, function(err, res) {
        if (err) return next(err);
        
        res.body[0].content.should.equal("Oops!");
        done();
      });
  });
});