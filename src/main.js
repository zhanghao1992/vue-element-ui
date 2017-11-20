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
import 'jquery'

Vue.use(Element)

axios.interceptors.request.use(config => {
  console.log('00000000000000')
  console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios.interceptors.response.use(function (response) {
//   // console.log(response)
//   if (response.config.url.indexOf('createCaptcha')) {
//     store.commit('SET_CAPTCHA', response.data.response.token)
//     // Object.assign(response, {xx: 'zz'})
//     // const res1 = JSON.parse(response.request.response)
//     // res1.response.token = ''
//     // const res2 = JSON.stringify(res1)
//     // console.log(res2)
//     // console.log(typeof response.request)
//     // response.request.response = Object.assign(response.request.response, res2)
//     return response
//   } else {
//     return response
//   }
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

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
