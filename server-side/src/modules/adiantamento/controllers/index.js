const ano = require('../../../../config/ano-trabalho')
const service = require('../services')

let controller = {}

controller.contaOrcamentaria_vercontas0 = (req, res) => {
  const { purchasing_id, departamento, vercontas } = req.body

  service.contaOrcamentaria_vercontas0(purchasing_id, departamento, vercontas, ano)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

controller.contaOrcamentaria_vercontas1 = (req, res) => {
  service.contaOrcamentaria_vercontas1(ano)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

controller.aprovadores = (req, res) => {
  const { id_user } = req.body

  service.aprovadores(id_user)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

controller.unidades = (req, res) => {
  service.unidades()
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

controller.registra_adiantamento = (req, res) => {
  const { adiantamento, itens, purchasing_id, valorTotalItens, deposito } = req.body

  service.registra_adiantamento(adiantamento, itens, purchasing_id, valorTotalItens, deposito)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

module.exports = controller
