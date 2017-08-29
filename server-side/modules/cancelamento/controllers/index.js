const db = require('./../../../config/db')
const ano = require('./../../../config/ano-trabalho')

let controller = {}

controller.cancelamento = (req, res) => {

	const { ver_todas_contas, iduser } = req.body
	console.log('ver_todas_contas', ver_todas_contas)
	console.log('iduser', iduser)
	let query = null

	if (ver_todas_contas === 1) {
		query = `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
						 FROM blueforms, itemadiantamento 
						 WHERE (id_adiantamento = codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano})
						 AND (status in(0,1,10))`
	} else {
		query = `SELECT codigoblueform, status, dataregistro, autorizadopor, requisitadopor, evento, advalor
						 FROM blueforms, itemadiantamento 
						 WHERE (id_adiantamento = codigoblueform 
						 AND substring(dataregistro,1,4) = ${ano})
						 AND (status in(0,1,10))`
	}

	console.log(query)

	db.query(query, function (err, results) {
		if (err) return res.status(400).json(err)

		return res.status(200).json(results)
	})
}

module.exports = controller
