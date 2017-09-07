const queryFactory = (db, query) => {
	
	return new Promise((resolve, reject) => {

	db.query(query, (err, results) => {
			if (err) reject(new Error(err))

			return resolve(results[0])
		})
	})
}

module.exports = queryFactory