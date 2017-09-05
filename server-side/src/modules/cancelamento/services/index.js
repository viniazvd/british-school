const db = require('../../../services/database/db')
const ano = require('../../../../config/ano-trabalho')

let services = {}

services.cancelamento_total_pages = (ver_todas_contas, callback) => {

	console.log('AAAAAAAAA',ver_todas_contas)

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

	db.query(query, (err, results) => {
		if (err) callback(err)

		return callback(null, results)
	})
}

services.cancelamento = (ver_todas_contas, page, limit, offset, callback) => {

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

	db.query(query, (err, results) => {
		if (err) callback(err)

		return callback(null, results)
	})
}

module.exports = services
