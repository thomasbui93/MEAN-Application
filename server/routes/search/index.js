'use strict';

var controller = require('./search.controller');
var router = require('express').Router();

router.get('/', controller.index);

module.exports = router;