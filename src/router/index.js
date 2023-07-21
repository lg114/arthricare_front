import { createRouter, createWebHashHistory } from 'vue-router';
import WelcomePage from '@/views/WelcomeView.vue';
import LoginPage from '@/views/LoginView.vue';
import SignUpPage from '@/views/SignupView.vue';
import ResetPwdPage from '@/views/ResetpwdView.vue';

import AddMedPageMobile from '@/views/AddMed-mobile.vue';
import EditMedPageMobile from '@/views/EditMed-mobile.vue';
import EditMedPage from '@/views/EditMed.vue';
import AddMedPage from '@/views/AddMed.vue';

const router  = createRouter({
    history : createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: WelcomePage,
        },
        {
            path: '/Login',
            name: 'Login',
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
        },
        {
          path: '/AddMed',
          name: 'AddMed',
          component: AddMedPage,
        },
        {
          path: '/EditMed',
          name: 'EditMed',
          component: EditMedPage,
        },
        {
          path: '/AddMed-mobile',
          name: 'AddMed-mobile',
          component: AddMedPageMobile,
        },
        {
          path: '/EditMed-mobile',
          name: 'EditMed-mobile',
          component: EditMedPageMobile,
      }
      ]
  })

export default router;