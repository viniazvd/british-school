import Vue from 'vue'
import App from './app/Main.vue'
import router from './router'
import store from './vuex'
import Loader from './plugins/loader'

Vue.use(Loader, store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
  el: '#app',
  render: h => h(App)
})
