import store from '../vuex'

const isAuthRoute = route => route.path.indexOf('/auth') !== -1
const isAuthenticated = () => store.getters.isAuthenticated

export default (to, from, next) => {
	if (!isAuthRoute(to) && !isAuthenticated()) {
		next('/auth')
	} else {
		next()
	}
}