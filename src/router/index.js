import { createRouter, createWebHashHistory } from 'vue-router';
import WelcomePage from '@/views/WelcomeView.vue';
import LoginPage from '@/views/LoginView.vue';
import SignUpPage from '@/views/SignupView.vue';
import ResetPwdPage from '@/views/ResetpwdView.vue';
import AddMedPageMobile from '@/views/AddMed-mobile.vue';
import EditMedPageMobile from '@/views/EditMed-mobile.vue';
import MyMeds2 from '@/views/MyMeds2.vue';
import MyMeds1 from '@/views/MyMedsView.vue';



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
          path: '/AddMed-mobile',
          name: 'AddMed-mobile',
          component: AddMedPageMobile,
          meta: { keepAlive: true }
         
        },
        {
          path: '/EditMed-mobile',
          name: 'EditMed-mobile',
          component: EditMedPageMobile,
          meta: { keepAlive: true }
      },
      {
        path: '/MyMeds2',
        name: 'MyMeds2',
        component: MyMeds2,
        meta: { keepAlive: true }
    },
    {
      path: '/MyMeds1',
      name: 'MyMeds1',
      component: MyMeds1,
      meta: { keepAlive: true }
  }
      ]
  })
 
export default router 

