import Vue from 'vue'
import App from './app/Main.vue'
import router from './router'
import store from './vuex'
import money from 'v-money'

Vue.use(store)
Vue.use(money, { decimal: ',', precision: 2, thousands: '.', masked: false })

Vue.filter('truncateEvento', value => value.slice(0, 30) + '...')
Vue.filter('truncateData', value => value.slice(0, 10))
Vue.filter('truncateNomeLogin', value => value.slice(0, 17) + '...')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
