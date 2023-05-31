import { createRouter, createWebHashHistory } from 'vue-router';
import WelcomePage from '@/views/WelcomeView.vue';
import LoginPage from '@/views/LoginView.vue';

const router  = createRouter({
    history : createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: WelcomePage,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        }
    ]
})

export default router;