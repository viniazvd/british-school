const db = require('./../../../config/db')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const ano = require('./../../../config/ano-trabalho')

let controller = {}

// carrega no select/option as contas orçamentárias referentes a usuários com: departamento = 1
controller.contaOrcamentaria_dpto1 = (req, res) => {

	db.query(`SELECT chave
						FROM orcamento
						WHERE chave = '00100100WS${ano}'`, function (err, results) {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

// carrega no select/option as contas orçamentárias referentes a usuários com: dpto=2 e ver_todas_contas=0
controller.contaOrcamentaria_dpto2_vercontas0 = (req, res) => {

	db.query(`SELECT chave
						FROM orcamento
						WHERE chave = '00100100WS${ano}'`, function (err, results) {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

// carrega no select/option as contas orçamentárias referentes a usuários com: dpto=2 e ver_todas_contas=1
controller.contaOrcamentaria_dpto2_vercontas1 = (req, res) => {
	
	db.query(`SELECT chave FROM orcamento WHERE ano = '${ano}'`, function (err, results) {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

// carrega no select/option as unidades
controller.unidades = (req, res) => {
	
	db.query(`SELECT unidade FROM unidades`, function (err, results) {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

module.exports = controller
