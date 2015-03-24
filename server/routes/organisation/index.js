'use strict';

var controller = require('./organisation.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:orgId', controller.show);
router.post('/', controller.create);
router.put('/:orgId', controller.update);
router.delete('/:orgId', controller.remove);

router.get('/:orgId/managers');
router.get('/:orgId/representatives');
router.get('/:orgId/events');
router.get('/:orgId/recruitments');

module.exports = router;