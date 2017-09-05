const db = require('../../../services/database/db')
const ano = require('../../../../config/ano-trabalho')

let controller = {}

controller.cancelamento_total_pages = (req, res) => {

	let { ver_todas_contas, iduser } = req.body
	let query = null

	if (ver_todas_contas === 1) {
		query = `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
						 FROM blueforms, itemadiantamento 
						 WHERE (id_adiantamento = codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano})
						 AND (status in(0,1,10))`
	} else {
		query = `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
						 FROM blueforms, itemadiantamento 
						 WHERE (id_adiantamento = codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano})
						 AND (status in(0,1,10))`
	}

	db.query(query, function (err, results) {
		if (err) return res.status(400).json(err)

		return res.status(200).json({ results: results })
	})
}

controller.cancelamento = (req, res) => {

	let { ver_todas_contas, iduser } = req.body
	
	let page = req.param('page')
	if (page === undefined) page = 1
	
	const limit = 10

	let offset = page * limit
	if (offset === 10) offset = 0 

	let query = null

	if (ver_todas_contas === 1) {
		query = `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
						 FROM blueforms, itemadiantamento 
						 WHERE (id_adiantamento = codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano})
						 AND (status in(0,1,10))
						 LIMIT ${limit} OFFSET ${offset}`
	} else {
		query = `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
						 FROM blueforms, itemadiantamento 
						 WHERE (id_adiantamento = codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano})
						 AND (status in(0,1,10))
						 LIMIT ${limit} OFFSET ${offset}`
	}

	db.query(query, function (err, results) {
		if (err) return res.status(400).json(err)

		return res.status(200).json({ results: results })
	})
}

module.exports = controller
