const db = require('../../../services/database/db')
const ano = require('../../../../config/ano-trabalho')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

let services = {}

services.authenticate = (matricula, senha, senhaDescrypt, nomeSistema, callback) => {

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

	db.query(query, (err, results) => {
		if (err) callback(err)

		if (results.length === 0) {
			callback('Usuário inválido ou inexistente. Tente novamente.')
		} else {
			const token = jwt.sign({ matricula: matricula, senha: senha }, 'mengaomaiordobrasil')

			return callback(null, {
				result: results[0],
				token: token
			})
		}
	})
}

services.changepassword = (matricula, senha, novasenha, callback) => {

	db.query(`SELECT matricula FROM usuarios WHERE matricula = ${matricula}`, function (err, results) {
		if (err) callback(err)

		if (results.length === 0) {
			if (err) callback('Dados inválidos')
		} else {
			db.query(`UPDATE usuarios SET senha = md5(${novasenha}), primeiroacesso = 1, AttemptLogin = 0, date_last_change_pass = NOW() WHERE matricula = ${matricula}`, function (err, results) {
				if (err) callback('Erro update changepassword')

				// return res.status(200).send('Senha alterada')
				// return res.status(200).send(results[0])
				return callback(null, results[0])
			})
		}
	})
}

services.emailForgetPassword = (matricula, callback) => {
	db.query(`SELECT email, senha FROM usuarios WHERE matricula = ${matricula}`, function (err, results) {
		if (err) callback(err)
		
		if (results.length === 0) { 
			throw new Error('Matricula não existe')
			// callback('Matricula não existe')
		} else {
			// O primeiro passo é configurar um transporte para este e-mail 
			// Precisamos dizer qual servidor será o encarregado por enviá-lo:
			const transporte = nodemailer.createTransport({
				service: 'Gmail', // Vamos usar o Gmail
				auth: {
					user: process.env.AUTH_USER, //  nosso usuário
					pass: process.env.AUTH_PASSWORD // senha da nossa conta
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
				if (err) callback('Erro ao enviar e-mail')

				// console.log('Email enviado! Leia as informações adicionais: ', info)
				// return res.status(200).send('E-mail enviado com a nova senha')
				return callback(null, 'E-mail enviado com a nova senha')
			})
		}
	})
}

module.exports = services
