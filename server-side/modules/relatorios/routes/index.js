const router = require('express').Router()
const controller = require('./../controllers')

router.post('/relatorios-total-pages', controller.relatorios_total_pages)
router.post('/relatorios', controller.relatorios)

module.exports = router