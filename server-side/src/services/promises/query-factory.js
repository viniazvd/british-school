const queryFactory = (db, query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(new Error(err))
        return
      }

      return resolve(results)
    })
  })
}

module.exports = queryFactory
