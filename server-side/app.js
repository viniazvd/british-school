const login = require('./modules/login/routes')
const relatorios = require('./modules/relatorios/routes')

const app = require('./config/middlewares.js')

app.use('/api/', login)
app.use('/api/', relatorios)

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
