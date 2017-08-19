const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const helmet = require('helmet')
const connecta = require('./config/db.js')

const login = require('./modules/login/routes')
const relatorios = require('./modules/relatorios/routes')

const app = express()

const configSession = { secret: 'e2r3$r!q0oIl', resave: true, saveUninitialized: true }
app.use(session(configSession))

app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

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
