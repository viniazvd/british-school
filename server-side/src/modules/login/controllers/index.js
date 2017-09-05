const db = require('../../../services/database/db')
const service = require('../services')
const crypto = require('crypto')

let controller = {}

// autenticação do usuário
controller.authenticate = (req, res) => {

	const { matricula, senha } = req.body
	const senhaDescrypt = crypto.createHash('md5').update(senha).digest('hex')
	const nomeSistema = 'Expense Report'

	service.authenticate(matricula, senha, senhaDescrypt, nomeSistema, (err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
}

// logout
controller.logout = (req, res) => {

	req.session.destroy()
	return res.status(200)
}

// alterar senha do usuario no login
controller.changepassword = (req, res, next) => {

	const matricula = req.body.matricula
	const senha = req.body.senha
	const novasenha = req.body.novasenha

	service.changepassword(matricula, senha, novasenha, (err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
}

// usuario esqueceu a senha e quer uma nova enviada por e-mail
controller.emailForgetPassword = (req, res) => {

	const matricula = parseInt(req.body.matricula)

	service.emailForgetPassword(matricula, (err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
}

module.exports = controller
