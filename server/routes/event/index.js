'use strict';

var controller = require('./event.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:eventId', controller.show);
router.post('/', controller.create);
router.put('/:eventId', controller.update);
router.delete('/:eventId', controller.remove);

router.get('/:eventId/createdBy', controller.getCreatedBy);
router.get('/:eventId/organisation', controller.getOrganisation);
router.get('/:eventId/participants', controller.getParticipants);
router.get('/:eventId/comments', controller.getComments);

router.post('/:eventId/picture', controller.uploadPicture);

module.exports = router;