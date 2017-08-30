const db = require('./../../../config/db')
const ano = require('./../../../config/ano-trabalho')

let controller = {}

controller.relatorios_total_pages = (req, res) => {

	let { ver_todas_contas, iduser } = req.body
	let page = req.param('page')
	if (page === undefined )	page = 1
	const limit = 10

	let query = null

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
	console.log(query)
	db.query(query, function (err, results) {
		if (err) return res.status(400).json(err)

		return res.status(200).json({ results: results })
	})
}







controller.relatorios = (req, res) => {

	let { ver_todas_contas, iduser } = req.body
	let page = req.param('page')
	console.log('page', page)
	if (page === undefined )	page = 1
	const limit = 10

	let query = null

	if (ver_todas_contas === 1) {
		query = `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
						 FROM blueforms b, itemadiantamento i
						 WHERE i.id_adiantamento = b.codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano} 
						 AND (b.status in(0,1,10) 
						 OR b.categoriablueform 
						 IN('pagamento','reembolso','despesaaluno','deporca'))
						 LIMIT ${limit} OFFSET ${page*limit}`
	} else {
		query = `SELECT i.id_adiantamento, b.categoriablueform, b.status, i.addata, b.evento  
						 FROM blueforms b, itemadiantamento i
						 WHERE i.id_adiantamento = b.codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano} 
						 AND (b.status in(0,1,10) 
						 AND b.idusuario = ${iduser}
						 OR b.categoriablueform 
						 IN('pagamento','reembolso','despesaaluno','deporca'))
						 LIMIT ${limit} OFFSET ${page*limit}`
	}
	console.log(query)
	db.query(query, function (err, results) {
		if (err) return res.status(400).json(err)

		return res.status(200).json({
			results: results
			// meta:{
			// 	pagination: {
			// 		total: results.length,
			// 		per_page: 50,
			// 		last_page: Math.round(results.length / 50)
			// 		// current_page: 1
			// 	}
 			// } 
		})
	})
}

module.exports = controller
