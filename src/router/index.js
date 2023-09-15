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
                requiresAuth: true
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
                requiresAuth: true
            }
        },
        {
            path: '/MyPosts',
            name: 'MyPosts',
            component: MyPostsPage,
            meta: {
                requiresAuth: true
            }
            
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
