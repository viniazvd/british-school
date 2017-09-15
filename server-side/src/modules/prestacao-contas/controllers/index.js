const service = require('../services')

let controller = {}

controller.prestacaocontas_total_pages = (req, res) => {
  service.prestacaocontas_total_pages()
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

controller.prestacaocontas = (req, res) => {
  let page = req.param('page')
  if (page === undefined) page = 1

  const limit = 10

  let offset = 0
  if (page > 1) offset = page * limit - limit

  service.prestacaocontas(page, limit, offset)
    .then(results => res.status(200).json({ results: results }))
    .catch(error => res.status(404).send(error))
}

controller.loadAdiantamentoItens = (req, res) => {
  const id = req.body.id

  service.loadAdiantamentoItens(id)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

controller.prestarcontas = (req, res) => {
  const { id, itens } = req.body

  service.prestarcontas(id, itens)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

module.exports = controller
