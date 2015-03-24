'use strict';

var controller = require('./comment.controller');

var router = require('express').Router();

router.get('/', controller.index);
router.get('/:commentId', controller.show);
router.post('/', controller.create);
router.put('/:commentId', controller.update);
router.delete('/:commentId', controller.remove);


module.exports = router;