const db = require('../../../services/database/db')
const ano = require('../../../../config/ano-trabalho')

let services = {}

services.relatorios_total_pages = (ver_todas_contas, iduser, callback) => {

	if (ver_todas_contas === 1) {
		query = `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
						 FROM blueforms b, itemadiantamento i
						 WHERE i.id_adiantamento = b.codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano} 
						 AND (b.status in(0,1,10) 
						 OR b.categoriablueform 
						 IN('pagamento','reembolso','despesaaluno','deporca'))`
	} else {
		query = `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
						 FROM blueforms b, itemadiantamento i
						 WHERE i.id_adiantamento = b.codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano} 
						 AND (b.status in(0,1,10) 
						 AND b.idusuario = ${iduser}
						 OR b.categoriablueform 
						 IN('pagamento','reembolso','despesaaluno','deporca'))`
	}

	db.query(query, (err, results) => {
		if (err) callback(err)

		return callback(null, results)
	})
}

services.relatorios = (ver_todas_contas, iduser, page, limit, offset, callback) => {

	let query = null

	if (ver_todas_contas === 1) {
		query = `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
						 FROM blueforms b, itemadiantamento i
						 WHERE i.id_adiantamento = b.codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano} 
						 AND (b.status in(0,1,10) 
						 OR b.categoriablueform 
						 IN('pagamento','reembolso','despesaaluno','deporca'))
						 LIMIT ${limit} OFFSET ${offset}`
	} else {
		query = `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
						 FROM blueforms b, itemadiantamento i
						 WHERE i.id_adiantamento = b.codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano} 
						 AND (b.status in(0,1,10) 
						 AND b.idusuario = ${iduser}
						 OR b.categoriablueform 
						 IN('pagamento','reembolso','despesaaluno','deporca'))
						 LIMIT ${limit} OFFSET ${offset}`
	}

	console.log(query)
	db.query(query, (err, results) => {
		if (err) callback(err)

		return callback(null, results)
	})
}


module.exports = services
