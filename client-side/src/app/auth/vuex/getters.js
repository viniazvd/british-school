// import { isEmpty } from 'lodash'

// const token = localStorage.getItem('token')
// const username = localStorage.getItem('username')

// export const isLogged = (state) => !isEmpty(state.token)

// export const isLogged = () => {
// 	const token = localStorage.getItem('token')
// 	console.log('token', token)	
// 	return !isEmpty(token)
// }

// export const currentUser = (state) => state.user

export const currentMatricula = (state) => !state.user ? state.user = localStorage.getItem('username') : localStorage.getItem('username')

export const isAuthenticated = (state) => state.token != null
