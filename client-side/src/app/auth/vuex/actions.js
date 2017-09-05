import * as types from './mutations-types'
import { autenticacao, postEmail, postPassword } from '../services'
import http from '../../../http'

export const attemptLogin = (context, payload) => {
	return autenticacao(payload.matricula, payload.senha)
		.then(res => res.data)
		.then(data => {
			context.commit(types.setUsername, data.result.nomeusuario)
			context.commit(types.setIdUser, data.result.purchasing_id)
			context.commit(types.setDpto, data.result.depto)
			context.commit(types.setVerContas, data.result.ver_todas_contas)
			context.commit(types.setPerfil, data.result.id_perfil_sistema)
			context.commit(types.setToken, data.token)
			context.commit(types.setUser, data.result)
		})
}

export const attemptLogout = (context) => {
	context.commit(types.removeToken, '')
	context.commit(types.setUser, '')
	return http.get('http://localhost:3000/api/logout')
}

export const forgotPassword = (context, payload) => {
	return postEmail(payload.matricula)
		.then(res => res.data)
		.then(data => {
			context.commit(types.setUser, data)
		})
		.catch(err => console.log('AUHUAHUAHUAHUAHUAUHUHAH',err))
}

export const changeUserPassword = (context, payload) => {
	return postPassword(payload.matricula, payload.senha, payload.novasenha)
		.then(res => res.data)
		.then(data => {
			// context.commit(types.setToken, data.senha)
			context.commit(types.setUser, data)
		})
}

export const hasToken = (context, payload) => {
	context.commit(types.setToken, payload)
}