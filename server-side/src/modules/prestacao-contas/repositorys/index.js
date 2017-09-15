let repositorys = {}

repositorys.totalPages = (ano) => {
  return `SELECT * 
          FROM blueforms 
          WHERE status = 0 
          AND substring(dataregistro,1,4) = ${ano} 
          AND codigoadiantamento IS NOT NULL
          AND codigoadiantamento != 0
          AND categoriablueform = 'adiantamento'`
}

repositorys.prestacaocontas = (ano, limit, offset) => {
  return `SELECT * 
          FROM blueforms 
          WHERE status = 0 
          AND substring(dataregistro,1,4) = ${ano} 
          AND categoriablueform = 'adiantamento'
          AND codigoadiantamento IS NOT NULL
          AND codigoadiantamento != 0
          LIMIT ${limit} OFFSET ${offset}`
}

repositorys.loadAdiantamentoItens = (id) => {
  return `SELECT b.departamento, b.autorizadopor, b.unidade, b.moeda, b.moedacotacao, b.totalblueform, i.iditemadiantamento, i.addescricao, i.advalor, i.prestacaovalor
          FROM blueforms b, itemadiantamento i
          WHERE b.codigoadiantamento = i.id_adiantamento
          AND b.categoriablueform = 'adiantamento'
          AND codigoadiantamento IS NOT NULL
          AND codigoadiantamento != 0
          AND b.codigoadiantamento = '${id}'`
}

module.exports = repositorys
