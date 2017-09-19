const db = require('../../../services/database/db')
const queryFactory = require('../../../services/promises/query-factory')
const repositorys = require('../repositorys')
const ano = require('../../../../config/ano-trabalho')

let services = {}

services.relatorios_total_pages = (verTodasContas, iduser) => {
  let query = null

  if (verTodasContas == 1) {
    query = repositorys.totalPages_verTodasContas1(ano)
  } else {
    query = repositorys.totalPages_verTodasContas0(ano, iduser)
  }

  return queryFactory(db, query)
}

services.relatorios = (verTodasContas, iduser, page, limit, offset) => {
  let query = null

  if (verTodasContas == 1) {
    query = repositorys.relatorio_verTodasContas1(ano, limit, offset)
  } else {
    query = repositorys.relatorio_verTodasContas0(ano, iduser, limit, offset)
  }

  return queryFactory(db, query)
}

module.exports = services
