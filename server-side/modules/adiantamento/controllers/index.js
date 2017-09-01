const db = require('./../../../config/db')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const ano = require('./../../../config/ano-trabalho')

let controller = {}

// carrega no select/option as contas orçamentárias referentes a usuários com: vercontas = 0
// todos os usuarios administrativos tem que ser inclusos na tabela user_view_budget com id = 999999 (00WS)
controller.contaOrcamentaria_vercontas0 = (req, res) => {

	const { purchasing_id, departamento, vercontas } = req.body

	let query = `SELECT id, chave, setor, conta, nconta, saldo, ano
							 FROM orcamento 
							 WHERE ano = ${ano} 
							 AND id IN 
							 (
							   SELECT uv.id_budget 
								 FROM user_view_budget as uv, tblusers as tu
								 WHERE uv.id_user = tu.ID_USER
								 AND uv.ID_USER = ${purchasing_id}
								 AND tu.depto = ${departamento} 
								 AND tu.ver_todas_contas = ${vercontas}
							 )`
					console.log(query)

	db.query(query, function (err, results) {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

// carrega no select/option as contas orçamentárias referentes a usuários com: vercontas = 1 
controller.contaOrcamentaria_vercontas1 = (req, res) => {

	let query = `SELECT id, chave, setor, conta, nconta, saldo
						   FROM orcamento 
						 	 WHERE ano = ${ano}`

	db.query(query, function (err, results) {
		
		if (err) return res.status(400).json(err)

		return res.status(200).send(results)
	})
}

// carrega no select/option os aprovadores referentes a conta orçamentária 
controller.aprovadores = (req, res) => {

	const { id_user } = req.body

	let query = `SELECT tbl.Fname, tbl.LName
							 FROM tblusers as tbl, user_approve_budget as uab
							 WHERE tbl.ID_USER = uab.id_user
							 AND uab.ID_USER = ${id_user}`

console.log(query)
	db.query(query, function (err, results) {
		
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

//insere no banco os adiantamentos no blueforms e itens no itensadiantamento
controller.registra_adiantamento = (req, res) => {

	const { adiantamento, itens } = req.body

	console.log('adiantamento', adiantamento, 'itens', itens)
	// let queryAdiantamento = ``
	
	// console.log(queryAdiantamento)

	// db.query(query, function (err, results) {
		
	// 	if (err) return res.status(400).json(err)

	// 	return res.status(200).send(results)
	// })
}

module.exports = controller
