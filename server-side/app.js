const app = require('./config/middlewares.js')

var jwt = require('jsonwebtoken');

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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', { message: err.message, error: err })
		// res.json({ error: err })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', { message: err.message,error: {} })
})

module.exports = app
