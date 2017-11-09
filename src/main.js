// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
import VueSession from 'vue-session'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'

Vue.use(Element)

Vue.prototype.$http = axios
Vue.use(VueJsonp)
Vue.use(VueSession)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
