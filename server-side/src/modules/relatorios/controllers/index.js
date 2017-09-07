const db = require('../../../services/database/db')
const service = require('../services')

let controller = {}

controller.relatorios_total_pages = (req, res) => {

	let { ver_todas_contas, iduser } = req.body
	
	service.relatorios_total_pages(ver_todas_contas, iduser)
		.then(results => res.status(200).send(results))
		.catch(error => res.status(404).send(error))
}

controller.relatorios = (req, res) => {

	let { ver_todas_contas, iduser } = req.body
	
	let page = req.param('page')
	if (page === undefined) page = 1
	
	const limit = 10

	let offset = 0
	if(page > 1) offset = page * limit - limit

	service.relatorios(ver_todas_contas, iduser, page, limit, offset)
		.then(results => res.status(200).json({ results: results }))
		.catch(error => res.status(404).send(error))
}

module.exports = controller
