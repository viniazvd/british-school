let repositorys = {}

repositorys.totalPages_verTodasContas0 = (ano, iduser) => {
  return `SELECT codigoblueform, categoriablueform, status, dataregistro, evento  
          FROM blueforms 
          WHERE substring(dataregistro,1,4) = ${ano} 
          AND (status in(0,1,10))
          AND idusuario = ${iduser}`
}

repositorys.totalPages_verTodasContas1 = (ano) => {
  return `SELECT codigoblueform, categoriablueform, status, dataregistro, evento  
          FROM blueforms 
          WHERE substring(dataregistro,1,4) = ${ano} 
          AND (status in(0,1,10))`
}

repositorys.relatorio_verTodasContas0 = (ano, iduser, limit, offset) => {
  return `SELECT codigoblueform, categoriablueform, status, dataregistro, evento  
          FROM blueforms 
          WHERE substring(dataregistro,1,4) = ${ano} 
          AND (status in(0,1,10))
          AND idusuario = ${iduser}
          LIMIT ${limit} OFFSET ${offset}`
}

repositorys.relatorio_verTodasContas1 = (ano, limit, offset) => {
  return `SELECT codigoblueform, categoriablueform, status, dataregistro, evento  
          FROM blueforms 
          WHERE substring(dataregistro,1,4) = ${ano} 
          AND (status in(0,1,10))
          LIMIT ${limit} OFFSET ${offset}`
}

module.exports = repositorys
