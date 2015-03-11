'use strict';

var data = [{
  id: 1,
  name: 'Joonas'
},
{
  id: 2,
  name: 'Richard'
},
{
  id: 3,
  name: 'Claudia'
},
{
  id: 4,
  name: 'Tri'
},
{
  id: 5,
  name: 'Khoa'
}];

exports.getAll = function(cb) {
  // In reality we would do an async database call.
  // In case of a database error we would return cb(err);
  // When no error, we pass null as the first parameter
  // and data as the second. This is a convention with Node.js.

  cb(null, data);
};

exports.getById = function(id, cb) {
  for (var i = 0; i < data.length; i++) {
    // Be careful with strings/numbers.
    if (data[i].id === parseInt(id)) {
      return cb(null, data[i]);
    }
  }

  // Not finding an item isn't a server error, so we're
  // still passing null in the error field (to be explicit,
  // we could just do cb(); )
  return cb(null, null);
};