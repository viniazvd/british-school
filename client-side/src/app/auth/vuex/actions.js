import * as types from './mutations-types'
import { postLogin, tryLogout } from '../services'

export const attemptLogin = (context, payload) => {
	return postLogin(payload.matricula, payload.senha)
		.then(res => res.data)
		.then(data => {
			localStorage.setItem('token', data.senha)
			context.commit(types.setToken, data.senha)
			context.commit(types.setUser, data)
		})
}

export const attemptLogout = (context) => {
	return tryLogout()
		.then(() => {
			localStorage.removeItem('token')
			context.commit(types.setToken, '')
			context.commit(types.setUser, '')
		})
}
