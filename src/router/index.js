import Vue from 'vue'
import Router from 'vue-router'
import VueSession from 'vue-session'
import Demo from '@/views/Demo'
import Login from '@/views/Login/Login'
import HasLogin from '@/views/HasLogin/HasLogin'
import todoList from '@/views/todoList/todoList'
import Echarts from '@/views/Echarts/Echarts'
import Sass from '@/views/Sass/Sass'
import store from '../store/store'

Vue.use(Router)
Vue.use(VueSession)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Demo
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/todolist',
      component: todoList
    },
    {
      path: '/haslogin',
      meta: {
        requireAuth: true
      },
      component: HasLogin
    },
    {
      path: '/echarts',
      component: Echarts
    },
    {
      path: '/sass',
      component: Sass
    }
  ]
})
router.beforeEach((to, from, next) => {
  const WL = window.localStorage
  const userInfo = JSON.parse(WL.getItem('userInfo'))
  store.state.user = userInfo
  if (to.meta && to.meta.requireAuth) {
    if (store.state.user === null) {
      next({path: '/login', component: Login})
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
