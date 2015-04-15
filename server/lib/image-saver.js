'use strict';

var fs = require('fs');
var multiparty = require('multiparty');
var path = require('path');
var _ = require('lodash');

module.exports = ImageSaver;

function ImageSaver(relativePath, fileName) {
  this.relativePath = this.ensureSlashes(relativePath);

  this.path = path.normalize(__dirname + '/../../public/' + this.relativePath);
  this.fileName = fileName;
}

ImageSaver.prototype.ensureSlashes = function(input) {
  if (_.last(input) !== '/') {
    input += '/';
  }

  if (_.first(input) !== '/') {
    input = '/' + input;
  }

  return input;
};

ImageSaver.prototype.saveImageFromRequest = function(req, cb) {
  var self = this;

  fs.exists(this.path, function(exists) {
    if (!exists) return cb('Path ' + self.path + ' does not exist.');

    var form = new multiparty.Form({
      autoFiles: true,
      uploadDir: self.path
    });

    form.on('error', cb);

    form.on('file', function(formFieldName, file) {
      var fileExtension = _.last(file.path.split('.'));
      var newFileName = self.fileName + '.' + fileExtension;

      fs.rename(file.path, self.path + newFileName, function(err) {
        if (err) return cb(err);

        cb(null, {
          url: self.relativePath + newFileName
        });
      });
    });

    form.parse(req, function(err) {
      if (err) return cb(err);
    });
  });
};
