const app = require('../config/middlewares.js')

const login = require('./modules/login/routes')
const adiantamento = require('./modules/adiantamento/routes')
const relatorios = require('./modules/relatorios/routes')
const cancelamento = require('./modules/cancelamento/routes')
const prestacaoContas = require('./modules/prestacao-contas/routes')

app.use('/api/', login)
app.use('/api/', adiantamento)
app.use('/api/', relatorios)
app.use('/api/', cancelamento)
app.use('/api/', prestacaoContas)

module.exports = app
