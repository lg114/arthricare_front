import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/WelcomePage.vue';
import Login from '@/views/LoginPage.vue';

const router  = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})

export default router