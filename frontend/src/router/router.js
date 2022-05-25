import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import UserProfile from '@/views/UserProfile.vue'
import PathNotFound from '@/views/PathNotFound.vue'

const routes = [
    {
        requireAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token') == null) {
                next({ name: 'login' })
            } else {
                next()
            }
        },
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
    },
    {
        name: 'signup',
        path: '/signup',
        component: Signup
    },
    {
        requireAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token') == null) {
                next({ name: 'login' })
            } else {
                next()
            }
        },
        name: 'profile',
        path: '/profile',
        component: UserProfile
    }, {
        name: 'PathNotFound',
        path: '/:pathMatch(.*)*',
        component: PathNotFound,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router