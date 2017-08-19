// const router = require('express').Router()
const loginController = require('./../modules/login/controllers')
const relatorioController = require('./../modules/relatorios/controllers')

// router.get('/', loginController.list)
// router.get('/relatorios', relatorioController.list)

module.exports = {
	loginController,
	relatorioController
}