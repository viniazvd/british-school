const service = require('../services')

let controller = {}

controller.cancelamento_total_pages = (req, res) => {
  const { ver_todas_contas } = req.body

  service.cancelamento_total_pages(ver_todas_contas)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

controller.cancelamento = (req, res) => {
  let { ver_todas_contas } = req.body

  let page = req.param('page')
  if (page === undefined) page = 1

  const limit = 10

  let offset = 0
  if (page > 1) offset = page * limit - limit

  service.cancelamento(ver_todas_contas, page, limit, offset)
    .then(results => res.status(200).json({ results: results }))
    .catch(error => res.status(404).send(error))
}

module.exports = controller
