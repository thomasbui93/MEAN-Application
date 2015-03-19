'use strict';

var controller = require('./organization.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:orgId', controller.show);
router.post('/', controller.create);
router.put('/:orgId', controller.update);
router.delete('/:orgId', controller.remove);

module.exports = router;