import store from '../vuex'

const isAuthRoute = route => route.path.indexOf('/auth') !== -1
const isAuthenticated = () => store.getters.isAuthenticated
const currentUser = () => store.getters.currentUser

export default (to, from, next) => {
	if (!isAuthRoute(to) && !currentUser()) { //só acessa todos os menu qnd tiver logado
		next('/auth')
	} else if (isAuthRoute(to) && currentUser()) { // dps que tiver logado, não pode acessar tela de login  
		next('/dashboard')
	} else {
		next()
	}
}