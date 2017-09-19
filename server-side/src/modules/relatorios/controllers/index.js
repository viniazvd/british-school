const service = require('../services')

let controller = {}

controller.relatorios_total_pages = (req, res) => {
  let { verTodasContas, iduser } = req.body

  service.relatorios_total_pages(verTodasContas, iduser)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(404).send(error))
}

controller.relatorios = (req, res) => {
  let { verTodasContas, iduser } = req.body
  console.log(verTodasContas, iduser)
  let page = req.param('page')
  if (page === undefined) page = 1

  const limit = 10

  let offset = 0
  if (page > 1) offset = page * limit - limit

  service.relatorios(verTodasContas, iduser, page, limit, offset)
    .then(results => res.status(200).json({ results: results }))
    .catch(error => res.status(404).send(error))
}

module.exports = controller
