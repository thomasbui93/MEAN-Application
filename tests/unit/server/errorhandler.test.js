var errorhandler = require('../../../server/lib/error-handler.js');
var Errors = require('../../../server/lib/errors.js');

describe("error-handler", function() {
  
  var res;
  var req;

  beforeEach(function() {
    res = {
      send: function() {
        return this;
      },
      json: function(err) {
        return this;
      },
      status: function(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      statusCode: null,
      end: function() {
        return this;
      }
    };
    req = {};
  });

  it("should return with a status 404", function() {
    var error = errorhandler(new Errors.NotFound(), req, res);
    error.statusCode.should.equal(404);
  });

  it("should return a status 401", function() {
    var error = errorhandler(new Errors.Unauthorized(), req, res);
    error.statusCode.should.equal(401);
  });

  it("should return a status 403", function() {
    var error = errorhandler(new Errors.Forbidden(), req, res);
    error.statusCode.should.equal(403);
  });

  it("should return a status 500", function() {
    var error = errorhandler(new Errors.Unknown(), req, res);
    error.statusCode.should.equal(500);
  });

  it("should return a status 500", function() {
    var ValidationError = {
      name: "ValidationError",
      statusCode: null
    };

    var error = errorhandler(ValidationError, req, res);
    error.statusCode.should.equal(500);
  });
});