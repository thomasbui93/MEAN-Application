'use strict';

var controller = require('./user.controller');
var Auth = require('../../auth/auth.service');

// Create a router to apply rules to.
var router = require('express').Router();

router.get('/', controller.index);
router.get('/self', Auth.isAuthenticated, controller.self);
router.get('/:userId', controller.show);
router.post('/', controller.create);
router.put('/:userId', controller.update);
router.delete('/:userId', controller.remove);

router.post('/:userId/avatar', Auth.isAuthenticated, controller.uploadAvatar);

router.get('/:userId/managedOrganisations', controller.getManagedOrganisations);
router.get('/:userId/representOrganisations', controller.getRepresentOrganisations);
router.get('/:userId/events', controller.getEvents);

module.exports = router;