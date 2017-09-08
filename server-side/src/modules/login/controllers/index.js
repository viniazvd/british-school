const service = require('../services')
const crypto = require('crypto')

let controller = {}

// autenticação do usuário
controller.authenticate = (req, res) => {
  const { matricula, senha } = req.body
  const senhaDescrypt = crypto.createHash('md5').update(senha).digest('hex')
  const nomeSistema = 'Expense Report'

  service.authenticate(matricula, senha, senhaDescrypt, nomeSistema)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

// logout
controller.logout = (req, res) => {
  // req.session.destroy()
  return res.status(200)
}

// alterar senha do usuario no login
controller.changepassword = (req, res, next) => {
  const matricula = req.body.matricula
  const senha = req.body.senha
  const senhaCrypt = crypto.createHash('md5').update(senha).digest('hex')
  const novasenha = req.body.novasenha

  service.changepassword(matricula, senhaCrypt, novasenha)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

// usuario esqueceu a senha e quer uma nova enviada por e-mail
controller.emailForgetPassword = (req, res) => {
  const matricula = parseInt(req.body.matricula)

  service.emailForgetPassword(matricula)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

module.exports = controller
