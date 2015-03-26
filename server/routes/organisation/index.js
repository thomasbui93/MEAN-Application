'use strict';

var controller = require('./organisation.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:orgId', controller.show);
router.post('/', controller.create);
router.put('/:orgId', controller.update);
router.delete('/:orgId', controller.remove);

router.get('/:orgId/managers', controller.managers);
router.get('/:orgId/representatives', controller.representatives);
router.get('/:orgId/events', controller.events);
router.get('/:orgId/recruitments', controller.recruitments);


module.exports = router;