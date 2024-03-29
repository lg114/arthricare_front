import { createRouter, createWebHashHistory } from 'vue-router';
import WelcomePage from '@/views/WelcomeView.vue';
import LoginPage from '@/views/LoginView.vue';
import SignUpPage from '@/views/SignupView.vue';
import ResetPwdPage from '@/views/ResetpwdView.vue';
import HomePage from '@/views/HomepageView.vue';
import AddMedPage from '@/views/addMed.vue';
import MenuPage from '@/views/MenuView.vue';
import UserProfilePage from '@/views/UserProfile.vue';
import EditMedPage from '@/views/editMed.vue';
import MyMedsPage from '@/views/MyMedsView.vue';

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
            path: '/Home',
            name: 'Home',
            component: HomePage,
        },
        {
          path: '/AddMed',
          name: 'AddMed',
          component: AddMedPage,
        },
        {
            path: '/Menu',
            name: 'Menu',
            component: MenuPage,
        },
        {
            path: '/UserProfile',
            name: 'UserProfile',
            component: UserProfilePage,
        },
        {
            path: '/EditMed',
            name: 'EditMed',
            component: EditMedPage,
        },
        {
            path: '/MyMeds',
            name: 'MyMeds',
            component: MyMedsPage,
        }
    ]
})

export default router;