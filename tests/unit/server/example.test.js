var supertest = require('supertest');
var request = supertest("http://localhost:8080");

describe('Unit: GET /example', function() {
  it('should be text/html', function() {
    console.log('Querying /example');
    request.get('/example')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function(err) {
        if (err) console.error(err);
      });
  });
});