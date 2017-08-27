const db = require('./../../../config/db')
const ano = require('./../../../config/ano-trabalho')

let controller = {}

controller.relatorios = (req, res) => {

	const { ver_todas_contas, iduser } = req.body
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

	db.query(query, function (err, results) {
		if (err) return res.status(400).json(err)

		return res.status(200).json(results)
	})
}

module.exports = controller
