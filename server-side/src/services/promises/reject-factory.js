const rejectFactory = (db, query, msg) => {
	
	return new Promise((resolve, reject) => {

		db.query(query, (err, results) => {
			if (err) {
				reject('Matrícula incorreta ou inexistente!')
				return
			}
		})
	})
}

module.exports = rejectFactory


