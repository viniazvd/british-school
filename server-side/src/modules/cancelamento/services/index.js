const db = require('../../../services/database/db')
const repositorys = require('../repositorys')
const ano = require('../../../../config/ano-trabalho')

let services = {}

services.cancelamento_total_pages = (ver_todas_contas) => {

	let query = null

	if (ver_todas_contas === 1) {
		query = repositorys.totalPages_verTodasContas1(ano)
	} else {
		query = repositorys.totalPages_verTodasContas0(ano)
	}

	return new Promise((resolve, reject) => {

		db.query(query, (err, results) => {
			if (err) reject(new Error(err))

			return resolve(results)
		})
	})
}

services.cancelamento = (ver_todas_contas, page, limit, offset) => {

	let query = null

	if (ver_todas_contas === 1) {
		query = repositorys.cancelamento_verTodasContas1(ano, limit, offset)
	} else {
		query = repositorys.cancelamento_verTodasContas0(ano, limit, offset)
	}

	return new Promise((resolve, reject) => {

		db.query(query, (err, results) => {
			if (err) reject(new Error(err))

			return resolve(results)
		})
	})
}

module.exports = services
