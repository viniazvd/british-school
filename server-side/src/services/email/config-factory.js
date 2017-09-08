const nodemailer = require('nodemailer')

const configFactory = (db, query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err || results.length == 0) {
        reject(new Error(err))
        return
      }

      // O primeiro passo é configurar um transporte para este e-mail 
      // Precisamos dizer qual servidor será o encarregado por enviá-lo:
      const transporte = nodemailer.createTransport({
        service: 'Gmail', // Vamos usar o Gmail
        auth: {
          user: process.env.AUTH_USER, //  nosso usuário
          pass: process.env.AUTH_PASSWORD // senha da nossa conta
        }
      })

      // Após configurar o transporte chegou a hora de criar um e-mail
      // Para enviarmos, para isso basta criar um objeto com algumas configurações
      const email = {
        from: 'viniazvd@gmail.com', // quem enviou este e-mail
        to: 'vn1.job@gmail.com', // quem receberá
        //to: `${results[0].email}`, // quem receberá
        subject: 'System Recover Password',  // Um assunto  
        html: `Sua senha é: <strong>${results[0].senha}</strong>` // O conteúdo do e-mail
      }

      transporte.sendMail(email, (err, info) => {
        if (err) {
          reject(new Error(err))
          return
        }

        return resolve('E-mail enviado com a nova senha')
      })
    })
  })
}

module.exports = configFactory
