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

services.prestarcontas = (id, codigoadiantamento, itens) => {
  const updateStatus = id => {
    const queryUpdateStatus = repositorys.updateStatus(id)
    return queryFactory(db, queryUpdateStatus)
  }

  // const updateItens = itens => {
  //   const { itemSelected, valor } = itens

  //   let queryUpdateItens = repositorys.updateItens(itemSelected, valor)
  //   return queryFactory(db, queryUpdateItens)
  // }

  const addItens = (codigoadiantamento, itens) => {
    itens.map(item => {
      if (item.itemSelected !== undefined) {
        const { itemSelected, valor, data, descricaoPrestacao } = item

        let queryAddItens = repositorys.addItens(codigoadiantamento, itemSelected, valor, data, descricaoPrestacao)
        return queryFactory(db, queryAddItens)
      }
    })
  }

  return updateStatus(id).then(() => addItens(codigoadiantamento, itens))// .then(() => updateItens(itens))
}

module.exports = services
