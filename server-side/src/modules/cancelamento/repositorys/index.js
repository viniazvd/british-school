let repositorys = {}

repositorys.totalPages_verTodasContas0 = (ano) => {
  return `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
					FROM blueforms, itemadiantamento 
					WHERE (id_adiantamento = codigoblueform 
					AND substring(dataregistro,1,4) = ${ano})
					AND (status in(0,1,10))`
}

repositorys.totalPages_verTodasContas1 = (ano) => {
  return `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
					FROM blueforms, itemadiantamento 
					WHERE (id_adiantamento = codigoblueform 
					AND substring(dataregistro,1,4) = ${ano})
					AND (status in(0,1,10))`
}

repositorys.cancelamento_verTodasContas0 = (ano, limit, offset) => {
  return `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
					FROM blueforms, itemadiantamento 
					WHERE (id_adiantamento = codigoblueform 
					AND substring(dataregistro,1,4) = ${ano})
					AND (status in(0,1,10))
					LIMIT ${limit} OFFSET ${offset}`
}

repositorys.cancelamento_verTodasContas1 = (ano, limit, offset) => {
  return `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
					FROM blueforms, itemadiantamento 
					WHERE (id_adiantamento = codigoblueform 
					AND substring(dataregistro,1,4) = ${ano})
					AND (status in(0,1,10))
					LIMIT ${limit} OFFSET ${offset}`
}

module.exports = repositorys
