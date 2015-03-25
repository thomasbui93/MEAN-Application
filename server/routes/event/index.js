'use strict';

var controller = require('./event.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:eventId', controller.show);
router.post('/', controller.create);
router.put('/:eventId', controller.update);
router.delete('/:eventId', controller.remove);

router.get('/:eventId/createdBy');
router.get('/:eventId/organisation');
router.get('/:eventId/participants');
router.get('/:eventId/comments');

module.exports = router;