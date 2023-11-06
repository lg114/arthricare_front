<!-- Message Page -->
<script>
    import { ref} from 'vue';
    import { CircleFilled } from '@vicons/material';
    import { LineHorizontal320Filled } from '@vicons/fluent';
    import { Icon } from '@vicons/utils'
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import axios from 'axios';
    import { mapGetters } from 'vuex';



    export default{
        mounted() {
            document.title = "Message | ArthriCare";
            this.initializeUser(); // Call the function to initialize the user
        },

        setup(){


            const avatar1 = ref()
            const avatar2 = ref()
            const avatar3 = ref()
            const avatar4 = ref()
            const avatar5 = ref()
            avatar1.value = require('@/assets/user_avatar.png')
            avatar2.value = require('@/assets/friend_1.png')
            avatar3.value = require('@/assets/friend_2.png')
            avatar4.value = require('@/assets/friend_3.png')
            avatar5.value = require('@/assets/friend_4.png')

            


            return {
                avatar1,
                avatar2,
                avatar3,
                avatar4,
                avatar5,

                
            }
        },

        data(){
            return{
                user:{
                    name: 'Username',
                    level: '10',
                    points: '1000'
                },
                chathistory: [], // Initialize an empty chat list
                drawer: ref(false),
                userAvatarUrl:require('@/assets/default-avatar.png'),

            };
        },

           computed: {
         ...mapGetters('user', ['loggedInUser']), // Map the loggedInUser getter
        },

        methods:{

            initializeUser() {
                const loggedInUser = this.loggedInUser;
                console.log ("here is it", loggedInUser);
                if (loggedInUser){

                    const userFromId = `${loggedInUser.userId}-${loggedInUser.name}`;
                    //console.log('check userfromID',userFromId )
                    this.getChannels(userFromId); // Call the getChannels function with the user's ID
                    

                } else{ 
                    console.log("user not logged in");
                    this.$router.push('/'); }

            },

            async fetchUserAvatarFromBackend(userId){
                const response = await axios.get('http://localhost:8181/api/getUserAvatar/'+ userId);
                return "http://localhost:8181/" + response.data || require('@/assets/default-avatar.png');
            },

            
            async getChannels(userFromId) {
                try {
                    const response = await axios.get(`http://localhost:8181/ComityChat/getChatChannel?userFromId=${userFromId}`);
                    const data = response.data;

                    // 首先添加不包含头像的聊天记录
                    this.chathistory = data.map(chat => {
                        if (chat.userFromId !== userFromId) {
                            const t = chat.userFromId;
                            chat.userFromId = chat.userToId;
                            chat.userToId = t;
                        }
                        // 设置一个初始的占位头像或空值
                        chat.avatar = ''; // 或使用占位图像
                        return chat;
                    });

                    // 异步更新头像信息
                    this.chathistory.forEach(async (chat, index) => {
                        const avatarUrl = await this.fetchUserAvatarFromBackend(chat.userToId.split('-')[0]);
                        // 在 Vue 3 中，直接更新对象即可
                        this.chathistory[index] = { ...chat, avatar: avatarUrl };
                    });
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            },
        
            openDrawer() {
                this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
            //Router
            goToUserProfile(){
                this.$router.push('/UserProfile');
            },
            shortenMessage(latestMassege){
                // Shorten the whole message
                const sentences = latestMassege.split(" ");
                const truncated = sentences.slice(0, 14).join(" ");
                // Return the Shortenede message
                return truncated;
            },
            viewChat(chat) {
                // Navigate to a new page to view the whole post content
                console.log(chat);
                sessionStorage.setItem('chatChannelInfor', JSON.stringify(chat));
                this.$router.push('/Chat');
            }
        },


        components: {
            Icon,
            LineHorizontal320Filled,
            SideBarContent,
            UserFilled,
            CircleFilled
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
                <b class="pageTitle">Message</b>
            </el-header>
            <el-main class="main">
                <input type="text" id="searchUserToChat" placeholder="Search a user here..." />
            
                <div class="chatPartners">
                    <div v-for="chat in chathistory" :key="chat.id" class="chatPartner" @click="viewChat(chat)">
                        <img :src="chat.avatar" alt="avatar" class="avatar" />
                              <!-- Display the user's profile picture (icon) -->
                       <!-- <img :src="chat.icon" alt="avatar" class="avatar" /> -->
                        <div class="name_message">
                            <span class="chatPartner_name">{{ chat.userToId.split('-')[1] }}</span>
                            <span class="chatPartner_latest_massage">{{ shortenMessage(chat.newContent) }}</span>
                        </div>    
                        
                        <div v-if="chat.newMessage === true">
                            <!-- Display an orange circle icon -->
                            <Icon class="orangeCircle"><CircleFilled /></Icon>
                        </div>
                        <div v-if="chat.newMessage === false">
                            <!-- Hide an orange circle icon -->
                        </div>
                    </div>
                </div>

            </el-main> 
        </el-container>
        <el-drawer style="background-color: #006973;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
            <!--Action是模拟接口，与后端连接时更换-->
                <div class = "sidebar">
                    <el-upload action="" :show-file-list="false">
                        <el-avatar :size="65">
                            <img :src="imgUrl" v-if="imgUrl" class="uploaded-avatar" />
                                <template v-else>
                                    <UserFilled class="defalut-avatar" />
                                </template>
                        </el-avatar>   
                    </el-upload> 
                </div>
            <SideBarContent :imgUrl="imgUrl" />    
        </el-drawer>
    </div>
</template>

<style src = "@/css/message.css" scoped></style>