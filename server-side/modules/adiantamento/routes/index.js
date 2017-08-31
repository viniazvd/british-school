const router = require('express').Router()
const controller = require('./../controllers')

router.post('/conta-orcamentaria-vercontas0', controller.contaOrcamentaria_vercontas0)
router.get('/conta-orcamentaria-vercontas1', controller.contaOrcamentaria_vercontas1)
router.post('/aprovadores', controller.aprovadores)
router.get('/unidades', controller.unidades)
router.post('/registra-adiantamento', controller.registra_adiantamento)

module.exports = router