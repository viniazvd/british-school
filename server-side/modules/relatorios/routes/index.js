const router = require('express').Router()
const controller = require('./../controllers')

router.get('/relatorios', controller.relatorios);

module.exports = router