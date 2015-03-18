'use strict';

exports.NotFound = function(message) {
  this.status = 404;
  this.message = message || 'Not found.';
};

exports.Unauthorized = function(message) {
  this.status = 401;
  this.message = message || 'Unauthorized.';
};

exports.Forbidden = function(message) {
  this.status = 403;
  this.message = message || 'Forbidden.';
};

exports.Unknown = function(message) {
  this.status = 500;
  this.message = message || 'Internal server error.';
};

exports.BadRequest = function(message) {
  this.status = 400;
  this.message = message || 'Bad request.';
};