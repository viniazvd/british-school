const router = require('express').Router()
const controller = require('./../controllers')

router.get('/prestacao-contas-total-pages', controller.prestacaocontas_total_pages)
router.get('/prestacao-contas', controller.prestacaocontas)
router.post('/prestacao-itens', controller.loadAdiantamentoItens)

module.exports = router
