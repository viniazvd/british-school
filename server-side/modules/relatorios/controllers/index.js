const db = require('./../../../config/db')
const ano = require('./../../../config/ano-trabalho')

let controller = {}

controller.relatorios = (req, res) => {

	const query = null
	
	if (req.session.ver_todas_contas == 1) {
		console.log('===1')
		query = `SELECT * FROM blueforms, itemadiantamento WHERE id_adiantamento = codigoblueform AND substring(dataregistro,1,4) = ${ano} AND (status in(0,1,10) OR categoriablueform in('pagamento','reembolso','despesaaluno','deporca')) ORDER BY dataregistro DESC`
	} else {
		console.log('!==1')
	query = `SELECT * FROM blueforms, itemadiantamento WHERE id_adiantamento = codigoblueform AND substring(dataregistro,1,4) = ${ano} AND idusuario = ${req.session.idusuario} AND (status in(0,1,10) or categoriablueform in('pagamento','reembolso','despesaaluno','deporca')) ORDER BY dataregistro DESC`
	}

	db.query(query, function (err, results) {
		if (err) return res.status(400).json(err)

		return res.status(200).json(results[0])
	})
}

module.exports = controller
