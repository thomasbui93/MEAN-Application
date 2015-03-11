'use strict';

var Example = require('./example.model');

exports.index = function(req, res) {
  Example.getAll(function(err, data) {
    // Check if an error occured and send http error code
    // and the serialized error object. In reality we should
    // probably have the errors propagate forward, collected
    // at the end of the Express middleware pipelines and
    // suitable error message should be sent there.
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      // No data was found so 404 is a suitable error code.
      return res.status(404).end();
    }

    // Otherwise send the data as json.
    res.json(data);
  });
};

exports.show = function(req, res) {
  // This is the number passed as the id in url
  // /api/example/:id
  var id = req.params.id;

  Example.getById(id, function(err, item) {
    if (err) return res.status(500).json(err);
    if (!item) return res.status(404).end();

    res.json(item);
  });
};