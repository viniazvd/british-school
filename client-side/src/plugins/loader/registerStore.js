import module from './vuex'

const registerStore = store => {
	store.registerModule('VINI_LOADER', { ...module })
}

export default registerStore