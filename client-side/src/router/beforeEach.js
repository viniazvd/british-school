import store from '../vuex'

const isAuthRoute = route => route.path.indexOf('/auth') !== -1
const isAuthenticated = () => store.getters.isAuthenticated
const currentMatricula = () => store.getters.currentMatricula

export default (to, from, next) => {
	if (!isAuthRoute(to) && !currentMatricula()) { //só acessa todos os menu qnd tiver logado
		next('/auth')
	} else if (isAuthRoute(to) && currentMatricula()) { // dps que tiver logado, não pode acessar tela de login  
		next('/dashboard')
	} else {
		next()
	}
}