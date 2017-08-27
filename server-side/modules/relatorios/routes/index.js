const router = require('express').Router()
const controller = require('./../controllers')

router.post('/relatorios', controller.relatorios);

module.exports = router