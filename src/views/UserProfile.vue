<!--User Profile Page -->
<script>
    import { ref } from 'vue';
    import { LineHorizontal320Filled,Pill28Filled, ChannelAdd20Regular, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular, Edit20Regular, AddCircle20Regular } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import { AlertCircle, Logout } from '@vicons/tabler';
    import { UserProfileAlt } from '@vicons/carbon';
    import { CastForEducationFilled } from '@vicons/material';
    
    export default{
        mounted() {
                document.title = "User Profile | ArthriCare";
        },
        setup(){
            const avatar = ref([]);
            return {avatar}
        },
        data(){
            return{
                user:{
                    name: 'Username',
                    level: '10',
                    points: '1000'
                },
                drawer: ref(false),
                showAction: ref(false), //Show actions of the fab
                //For avatar upload
            };
        },
        methods:{
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
            toggleAction(){
                this.showAction.value = !this.showAction.value
            },
            handleAfterRead(avatar) { 
                console.log(avatar)
            },
            async logout(){
                this.$store.dispatch('user/logout');
            },
        },
        components: {
            LineHorizontal320Filled, 
            Pill28Filled, ChannelAdd20Regular,
            Home20Regular, 
            BriefcaseMedical20Regular,
            Gift20Regular, 
            PeopleCommunity20Regular, 
            Edit20Regular,
            AddCircle20Regular,
            UserProfileAlt,
            CastForEducationFilled,
            AlertCircle,
            Logout,
            Icon,
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
                <Icon class="user"><Person20Filled /></Icon>
                <b class="pageTitle">My Profile</b>
                <router-link to="/EditProfile" style="color: white;">
                <Icon class="edit"><Edit20Regular /></Icon>
                </router-link>
            </el-header>
            <el-main class="main">
                    <var-uploader class="avatar" v-model="avatar" @after-read="handleAfterRead" maxlength="1">
                    </var-uploader>
                <h2>{{ user.name }}</h2>
                <p>Level {{ user.level }} | {{ user.points }} points</p>
                <div class="box">
                    <text class="boxTitle">Education</text><br><br>
                    <text class="postText">You don't have any post yet...</text>
                </div>
                <div class="box">
                    <text class="boxTitle">My Friends</text><br><br>
                    <img src="@/assets/friend_1.png" class="friend_avatar"/>
                    <img src="@/assets/friend_2.png" class="friend_avatar"/>
                    <img src="@/assets/friend_3.png" class="friend_avatar"/>
                    <img src="@/assets/friend_4.png" class="friend_avatar"/>
                    <img src="@/assets/friend_5.png" class="friend_avatar"/>
                    <Icon class="add"><AddCircle20Regular /></Icon>
                </div>
                <div class="box">
                    <text class="boxTitle">My Posts</text><br><br>
                    <text class="postText">You don't have any post yet...</text>
                </div>
                <div class="box">
                    <text class="boxTitle">My Puzzles</text><br><br>
                    <img src="@/assets/pic_1.jpg" class="collectionImage" :fit="cover"/>
                    <img src="@/assets/pic_2.jpg" class="collectionImage" :fit="cover"/>
                    <img src="@/assets/pic_3.png" class="collectionImage" :fit="cover"/>
                    <Icon class="add"><AddCircle20Regular /></Icon>
                </div>
                
                
            </el-main> 
        </el-container>
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
    <!-- Side barDrawer -->
    <el-drawer v-model="drawer" direction="ltr" size="70%" :show-close="false" style = " background-color: #006973;">
        <template #header>
            <div class = "topping">
                <var-avatar :size = "100" bordered bordered-color="#FFFFFF" lazy error = "https://img.icons8.com/fluency-systems-regular/48/user--v1.png"/>
            </div>
        </template>
        <div class = "middle">
            <div class = "icon-text-container" @click = "goToUserProfile">
                <div class="icon-container">
                    <Icon><UserProfileAlt/></Icon>
                </div>
                <p>My profile</p>
            </div>
            <div class = "icon-text-container">
                <div class="icon-container">
                    <Icon><CastForEducationFilled/></Icon>
                </div>
                <p>Education</p>
            </div>
        </div>
        <template #footer>
            <div class = "bottom">
                <div class = "icon-text-container">
                    <div class="icon-container">
                        <Icon><AlertCircle/></Icon>
                    </div>
                    <p>About</p>
                </div>
                <div class = "icon-text-container" @click = "logout">
                    <div class="icon-container">
                        <Icon><Logout/></Icon>
                    </div>
                    <p>Log out</p>
                </div>
            </div>
        </template>
    </el-drawer>
    </div>
</template>



<style src = "@/css/userprofile.css" scoped></style>
<style scoped>
.topping{
    color:#FFFFFF;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.var-avatar{
    position: relative;
    top: 5vh;
}
.middle{
    color:#FFFFFF;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
}
.middle p{
    margin-bottom: 20px;
    text-align: center;
    color:#FFFFFF;
}
.icon-container {
    display: inline-block;
    margin-right: 50px; 
}
.icon-text-container {
    display: flex;
    padding-inline: 5px;
    justify-content: center;
}

.bottom{
    color:#FFFFFF;
    font-weight: bold;
    display: flex;
    flex-direction: column;
}
.bottom p {
    margin-bottom: 20px;
    color:#FFFFFF;
}
</style>