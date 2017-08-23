import * as types from './mutations-types'

export default {
	[types.setUser](state, user) {
		state.user = user
	},
	// [types.setToken](state, token) {
		// state.token = token
	// },
	[types.setToken](state, token) {
		state.token = token
		localStorage.setItem("token", token)
	},
	[types.removeToken](state) {
		state.token = null
		localStorage.removeItem("token")
		localStorage.removeItem("username")
		localStorage.removeItem("departamento")
		localStorage.removeItem("vercontas")
		localStorage.removeItem("perfil")
	},
	[types.setUsername](state, user) {
		localStorage.setItem("username", user)
		state.user = user
	},
	[types.setDpto](state, user) {
		localStorage.setItem("departamento", user)
		state.user = user
	},
	[types.setVerContas](state, user) {
		localStorage.setItem("vercontas", user)
		state.user = user
	},
	[types.setPerfil](state, user) {
		localStorage.setItem("perfil", user)
		state.user = user
	}
}