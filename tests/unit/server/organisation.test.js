var should = require('should');
var NotFoundError = require('../../../server/lib/errors.js').NotFound;
var exampleOrganisation = require('../../../server/config/seed/test').exampleOrganisation;
var exampleOrganisation1 = require('../../../server/config/seed/test').exampleOrganisation1;

var exampleEvent1 = require('../../../server/config/seed/test').exampleEvent1;

var exampleComment1 = require('../../../server/config/seed/test').exampleComment1;

var exampleUser = require('../../../server/config/seed/test').exampleUser;

var request = require('../../util/ajaxUtil.js');

var otherOrganisation;
var apiUrl = '/api/organisations';
var apiEvent ='/api/events';
var apiComment ='/api/comments';

describe('/organisation', function() {
  beforeEach(function() {
  });

  it('should return json', function(done) {
    request('get', apiUrl)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return example organisation', function(done) {
    request('get', apiUrl)
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

    request('post', apiUrl, otherOrganisation)
      .expect(201, function(err, res) {
        if (err) return done(err);

        res.body.name.should.equal('Red Cross');
        done();
      });
  });

  it('should update the organisation', function(done) {
    var url = apiUrl + '/' + exampleOrganisation._id;

    request('put', url, { description: 'Red damnit' })
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.description.should.equal('Red damnit');
        done();
      });
  });

  it("should find 3 organisations", function(done) {
    request('get', apiUrl)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(3);
        done();
      });
  });

  it("should find organisation with location Tampere", function(done) {
    request('get', apiUrl + '?locations=Tampere')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(1);
        res.body[0].name.should.equal('Red Cross');
        done();
      });
  });

  it("should delete the organisation without error", function(done) {
    request('del', apiUrl + '/' + otherOrganisation._id)
      .expect(204, function(err) {
        if (err) return done(err);

        done();
      });
  });

  it("should find no otherOrganisation in that database", function(done) {
    request('get', apiUrl + '/' + otherOrganisation._id)
      .expect(404, function(err, res) {
        if (err) return done(err);

        res.body.message.should.equal("No Organisation with that id.");
        done();
      });
  });

 it("should delete the exampleOrganisation1 without error", function(done) {
    request('del', apiUrl + '/' + exampleOrganisation1._id)
      .expect(204, function(err) {
        if (err) return done(err);

        done();
      });
  });

  it("should find no exampleOrganisation1 in that database", function(done) {
    request('get', apiUrl + '/' + exampleOrganisation1._id)
      .expect(404, function(err, res) {
        if (err) return done(err);
        res.body.message.should.equal("No Organisation with that id.");
        done();
      });
  });

  it("should find no exampleEvent1 in that database", function(done) {
    request('get', apiEvent + '/' + exampleEvent1._id)
      .expect(404, function(err, res) {
        if (err) return done(err);
        console.log(res.body.message);
        res.body.message.should.equal("No event with that id.");
        done();
      });
  });

  it("should find no exampleComment1 in that database", function(done) {
    request('get', apiComment + '/' + exampleComment1._id)
      .expect(404, function(err, res) {
        if (err) return done(err);
        console.log(res.body.message);
        res.body.message.should.equal("No Comment with that id.");
        done();
      });
  });

  it("shold find exampleOrganisation still in the database", function(done) {
    request('get', apiUrl + '/' + exampleOrganisation._id)
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body._id.should.equal(exampleOrganisation._id);
        done();
     });
  });

  it("should retrieve a list of representatives", function(done) {
    request('get', apiUrl + '/' + exampleOrganisation._id + '/representatives')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(1);
        res.body[0]._id.should.equal(exampleOrganisation.representatives[0].toHexString());
        done();
      });
  });

  it("should retrieve a list of managers", function(done) {
    request('get', apiUrl + '/' + exampleOrganisation._id + '/managers')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(1);
        res.body[0]._id.should.equal(exampleOrganisation.managers[0].toHexString());
        done();
      });
  });

  it("should retrieve a list of events", function(done) {
    request('get', apiUrl + '/' + exampleOrganisation._id + '/events')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(1);
        res.body[0]._id.should.equal(exampleOrganisation.events[0].toHexString());
        done();
      });
  });

  it("should retrieve a list of recruitments", function(done) {
    request('get', apiUrl + '/' + exampleOrganisation._id + '/recruitments')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(1);
        res.body[0]._id.should.equal(exampleOrganisation.recruitments[0].toHexString());
        done();
      });
  });

  it("should return an empty array", function(done) {
    // Remove the user from the database
    request('del', '/api/users/' + exampleUser._id)
      .expect(204, function(err, res) {
        if (err) return done(err);

        // Check that the manager is no longer in the mangers array
        request('get', apiUrl + '/' + exampleOrganisation._id + '/managers')
          .expect(200, function(err, res) {
            if (err) return done(err);

            res.body.length.should.equal(0);

            // Reinsert the user into the database
            request('post', '/api/users', exampleUser)
              .expect(201, function(err) {
                if (err) return done(err);
                done();
              });
          });
      });
  });

  describe("/top10", function() {
    before(function(done) {
      request('post', apiUrl, otherOrganisation)
        .expect(201, function(err) {
          if (err) done(err);

          request('put', apiUrl + '/' + exampleOrganisation._id, { followers: 1 })
            .expect(200, function(err, res) {
              if (err) done(err);

              done();
           });
        });
    });

    it("should return a list of organisations sorted by followers", function() {
      request('get', apiUrl + '/top10')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res) {
          if (err) throw err;

          res.body[0].followers.should.equal(1);
          res.body[1].followers.should.equal(0);
        });
    });
  });
});