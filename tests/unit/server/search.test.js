var request = require('../../util/ajaxUtil.js');
var should = require('should');
var WeightedQueryBuilder = require('../../../server/lib/weighted-query-builder.js');

var apiUrl = '/api/search';

describe("/search", function() {
  it("should return json", function(done) {
    request('get', apiUrl)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it("should find related NGO's", function(done) {
    request('get', apiUrl + '?q=hel')
      .expect(200, function(err, res) {
        if (err) return done(err);

        res.body.length.should.equal(2);
        done();
      });
  });
});