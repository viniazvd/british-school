const router = require('express').Router()
const controller = require('./../controllers')

router.post('/cancelamento', controller.cancelamento)
router.post('/cancelamento-total-pages', controller.cancelamento_total_pages)
router.post('/cancelar', controller.cancelar)

module.exports = router
