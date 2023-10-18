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
import EducationPage from '@/views/educationView.vue';
import SearchPage from '@/views/searchView.vue';
import EditProfilePage from '@/views/EditProfile.vue';
import EducationArticlePage from '@/views/EducationArticle.vue';
import EducationVideoPage from '@/views/EducationVideo.vue';
import CommunityPage from '@/views/CommunityView.vue';
import MessagePage from '@/views/MessageView.vue';
import ChatPage from '@/views/ChatView.vue';
import AddPostPage from '@/views/AddPostView.vue';
import PostDetailPage from '@/views/PostDetailView.vue';
import MyPostsPage from '@/views/MyPostsView.vue';
import AssessmentPage from '@/views/AssessmentView.vue';
import NotFoundPage from '@/views/NotFoundPageView.vue';
import AboutUsPage from '@/views/AboutUsView.vue';
import PrivacyPolicyPage from '@/views/privacyPolicy.vue';


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
                requiresAuth: false
            }
        },
        {
            path: '/AddMed',
            name: 'AddMed',
            component: AddMedPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/Menu',
            name: 'Menu',
            component: MenuPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/UserProfile',
            name: 'UserProfile',
            component: UserProfilePage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/EditMed',
            name: 'EditMed',
            component: EditMedPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/MyMeds',
            name: 'MyMeds',
            component: MyMedsPage
        },
        {
            path: '/Rewards',
            name: 'Rewards',
            component: RewardsPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/Community',
            name: 'Community',
            component: CommunityPage
        },
        {
            path: '/Education',
            name: 'Education',
            component: EducationPage,
        },
        {
            path: '/Message',
            name: 'Message',
            component: MessagePage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/SearchArticle',
            name: 'SearchArticle',
            component: SearchPage,
        },
        {
            path: '/Chat',
            name: 'Chat',
            component: ChatPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/EducationArticle',
            name: 'EducationArticle',
            component: EducationArticlePage,
        },
        {

            path: '/EducationVideo',
            name: 'EducationVideo',
            component: EducationVideoPage,
        },
        {
            path: '/AddPost',
            name: 'AddPost',
            component: AddPostPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/EditProfile',
            name: 'EditProfile',
            component: EditProfilePage,
        },
        {
          path: '/Assessment',
          name: 'Assessment',
          component: AssessmentPage,
        },
        {
            path: '/PostDetail/:id',
            name: 'PostDetail',
            component: PostDetailPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/MyPosts',
            name: 'MyPosts',
            component: MyPostsPage,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFoundPage',
            component: NotFoundPage
        },
        {
            path: '/AboutUs',
            name: 'AboutUs',
            component: AboutUsPage
        },
        {
            path: '/PrivacyPolicy',
            name: 'PrivacyPolicy',
            component: PrivacyPolicyPage,
        },
    ]
});



// Router Guard 导航守卫

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
