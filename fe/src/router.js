import { createRouter, createWebHistory } from 'vue-router'

import Login from "./login/Login.vue"
import Main from "./main/main.vue"

import Home from "./main/views/home.vue"

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
            component: Main,
            children: [
                { path: "" , component: Home }
            ]
        }

    ]
})

export default router
