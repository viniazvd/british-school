import http from '../../http'

export const autenticacao = (matricula, senha) => {
	return http.post('http://localhost:3000/api/authenticate', {
		matricula: matricula,
		senha: senha
   })
}

export const postEmail = (matricula) => {
	return http.post('http://localhost:3000/api/email-forget-password', {
		matricula: matricula
   })
}

export const postPassword = (matricula, senha, novasenha) => {
	return http.post('http://localhost:3000/api/change-password', {
		matricula: matricula,
		senha: senha,
		novasenha: novasenha
   })
}