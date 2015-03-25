'use strict';

var controller = require('./event.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:eventId', controller.show);
router.post('/', controller.create);
router.put('/:eventId', controller.update);
router.delete('/:eventId', controller.remove);

router.get('/:eventId/CreatedBy', controller.getCreatedBy);
router.get('/:eventId/Organisation', controller.getOrganisation);
router.get('/:eventId/Participants', controller.getParticipants);
router.get('/:eventId/Comments', controller.getComments);

module.exports = router;