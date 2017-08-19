import http from '../../http'

export const postLogin = (matricula, senha) => {
	return http.post('http://localhost:3000/api/authenticate', {
		matricula: matricula,
		senha: senha
   })
}

