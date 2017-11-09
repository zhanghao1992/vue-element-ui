import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo'
import Login from '@/components/Login/Login'
import HasLogin from '@/components/HasLogin/HasLogin'
import todoList from '@/components/todoList/todoList'
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
  // console.log(from)
  // console.log(to)
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
