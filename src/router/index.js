import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/Demo'
import Login from '@/views/Login/Login'
import HasLogin from '@/views/HasLogin/HasLogin'
import todoList from '@/views/todoList/todoList'
import store from '../store/store'

Vue.use(Router)

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
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta && to.meta.requireAuth) {
    if (store.state.user.name === '') {
      next({path: '/login', component: Login})
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
