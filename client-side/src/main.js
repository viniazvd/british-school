import Vue from 'vue'
import App from './app/Main.vue'
import router from './router'
import store from './vuex'
import money from 'v-money'

Vue.use(store)
Vue.use(money, { decimal: ',', precision: 2, thousands: '.', masked: false })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
  el: '#app',
  render: h => h(App)
})
