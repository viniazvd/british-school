const db = require('../../../services/database/db')
const queryFactory = require('../../../services/promises/query-factory')
const repositorys = require('../repositorys')
const ano = require('../../../../config/ano-trabalho')

let services = {}

services.prestacaocontas_total_pages = () => {
  const query = repositorys.totalPages(ano)

  return queryFactory(db, query)
}

services.prestacaocontas = (page, limit, offset) => {
  let query = repositorys.prestacaocontas(ano, limit, offset)

  return queryFactory(db, query)
}

services.loadAdiantamentoItens = (id) => {
  const query = repositorys.loadAdiantamentoItens(id)

  return queryFactory(db, query)
}

module.exports = services
