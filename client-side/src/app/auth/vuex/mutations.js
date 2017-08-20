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
	},
	[types.setUsername](state, user) {
		localStorage.setItem("username", user)
		state.user = user
	}
}