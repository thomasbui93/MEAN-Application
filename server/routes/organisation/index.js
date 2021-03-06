'use strict';

var controller = require('./organisation.controller');
var Auth = require('../../auth/auth.service');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/top10', controller.getTopTen);

router.get('/:orgId', controller.show);
router.post('/', controller.create);
router.put('/:orgId', controller.update);
router.delete('/:orgId', controller.remove);

router.post('/:orgId/picture', Auth.isAuthenticated, controller.uploadPicture);
router.post('/:orgId/banner', Auth.isAuthenticated, controller.uploadBanner);

router.get('/:orgId/managers', controller.getManagers);
router.get('/:orgId/representatives', controller.getRepresentatives);
router.get('/:orgId/events', controller.getEvents);
router.get('/:orgId/recruitments', controller.getRecruitments);

module.exports = router;