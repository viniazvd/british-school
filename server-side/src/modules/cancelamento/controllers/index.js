const db = require('../../../services/database/db')
const service = require('../services')

let controller = {}

controller.cancelamento_total_pages = (req, res) => {

	const { ver_todas_contas } = req.body

	service.cancelamento_total_pages(ver_todas_contas, (err, results) => {
		if (err) res.status(500).send()
		
		return res.status(200).send(results)
	})
}

controller.cancelamento = (req, res) => {

	let { ver_todas_contas } = req.body
	
	let page = req.param('page')
	if (page === undefined) page = 1
	
	const limit = 10

	let offset = 0
	if(page > 1) offset = page * limit - limit

	service.cancelamento(ver_todas_contas, page, limit, offset, (err, results) => {
		if (err) res.status(500).send()

		return res.status(200).json({ results: results })
	})
}

module.exports = controller
