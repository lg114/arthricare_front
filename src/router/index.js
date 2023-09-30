import { createRouter, createWebHashHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import store from '@/store';
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
import RewardsPage from '@/views/RewardsView.vue';

import newHome from '@/views/newHome.vue';


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
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/AddMed',
            name: 'AddMed',
            component: AddMedPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Menu',
            name: 'Menu',
            component: MenuPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/UserProfile',
            name: 'UserProfile',
            component: UserProfilePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/EditMed',
            name: 'EditMed',
            component: EditMedPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/MyMeds',
            name: 'MyMeds',
            component: MyMedsPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Rewards',
            name: 'Rewards',
            component: RewardsPage,
            meta: {
<<<<<<< Updated upstream
=======
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
        },
        {
            path: '/Education',
            name: 'Education',
            component: EducationPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Message',
            name: 'Message',
            component: MessagePage,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/SearchArticle',
            name: 'SearchArticle',
            component: SearchPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Chat',
            name: 'Chat',
            component: ChatPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/EducationArticle',
            name: 'EducationArticle',
            component: EducationArticlePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/EducationVideo',
            name: 'EducationVideo',
            component: EducationVideoPage,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/AddPost',
            name: 'AddPost',
            component: AddPostPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/EditProfile',
            name: 'EditProfile',
            component: EditProfilePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Assessment',
            name: 'Assessment',
            component: AssessmentPage,
            meta: {
                requiresAuth: true
                }
        },
        {
            path: '/PostDetail/:id',
            name: 'PostDetail',
            component: PostDetailPage,
            meta: {
>>>>>>> Stashed changes
                requiresAuth: true
            }
        },
        {
<<<<<<< Updated upstream
            path: '/newhome',
            name: 'newhome',
            component: newHome,
        }
=======
            path: '/MyPosts',
            name: 'MyPosts',
            component: MyPostsPage,
            meta: {
                requiresAuth: true
            }
        },
        
>>>>>>> Stashed changes
    ]
});

//Router Guard 导航守卫

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['user/isLoggedIn']) {
          next(); // 已登录，继续访问
        } else {
            ElMessage.warning("You haven't logged in.");
            next({ name: 'Welcome' }); // 重定向到欢迎页面
        }
      } else {
        next(); // 不需要身份验证的路由，直接继续访问
    }
});



export default router;