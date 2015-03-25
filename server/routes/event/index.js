'use strict';

var controller = require('./event.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:eventId', controller.show);
router.post('/', controller.create);
router.put('/:eventId', controller.update);
router.delete('/:eventId', controller.remove);

// router.get('/:eventId/getCreatedBy', controller.createdBy);
// router.get('/:eventId/getOrganisation');
// router.get('/:eventId/getParticipants');
// router.get('/:eventId/getComments');

module.exports = router;