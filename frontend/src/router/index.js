import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Layout',
            redirect: "/home",
            component: ()=> import('../layout/Layout.vue'),
            children:[
                {
                path: 'home',
                name: 'Home',
                component: ()=> import("@/views/Home.vue")
                },
                {
                    path: 'person',
                    name: 'person',
                    component: ()=> import("@/views/Person.vue")
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue')
        }
    ]
})

export default router