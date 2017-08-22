const express = require('express')
const middlewares = express()

const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const helmet = require('helmet')

const configSession = { secret: 'e2r3$r!q0oIl', resave: true, saveUninitialized: true }
middlewares.use(session(configSession))

middlewares.use(helmet())
middlewares.use(logger('dev'))
middlewares.use(bodyParser.json())
middlewares.use(bodyParser.urlencoded({ extended: true }))
middlewares.use(cookieParser())
middlewares.use(express.static(path.join(__dirname, 'public')))
middlewares.use(cors())

module.exports = middlewares