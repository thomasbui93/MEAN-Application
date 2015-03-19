'use strict';

var controller = require('./example.controller');

// Create a router to apply rules to.
var router = require('express').Router();

// All these urls are prepended with /example

// I think the naming convention 'index' for all,
// 'show' for one comes from Rails. Doesn't matter
// how they're named as long as we're consistent.
router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);

module.exports = router;