const router = require('express').Router()
const controller = require('./../controllers')

router.post('/cancelamento', controller.cancelamento);

module.exports = router