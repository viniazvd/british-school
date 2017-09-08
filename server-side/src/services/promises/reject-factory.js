const rejectFactory = (db, query, msg) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(msg)
      }
    })
  })
}

module.exports = rejectFactory


