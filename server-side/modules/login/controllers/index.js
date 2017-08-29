const db = require('./../../../config/db')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

let controller = {}

// autenticação do usuário
controller.authenticate = (req, res) => {

	const { matricula, senha } = req.body
	const senhaDescrypt = crypto.createHash('md5').update(senha).digest('hex')
	const nomeSistema = 'Expense Report'

	let query = `SELECT c.nomeusuario,e.depto,e.ver_todas_contas,c.matricula,nomesistema,a.id_perfil_sistema, c.purchasing_id
							 FROM tblusers e,usuario_controle_acesso a,sistemas b,usuarios c ,perfis_acesso_sistemas d 
							 WHERE a.id_sistema = b.idsistema 
							 AND c.idusuario = a.id_usuario 
							 AND a.id_sistema = d.id_sistema 
							 AND a.id_perfil_sistema = d.idperfilsistema 
							 AND c.matricula = ${matricula}
							 AND c.senha = '${senhaDescrypt}'
							 AND purchasing_id > 0 
							 AND purchasing_id = e.id_user 
							 AND b.nomesistema = '${nomeSistema}'`

	db.query(query, function (err, results) {
		
		if (err) throw new Error('ERRO: ', err)

		if (results.length === 0) {
			throw new Error('Usuário inválido ou inexistente. Tente novamente.')
		} else {
			const token = jwt.sign({ matricula: matricula, senha: senha }, 'mengaomaiordobrasil')

			req.session.ver_todas_contas = results[0].ver_todas_contas
			req.session.matricula = results[0].matricula

			return res.status(200).send({
				result: results[0],
				token: token
			})
		}
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

	db.query(`SELECT matricula FROM usuarios WHERE matricula = ${matricula}`, function (err, results) {
		if (err) return res.status(400).send('Erro change password sql')

		if (results.length === 0) {
			res.status(400).send('Senha inválida')
		} else {
			db.query(`UPDATE usuarios SET senha = md5(${novasenha}), primeiroacesso = 1, AttemptLogin = 0, date_last_change_pass = NOW() WHERE matricula = ${matricula}`, function (err, results) {
				if (err) return res.status(400).send('Erro no update do change password')

				// return res.status(200).send('Senha alterada')
				return res.status(200).send(results[0])
			})
		}
	})
}

// usuario esqueceu a senha e quer uma nova enviada por e-mail
controller.emailForgetPassword = (req, res) => {

	const matricula = parseInt(req.body.matricula)

	db.query(`SELECT email, senha FROM usuarios WHERE matricula = ${matricula}`, function (err, results) {
		if (err) return res.status(400).send('Erro')

		// O primeiro passo é configurar um transporte para este e-mail 
		// Precisamos dizer qual servidor será o encarregado por enviá-lo:
		const transporte = nodemailer.createTransport({
			service: 'Gmail', // Vamos usar o Gmail
			auth: {
				user: 'viniazvd@gmail.com', //  nosso usuário
				pass: 'xxxxx'             // senha da nossa conta
			}
		})

		// Após configurar o transporte chegou a hora de criar um e-mail
		// Para enviarmos, para isso basta criar um objeto com algumas configurações
		const email = {
			from: 'viniazvd@gmail.com', // quem enviou este e-mail
			to: 'vn1.job@gmail.com', // quem receberá
			//to: `${results[0].email}`, // quem receberá
			subject: 'System Recover Password',  // Um assunto  
			html: `Sua senha é: <strong>${results[0].senha}</strong>` // O conteúdo do e-mail
		}

		transporte.sendMail(email, function (err, info) {
			if (err) return res.status(400).send('Erro ao enviar e-mail')

			// console.log('Email enviado! Leia as informações adicionais: ', info)
			return res.status(200).send('E-mail enviado com a nova senha')
		})
	})
}

module.exports = controller
