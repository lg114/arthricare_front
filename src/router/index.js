import { createRouter, createWebHashHistory } from 'vue-router';
<<<<<<< Updated upstream
=======
// import { ElMessage } from 'element-plus';

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
import RewardsPage from '@/views/RewardsView.vue';
import CommunityPage from '@/views/CommunityView.vue';



>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        }
    ]
})
=======
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Rewards',
            name: 'Rewards',
            component: RewardsPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Community',
            name: 'Community',
            component: CommunityPage,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

//Router Guard 导航守卫

// router.beforeEach((to, from, next) => {
//     const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
//     if (loggedInUser) {
//         if (to.meta.requiresAuth) {
//             next(); // 已登录且可以访问需要登录的页面
//         } else {
//             next(); // 已登录，但可以访问不需要登录的页面
//         }
//     } else {
//       if (to.meta.requiresAuth) {
//         ElMessage.warning("You haven't log in.");
//         next({ name: 'Welcome' }); //重定向 redirected
//       } else {
//         next(); // 未登录，可以访问不需要登录的页面
//       }
//     }
//   });
>>>>>>> Stashed changes

export default router;