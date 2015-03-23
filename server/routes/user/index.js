'use strict';

var controller = require('./user.controller');

// Create a router to apply rules to.
var router = require('express').Router();

router.get('/', controller.index);
router.get('/:userId', controller.show);
router.post('/', controller.create);
router.put('/:userId', controller.update);
router.delete('/:userId', controller.remove);

module.exports = router;