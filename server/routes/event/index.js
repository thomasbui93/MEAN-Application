'use strict';

var controller = require('./event.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:eventId', controller.show);
router.post('/', controller.create);
router.put('/:eventId', controller.update);
router.delete('/:eventId', controller.remove);

module.exports = router;