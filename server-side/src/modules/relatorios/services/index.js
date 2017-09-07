const db = require('../../../services/database/db')
const repositorys = require('../repositorys')
const ano = require('../../../../config/ano-trabalho')

let services = {}

services.relatorios_total_pages = (ver_todas_contas, iduser) => {

	let query = null

	if (ver_todas_contas === 1) {
		query = repositorys.totalPages_verTodasContas1(ano)
	} else {
		query = repositorys.totalPages_verTodasContas0(ano, iduser)
	}

	return new Promise((resolve, reject) => {

		db.query(query, (err, results) => {
			if (err) reject(new Error(err))

			return resolve(results)
		})
	})
}

services.relatorios = (ver_todas_contas, iduser, page, limit, offset) => {

	if (ver_todas_contas === 1) {
		query = repositorys.relatorio_verTodasContas1(ano, limit, offset)
	} else {
		query = repositorys.relatorio_verTodasContas0(ano, iduser, limit, offset)
	}

	return new Promise((resolve, reject) => {

		db.query(query, (err, results) => {
			if (err) reject(new Error(err))

			return resolve(results)
		})
	})
}

module.exports = services
