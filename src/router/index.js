import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo'
import Login from '@/components/Login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Demo
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
