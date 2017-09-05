const nodemailer = require('nodemailer')

// O primeiro passo é configurar um transporte para este e-mail 
// Precisamos dizer qual servidor será o encarregado por enviá-lo:
const transporte = nodemailer.createTransport({
	service: 'Gmail', // Vamos usar o Gmail
	auth: {
		user: 'viniazvd@gmail.com', // Basta dizer qual o nosso usuário
		pass: 'xxx'             // e a senha da nossa conta
	}
})

// Após configurar o transporte chegou a hora de criar um e-mail
// Para enviarmos, para isso basta criar um objeto com algumas configurações
const email = {
	from: 'viniazvd@gmail.com', // Quem enviou este e-mail
	to: 'vn1.job@gmail.com', // Quem receberá
	subject: 'System Recover Password',  // Um assunto  
	html: 'Sua senha é: <strong>Node.js</strong>' // O conteúdo do e-mail
}

// Pronto, tudo em mãos, basta informar para o transporte
// que desejamos enviar este e-mail
module.exports = transporte.sendMail(email, function (err, info) {
	if (err) throw err

	//console.log('Email enviado! Leia as informações adicionais: ', info)
})