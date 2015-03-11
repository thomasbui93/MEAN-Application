'use strict';

// Choose the seed script depending on environment.
require('./' + process.env.NODE_ENV + '.js');