import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/views/WelcomeView.vue'

const router  = createRouter({
    history : createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: WelcomePage,
        },
    ]
})

export default router;