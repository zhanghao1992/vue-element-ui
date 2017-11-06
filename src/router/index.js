import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo'
import Login from '@/components/Login/Login'
import todoList from '@/components/todoList/todoList'

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
    },
    {
      path: '/todolist',
      component: todoList
    }
  ]
})
