<!--User Profile Page -->
<script>
    import { ref } from 'vue';
    import { LineHorizontal320Filled, Add20Filled, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, Person20Filled, Edit20Regular, AddCircle20Regular } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    export default{
        mounted() {
                document.title = "User Profile | ArthriCare";
        },
        setup(){
            const active = ref(3);
            return {active};
        },
        data(){
            return{
                user:{
                    name: 'Username',
                    level: '10',
                    points: '1000'
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
            //Router
            goToUserProfile(){
                this.$router.push('/UserProfile');
            }
        },
        components: {
            UserFilled,
            LineHorizontal320Filled, 
            Add20Filled, 
            Home20Regular, 
            BriefcaseMedical20Regular,
             Gift20Regular, 
             Person20Filled, 
             Edit20Regular,
             AddCircle20Regular,
            Icon,
            SideBarContent
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
                <el-avatar class="avatar">
                    <img src="@/assets/user_avatar.png"/>
                </el-avatar> 
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
            <var-link href="/#/UserProfile" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><Person20Filled /></Icon><br>
                <span>Profile</span>
            </var-bottom-navigation-item>    
            </var-link>
            <template #fab>
                <var-link href="/#/AddMed" style="color: white;">
            <Icon class="addButton"><Add20Filled /></Icon>
            </var-link>
            </template>
        </var-bottom-navigation>
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



<style src = "@/css/userprofile.css" scoped></style>