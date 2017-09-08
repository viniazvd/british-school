const app = require('../config/middlewares.js')

const login = require('./modules/login/routes')
const adiantamento = require('./modules/adiantamento/routes')
const relatorios = require('./modules/relatorios/routes')
const cancelamento = require('./modules/cancelamento/routes')

app.use('/api/', login)
app.use('/api/', adiantamento)
app.use('/api/', relatorios)
app.use('/api/', cancelamento)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({ error: err.msg })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({ error: err.msg })
})

module.exports = app
