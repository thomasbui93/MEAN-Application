'use strict';

var controller = require('./user.controller');

// Create a router to apply rules to.
var router = require('express').Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);

module.exports = router;