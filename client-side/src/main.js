import Vue from 'vue'
import App from './App'

import router from './router'

import store from './vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
  el: '#app',
  render: h => h(App)
})
