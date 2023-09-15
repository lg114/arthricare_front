<!-- MyPosts Page -->
<script setup>
    import { ref } from 'vue';
    import { ThumbLike20Regular, LineHorizontal320Filled, CommentMultiple20Regular, Pill28Filled, ChannelAdd20Regular , Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
</script>

<template>
    <div class="container">

        <div class = "container-flex">
            <router-link to = "/">
                <el-icon class = "OperaBtn"><LineHorizontal320Filled/></el-icon>
            </router-link>
            <p id="title">My Posts</p>
        </div> 

        <div v-for="post in posts" :key="post.id" class="postCard">
            <div class="icon_name_time">
                <!-- NOTE: the code below to display an image is a hardcode and shouldn'r be used. -->
                <img :src="avatar1" alt="avatar" class="avatar" />
                <!-- NOTE: This code should work, but, for some reason, it's not working. <img :src="post.avatar" :alt="post.alt" />  -->
                <div class="username">{{ post.username }}</div>
                <div class="time-ago">{{ getTimeAgo(post.timestamp) }}</div>
            </div>
            <div class="content" @click="goToPostDetail(post.id)">
                <p class="postTitle">{{ post.title }}</p>
                <p v-if="!post.expanded" class="content">{{ truncateContent(post.content) }}</p>
                <p v-else class="content">{{ post.content }}</p>
                <button @click="goToPostDetail(post.id)" class="seeMoreButton">
                    ... See more
                </button><br>
                <div id="image-scroll-container">
                    <span v-for="(image, imageIndex) in post.images" :key="imageIndex">
                        <img src="@/assets/postImage3.png" :alt="image.alt" class="aImage"/> 
                    </span>    
                </div>
            </div>
            <div class="like_comment_section">
                    <!-- Note for Don:  -->
                    <Icon class="thumbLike_icon"><ThumbLike20Regular /></Icon>
                    <p class="numberOfLikes">{{ post.numberOfLikes }}</p>
                    <Icon class="comment_icon" @click="showCommentInput(post.id)"><CommentMultiple20Regular /></Icon>
                    <p class="numberOfComments">{{ post.numberOfComments }}</p>
                    <div v-if="showCommentInputId === post.id">
                        <input v-model="newComment" placeholder="Enter your comment" />
                        <button @click="addComment(post.id)">Submit</button>
                    </div>
                </div>
            <hr style="width: 100%;">
        </div>

<!--============================ START: The Bottom Navigation Bar ============================-->       
        <var-bottom-navigation
            class="footer"
            v-model:active="active"
            border="true"
            safe-area="true"
            :fab-props="{color:'#55BDCA'}"
        >
            <var-link href="/#/Home" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="homeButton">
                <Icon  style="font-size: 38px;"><Home20Regular /></Icon><br>
                <span>Home</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/MyMeds" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="medsButton">
                <Icon style="font-size: 38px;"><BriefcaseMedical20Regular /></Icon><br>
                <span>My Meds</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/Rewards" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="rewardsButton">
                <Icon style="font-size: 38px;"><Gift20Regular /></Icon><br>
                <span>Rewards</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/Community" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><PeopleCommunity20Regular /></Icon><br>
                <span>Community</span>
            </var-bottom-navigation-item>    
            </var-link>
            <!-- <template #fab >
                <var-link href="/#/AddMed" style="color: white;">
                <Icon class="addButton"><Add20Filled /></Icon>
                </var-link>
            </template> -->
        </var-bottom-navigation>
                        <!-- Fab button -->
                        <var-fab v-model:active="showAction" style="margin-bottom: 100px;" color="#006973" inactive-icon-size="26px" active-icon-size="30px" elevation="5">
            <var-button class="action" round color="#F27B42" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
                <var-link href="/#/AddPost" text-color="white" text-size="25px">
                <Icon><ChannelAdd20Regular /></Icon>
            </var-link>
            </var-button>
            <var-button class="action" round color="#55BDCA" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
                <var-link href="/#/AddMed" text-color="white" text-size="25px">
                    <Icon><Pill28Filled /></Icon>
                </var-link>
            </var-button>
        </var-fab>
<!--============================ END: The Bottom Navigation Bar ============================-->       
<!--============================ START: The Side Menu Bar ============================-->               
        <el-drawer style="background-color: #1890FF;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
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
<!--============================ END: The Side Menu Bar ============================-->        
    </div>
</template>




<script>
    export default{
        mounted() {
            document.title = "My Posts | ArthriCare";
        },
        setup(){
            const avatar1 = ref()
            const avatar2 = ref()
            const avatar3 = ref()
            const avatar4 = ref()
            avatar1.value = require('@/assets/user_avatar.png')
            avatar2.value = require('@/assets/friend_1.png')
            avatar3.value = require('@/assets/friend_2.png')
            avatar4.value = require('@/assets/friend_3.png')
            return {
                avatar1,
                avatar2,
                avatar3,
                avatar4
            }
        },
        data(){
            return{
                user:{
                    name: 'Kris Wu',
                    level: '10',
                    points: '1000',
                    avatar: '@/assets/useravatar.png' 
                },
                drawer: ref(false),
            };
        },
        methods:{
            openDrawer() {
                this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
//============================== START: Unique methods for MyPosts Page ==============================//
            getTimeAgo(timestamp) {
                // Implement the function to calculate time ago from the given timestamp
                const currentTime = new Date();
                const postTime = new Date(timestamp);

                const timeDifference = currentTime - postTime;
                const seconds = Math.floor(timeDifference / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                if (days > 0) {
                    return days + 'd';
                } else if (hours > 0) {
                    return hours + 'h';
                } else if (minutes > 0) {
                    return minutes + 'm';
                } else {
                    return seconds + 's';
                }
            },
            // START: 3 methods for SeeMore buttons
            truncateContent(content) {
                const sentences = content.split(" ");
                const truncated = sentences.slice(0, 22).join(" ");
                return truncated;
            },
            togglePostExpansion(post) {
                console.log('Toggling post expansion', post);
                post.expanded = !post.expanded;
            },
            goToPostDetail() {
                this.$router.push('/PostDtail');
            },
            // END: 3 methods for SeeMore buttons
            // Note for Don: Add a function which adds/remove a like, changes the status of the thumbUp icon.
            toggleLike(){
                // Add or remove a like
                // The thumbUp icon when a user added 'a like' should be 'ThumbLike20Filled'
                // The thumbUp icon when a user removed 'a like' should be 'ThumbLike20Regular'
            }
        },
//============================== END: Unique Functions for MyPosts Page ==============================//
        components: {
            Icon,
            SideBarContent,
            UserFilled,
            LineHorizontal320Filled,
            Pill28Filled, ChannelAdd20Regular , 
            Home20Regular, 
            BriefcaseMedical20Regular, 
            Gift20Regular, 
            PeopleCommunity20Regular,
            ThumbLike20Regular,  // Default like button  // When user liked a post
            CommentMultiple20Regular // comment icon
        }
    };
</script>

<style src="@/css/myPosts.css" scoped></style>