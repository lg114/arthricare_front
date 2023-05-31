import { createRouter, createWebHashHistory } from 'vue-router';
import WelcomePage from '@/views/WelcomeView.vue';
import LoginPage from '@/views/LoginView.vue';
import SignUpPage from '@/views/SignupView.vue';
import ResetPwdPage from '@/views/ResetowdView.vue';

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
        },
        {
            path: '/Resetpassword',
            name: 'Resetpassword',
            component: ResetPwdPage,
        },
        {
            path: '/Signup',
            name: 'Signup',
            component: SignUpPage,
        }
    ]
})

export default router;