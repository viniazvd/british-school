const queryFactory = (db, query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err || results.length == 0) {
        reject(new Error(err))
        return
      }

      return resolve(results[0])
    })
  })
}

module.exports = queryFactory
