var controller = require('./recruitment.controller');

var router = require('express').Router();

router.get('/', controller.index);
// router.get('/:recrId', controller.show);
// router.post('/create', controller.create);
// router.put('/:recrId', controller.update);
// router.delete('/:recrId', controller.remove);

module.exports = router;