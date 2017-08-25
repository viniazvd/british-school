const router = require('express').Router()
const controller = require('./../controllers')

router.get('/conta-orcamentaria-dpto1', controller.contaOrcamentaria_dpto1)
router.get('/conta-orcamentaria-dpto2-vercontas0', controller.contaOrcamentaria_dpto2_vercontas0)
router.get('/conta-orcamentaria-dpto2-vercontas1', controller.contaOrcamentaria_dpto2_vercontas1)
router.get('/unidades', controller.unidades)

module.exports = router