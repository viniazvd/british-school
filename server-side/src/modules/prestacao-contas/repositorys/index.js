let repositorys = {}

repositorys.totalPages = (ano) => {
  return `SELECT * 
          FROM blueforms 
          WHERE status = 0 
          AND substring(dataregistro,1,4) = ${ano} 
          AND categoriablueform = 'adiantamento'`
}

repositorys.prestacaocontas = (ano, limit, offset) => {
  return `SELECT * 
          FROM blueforms 
          WHERE status = 0 
          AND substring(dataregistro,1,4) = ${ano} 
          AND categoriablueform = 'adiantamento'
          LIMIT ${limit} OFFSET ${offset}`
}

module.exports = repositorys
