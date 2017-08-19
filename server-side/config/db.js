const mysql = require('mysql')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'db_budget'
})

connection.connect( error => {
	if( !!error ) {
		console.log('Erro ao conectar')
	} else {
		console.log('Conectado!')
	}
})
 
connection.on('close', err => {
  if (err) {
    // fechamento inesperado da conexão, vamos reconectar de volta.
    console.log('Conexão interrompida, tentando reconectar!')
		connection = mysql.createConnection(connection)
  } else {
    console.log('Conexão encerrada!')
  }
})

module.exports = connection