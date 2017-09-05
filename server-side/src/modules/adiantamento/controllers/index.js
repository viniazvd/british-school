const db = require('../../../services/database/db')
const ano = require('../../../../config/ano-trabalho')
const service = require('../services')

let controller = {}

controller.contaOrcamentaria_vercontas0 = (req, res) => {

	const { purchasing_id, departamento, vercontas } = req.body

	service.contaOrcamentaria_vercontas0(purchasing_id, departamento, vercontas, ano, (err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
}

controller.contaOrcamentaria_vercontas1 = (req, res) => {

	service.contaOrcamentaria_vercontas1(ano, (err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
}

controller.aprovadores = (req, res) => {

	const { id_user } = req.body

	service.aprovadores(id_user, (err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
}

controller.unidades = (req, res) => {
	
	service.unidades((err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
}

controller.registra_adiantamento = (req, res) => {

	// adiantamento, itens, purchasing_id, valorTotalItens, deposito

	service.registra_adiantamento(req.body.adiantamento, req.body.purchasing_id, req.body.valorTotalItens, req.body.deposito, (err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
	
}

module.exports = controller
