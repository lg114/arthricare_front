<!--Education Video Page -->
<!-- Author: Tianyi Hu
Student number: 6774179
Date: 2023/10/20 -->

<!-- This is education video page, can be accessed from the Education page.
    At this moment it's just placeholders.
-->
<script>
    import { ref } from 'vue';
    import { ChevronLeft20Filled, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular, CommentMultiple20Regular, Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent'
    import { ThumbUpAltOutlined } from '@vicons/material'
    import { Icon } from '@vicons/utils'

    export default{
        mounted() {
                document.title = "Education Video | ArthriCare";
        },
        setup(){
        },
        data(){
            return{
                videoURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
                selectedVideo:{
                    id: 1,
                    title: 'Example Video',
                    likes: 0
            },
                liked: false,
                showAction: ref(false), //Show actions of the fab
            };
        },
        methods:{
            toggleLike(){
                this.liked = !this.liked;
                if(this.liked){
                    this.selectedVideo.likes++;
                }else{
                    this.selectedVideo.likes--;
                }
            },
            //Router
            goToEducationVideo(){
                this.$router.push('/EducationVideo');
            },
            toggleAction(){
                this.showAction.value = !this.showAction.value
            }
        },
        components: {
            ChevronLeft20Filled, 
            Pill28Filled, ChannelAdd20Regular,
            Home20Regular, 
            BriefcaseMedical20Regular,
            Gift20Regular, 
            PeopleCommunity20Regular, 
            ThumbUpAltOutlined,
            CommentMultiple20Regular,
            Icon,
        }
    };
</script>

<template>
    <div class="container">
            <el-header class="header">
                <router-link to="/education">
                <Icon class="back"><ChevronLeft20Filled /></Icon>
                </router-link>
            </el-header>
            <el-main class="main">
                <h1 class="articleTitle">{{ selectedVideo.title }}</h1>
                <video controls class="video">
                    <source src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=H_AROzOjRZQfJgBm" type="video/mp4">
                </video>
                <div class="likeComment">
                    <Icon :class="['likeButton', {liked : liked}]" @click="toggleLike"><ThumbUpAltOutlined/></Icon>
                    <span class="likeCount">{{ selectedVideo.likes }}</span>
                    <Icon class="commentButton"><CommentMultiple20Regular /></Icon>
                    <span class="commentCount">0</span>
                </div>
                <var-divider />

            </el-main> 
        <var-bottom-navigation
            class="footer"
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
        
    </div>
</template>



<style src = "@/css/EducationVideo.css" scoped></style>