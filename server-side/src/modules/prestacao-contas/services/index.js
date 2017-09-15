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

services.prestarcontas = (id, itens) => {
  const updateStatus = id => {
    const queryUpdateStatus = repositorys.updateStatus(id)
    console.log(queryUpdateStatus)
    return queryFactory(db, queryUpdateStatus)
  }

  const updateItens = () => {
    itens.map(item => {
      if (item.itemSelected !== undefined) {
        const { itemSelected, valor, data, descricaoPrestacao } = item

        let queryUpdateItens = repositorys.updateItens(itemSelected, valor, data, descricaoPrestacao)
        console.log(queryUpdateItens)
        return queryFactory(db, queryUpdateItens)
      }
    })
  }

  return updateStatus(id).then(() => updateItens())
}

module.exports = services

// const insertItens = codigoAdiantamento => {
//   itens.map(item => {
//     let query = repositorys.queryItens(dataRegistro, item.descricao, item.valor, codigoAdiantamento + 1)

//     return queryFactory(db, query)
//   })
// }
