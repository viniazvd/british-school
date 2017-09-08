const db = require('../../../services/database/db')
const configEmailFactory = require('../../../services/email/config-factory')
const repositorys = require('../repositorys')
const jwt = require('jsonwebtoken')
const queryFactoryDif0FirstResult = require('../../../services/promises/query-factory-dif0-first-result')
const queryFactoryFirstResult = require('../../../services/promises/query-factory-first-result')

let services = {}

services.authenticate = (matricula, senha, senhaDescrypt, nomeSistema) => {

	const query = repositorys.authenticate(matricula, senha, senhaDescrypt, nomeSistema)

	return new Promise((resolve, reject) => {

		db.query(query, (err, results) => {
			if (err || results.length == 0) {
				reject(new Error(err))
				return 
			} 

			const token = jwt.sign({ matricula: matricula, senha: senha }, 'mengaomaiordobrasil')
			
			return resolve({ result: results[0], token: token })
		})
	})							
}

services.changepassword = (matricula, senhaCrypt, novasenha) => {

	const hasUser = (matricula, senhaCrypt) => {
		const queryExistUser = repositorys.existUser(matricula, senhaCrypt)
		return queryFactoryDif0FirstResult(db, queryExistUser)
	}

	const updatePassword = (novasenha, matricula) => {
		const queryChangePassword = repositorys.changepassword(novasenha, matricula)
		return queryFactoryFirstResult(db, queryChangePassword)
	}	

	return hasUser(matricula, senhaCrypt).then(() => updatePassword(novasenha, matricula))				
}

services.emailForgetPassword = matricula => {
	
	const query = repositorys.emailForgetPassword(matricula)

	return configEmailFactory(db, query)
}

module.exports = services
