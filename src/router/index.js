import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Demo from '@/views/Demo'
import Login from '@/views/Login/Login'
import HasLogin from '@/views/HasLogin/HasLogin'
import todoList from '@/views/todoList/todoList'
import Echarts from '@/views/Echarts/Echarts'
import Sass from '@/views/Sass/Sass'
import Mock from '@/views/Mock/Mock'
import Shop from '@/views/Shop/Shop'
import noFound from '@/views/404/404'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: noFound
    },
    {
      path: '/',
      component: Demo
    },
    {
      path: '/login',
      component: Login,
      beforeEnter (to, from, next) {
        // console.log(to)
        // console.log(from)
        next()
      }
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
    },
    {
      path: '/mock',
      component: Mock
    },
    {
      path: '/shop',
      // meta: {
      //   requireAuth: true
      // },
      component: Shop
    }
  ]
})
router.beforeEach((to, from, next) => {
  // const WL = window.localStorage
  // const userInfo = JSON.parse(WL.getItem('userInfo'))
  // store.state.user = userInfo
  if (to.meta && to.meta.requireAuth) {
    // 获取session
    if (store.state.user) {
      next()
    } else {
      axios.get('/node_common/getSession').then((json) => {
        console.log(json.data)
        store.state.user = json.data.response.session.user
        if (!store.state.user || store.state.user === null) {
          next({path: '/login', component: Login})
        } else {
          next()
        }
      })
    }
  } else {
    next()
  }
})
export default router
