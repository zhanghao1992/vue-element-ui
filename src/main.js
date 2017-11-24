// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import VueJsonp from 'vue-jsonp'
import VueSession from 'vue-session'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import 'jquery'

Vue.use(Element)

axios.interceptors.request.use(config => {
  // console.log(config.method)
  // POST传参序列化
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
    console.log(config.data)
  }

  // const permission = false
  // if (permission) {
  //   // 验证不通过
  //   return Promise.reject({
  //     code: 1,
  //     message: 'no permission'
  //   })
  // }
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
