let repositorys = {}

repositorys.totalPages_verTodasContas0 = (ano, iduser) => {
  return `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
					FROM blueforms b, itemadiantamento i
					WHERE i.id_adiantamento = b.codigoblueform 
					AND substring(dataregistro,1,4) = ${ano} 
					AND (b.status in(0,1,10) 
					AND b.idusuario = ${iduser}
					OR b.categoriablueform 
					IN('pagamento','reembolso','despesaaluno','deporca'))`
}

repositorys.totalPages_verTodasContas1 = (ano) => {
  return `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
					FROM blueforms b, itemadiantamento i
					WHERE i.id_adiantamento = b.codigoblueform 
					AND substring(dataregistro,1,4) = ${ano} 
					AND (b.status in(0,1,10) 
					OR b.categoriablueform 
					IN('pagamento','reembolso','despesaaluno','deporca'))`
}

repositorys.relatorio_verTodasContas0 = (ano, iduser, limit, offset) => {
  return `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
						 FROM blueforms b, itemadiantamento i
						 WHERE i.id_adiantamento = b.codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano} 
						 AND (b.status in(0,1,10) 
						 AND b.idusuario = ${iduser}
						 OR b.categoriablueform 
						 IN('pagamento','reembolso','despesaaluno','deporca'))
						 LIMIT ${limit} OFFSET ${offset}`
}

repositorys.relatorio_verTodasContas1 = (ano, limit, offset) => {
  return `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
					FROM blueforms b, itemadiantamento i
					WHERE i.id_adiantamento = b.codigoblueform 
					AND substring(dataregistro,1,4) = ${ano} 
					AND (b.status in(0,1,10) 
					OR b.categoriablueform 
					IN('pagamento','reembolso','despesaaluno','deporca'))
					LIMIT ${limit} OFFSET ${offset}`
}

module.exports = repositorys
