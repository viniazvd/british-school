const db = require('../../../services/database/db')
const queryFactory = require('../../../services/promises/query-factory')
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

	return queryFactory(db, query)
}

services.cancelamento = (ver_todas_contas, page, limit, offset) => {

	let query = null

	if (ver_todas_contas === 1) {
		query = repositorys.cancelamento_verTodasContas1(ano, limit, offset)
	} else {
		query = repositorys.cancelamento_verTodasContas0(ano, limit, offset)
	}

	return queryFactory(db, query)
}

module.exports = services
