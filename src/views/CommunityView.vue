<script>
    import { ref } from 'vue';
    import { AccountCircleRound, ModeEditOutlineOutlined, MoreHorizFilled, MedicationOutlined, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled, AddCircleOutlineFilled, ChevronLeftRound } from '@vicons/material';
    import { Icon } from '@vicons/utils'

    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    export default{
        mounted() {
                document.title = "Community | ArthriCare";
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
                this.$router.push('/Community');
            }
        },
        components: {
            Icon,
            MoreHorizFilled,
            MedicationOutlined, 
            CardGiftcardOutlined, 
            HomeRound, 
            AccountCircleOutlined,
            AddCircleFilled,
            AddCircleOutlineFilled,
            AccountCircleRound,
            ModeEditOutlineOutlined,
            SideBarContent,
            UserFilled,
            ChevronLeftRound
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><MoreHorizFilled /></Icon>
                <Icon class="user"><AccountCircleRound /></Icon>
                <b class="pageTitle">My Profile</b>
                <Icon class="edit"><ModeEditOutlineOutlined /></Icon>
            </el-header>
            <el-main class="main">
                <el-avatar class="avatar">
                    <img src="@/assets/user_avatar.png"/>
                </el-avatar> 
                <h2>{{ user.name }}</h2>
                <p>Level {{ user.level }} | {{ user.points }} points</p>
                <div class="box">
                    <text class="boxTitle">My Puzzles</text><br><br>
                    <img src="@/assets/pic_1.jpg" class="collectionImage" :fit="cover"/>
                    <img src="@/assets/pic_2.jpg" class="collectionImage" :fit="cover"/>
                    <img src="@/assets/pic_3.png" class="collectionImage" :fit="cover"/><br>
                    <Icon class="add"><AddCircleOutlineFilled /></Icon>
                </div>
                <div class="box">
                    <text class="boxTitle">My Friends</text><br><br>
                    <img src="@/assets/friend_1.png" class="friend_avatar"/>
                    <img src="@/assets/friend_2.png" class="friend_avatar"/>
                    <img src="@/assets/friend_3.png" class="friend_avatar"/>
                    <img src="@/assets/friend_4.png" class="friend_avatar"/>
                    <img src="@/assets/friend_5.png" class="friend_avatar"/>
                    <Icon class="add"><AddCircleOutlineFilled /></Icon>
                </div>
                <div class="box">
                    <text class="boxTitle">My Posts</text><br><br>
                    <text class="postText">You don't have any post yet...</text>
                    <Icon class="add"><AddCircleOutlineFilled /></Icon>
                </div>
                <Icon><ChevronLeftRound/></Icon>
            </el-main> 
        </el-container>
        <el-footer class="footer">
                <router-link to = "/Home">
                        <Icon class="footerBtn" id="home"><HomeRound /></Icon>      
                </router-link>
                <router-link to = "/MyMeds">
                    <Icon class="footerBtn" id="medication"><MedicationOutlined /></Icon>  
                </router-link>
                <router-link to = "/AddMed">
                    <Icon class="footerBtn" id="addMed"><AddCircleFilled /></Icon>  
                </router-link>
                <router-link to = "/Rewards">
                <Icon class="footerBtn" id="rewards"><CardGiftcardOutlined /></Icon>
                </router-link>
                <Icon class="footerBtn" id="profile"><AccountCircleOutlined /></Icon><br>
                <span id="homeText">Home</span>
                <span id="medText">My Meds</span>
                <span id="rewardsText">Rewards</span>
                <span id="profileText">Profile</span>
        </el-footer>
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
    </div>
</template>



<style src = "@/css/userprofile.css" scoped></style>