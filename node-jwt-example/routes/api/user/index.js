const router = require('express').Router();
const controller = require('./user.controller')

router.get('/list', controller.list)
router.post('/assign-Admin/:username', controller.assignAdmin);

module.exports = router;