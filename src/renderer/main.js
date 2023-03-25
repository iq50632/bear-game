import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
  Vue.use(require('vuetify'))
  require('moment')
}
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
/* eslint-disable no-new */
new Vue({
  components: { App },
  vuetify: new Vuetify(),
  router,
  store,
  template: '<App/>'
}).$mount('#app')
