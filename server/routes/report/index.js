'use strict';

var controller = require('./report.controller');

// Create a router to apply rules to.
var router = require('express').Router();

router.get('/', controller.index);
router.get('/:reportId', controller.show);
router.post('/', controller.create);
router.put('/:reportId', controller.update);
router.delete('/:reportId', controller.remove);

module.exports = router;