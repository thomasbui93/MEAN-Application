'use strict';

var controller = require('./login.controller');

// Create a router to apply rules to.
var router = require('express').Router();

// All these urls are prepended with /login

router.post('/', controller.login);

module.exports = router;