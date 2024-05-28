import { createRouter, createWebHistory } from 'vue-router'

import Login from "./login/Login.vue"
import Main from "./main/main.vue"

import Home from "./main/views/home/home.vue"
import Photo from "./main/views/photo/photo.vue"
import Upload from "./main/views/upload/upload.vue"
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
                { path: "" , component: Home },
                {path: "photo/:id" ,name:"photo", component: Photo},
                {path:"upload" ,name:"upload", component:Upload}
            ]
        }

    ]
})

export default router
