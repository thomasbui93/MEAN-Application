var request = require('supertest');
var app = require('../../app.js');



module.exports = function(reqType, url, body) {
  if (body) {
    return request(app)[reqType](url).send(body);
  }

  return request(app)[reqType](url);
};