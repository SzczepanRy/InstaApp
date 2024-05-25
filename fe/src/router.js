import { createRouter, createWebHistory } from 'vue-router'

import Login from "./login/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
    }
  ]
})

export default router
