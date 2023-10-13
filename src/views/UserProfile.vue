<!--User Profile Page -->
<script>
    import { ref } from 'vue';
    import { LineHorizontal320Filled,Pill28Filled, ChannelAdd20Regular, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular, Edit20Regular, Camera20Filled } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    
    export default{
        mounted() {
                document.title = "User Profile | ArthriCare";
        },
        setup(){
        },
        data(){
            return{
                user:{
                    name: 'Username',
                    level: '10',
                    points: '1000'
                },
                puzzle:{
                    url: require("@/assets/puzzleImage/puzzle1_completed.jpg"),
                    title: 'The Starry Night',
                },
                drawer: ref(false),
                showAction: ref(false), //Show actions of the fab
                //For avatar upload
                avatarData: null
            };
        },
        computed:{
            avatarStyle(){
                if(this.avatarData){
                    return{
                        backgroundImage: `url(${this.avatarData})`
                    };
                }
                return {};
            }
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
            previewAvatar(event){
                const file = event.target.files[0];
                if(file){
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.avatarData = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
        },
        components: {
            UserFilled,
            LineHorizontal320Filled, 
            Pill28Filled, ChannelAdd20Regular,
            Home20Regular, 
            BriefcaseMedical20Regular,
             Gift20Regular, 
             PeopleCommunity20Regular, 
             Edit20Regular,
            //  AddCircle20Regular,
            Icon,
            SideBarContent,
            Camera20Filled
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
                <!-- <Icon class="user"><Person20Filled /></Icon> -->
                <b class="pageTitle">My Profile</b>
                <router-link to="/EditProfile" style="color: white;">
                <Icon class="edit"><Edit20Regular /></Icon>
                </router-link>
            </el-header>
            <el-main class="main">
                <div class="avatarWrapper">
                    <!-- NEED TO BE CONNECTED TO THE BACKEND
                         AVATAR IMAGE VARIABLE IS IN THE SCRIPT {avatarData}
                         需要连接后端
                         头像图片的变量名为{avatarData}
                    -->
                    <label class="avatarLabel">
                        <div class="avatar" :style="avatarStyle">
                            <div v-if="!avatarData" class="plusIcon"><Icon><Camera20Filled /></Icon></div>
                        </div>
                        <input type="file" @change="previewAvatar" style="display: none">
                    </label>
                </div>
                <h2 style="margin-top: 5px;">{{ user.name }}</h2>
                <p>Level {{ user.level }} | {{ user.points }} points</p>
                <!-- <div class="box"> -->
                    <!-- JUST PLACEHOLDER 无需连接后端 -->
                    <!-- <span class="boxTitle">My Education</span><br><br>
                    <var-row justify="center">
                        <var-button-group class="educationButtonGroup" size="large">
                            <var-link to="/EducationVideo" underline="none">
                            <var-button color="#55BDCA" text-color="white">Video</var-button>
                            </var-link>
                            <var-link to="/EducationArticle" underline="none">
                            <var-button color="#F27B42" text-color="white">Article</var-button>
                            </var-link>
                        </var-button-group>
                    </var-row>
                </div>
                <div class="box"> -->
                    <!-- NEED TO BE CONNECTED TO THE BACKEND
                         INCLUDING CONTACTS' AVATARS
                         AND CORRESPONDING CHAT PAGE
                        需要连接后端
                        包括联系人头像
                        与相应的消息界面
                    -->
                    <!-- <span class="boxTitle">Latest Contacts</span><br><br>
                    <var-link to="/Chat">
                        <img src="@/assets/friend_1.png" class="friend_avatar"/>
                    </var-link>
                    <var-link to="/Chat">
                        <img src="@/assets/friend_2.png" class="friend_avatar"/>
                    </var-link>
                    <var-link to="/Chat">
                        <img src="@/assets/friend_3.png" class="friend_avatar"/>
                    </var-link>
                    <var-link to="/Chat">
                        <img src="@/assets/friend_4.png" class="friend_avatar"/>
                    </var-link>
                    <var-link to="/Chat">
                        <img src="@/assets/friend_5.png" class="friend_avatar"/>
                    </var-link>
                </div>
                <div class="box"> -->
                    <!-- NEED TO BE CONNECTED TO THE BACKEND
                         USER'S MOST RECENT POST
                         需要连接后端
                         用户最新发布的帖子
                    -->
                    <!-- <span class="boxTitle">My Posts</span><br><br>
                    <var-row justify="center">
                        <var-link to="/PostDetail/1" underline="none">
                        <var-button block size="large" color="#F27B42" text-color="white">My Recent Post</var-button>
                        </var-link>
                    </var-row>
                </div> -->
                <div class="box">
                    <h2 class="boxTitle">My Puzzles</h2>
                    <var-divider style="--divider-color: white" />
                    <span class="puzzleTitle">{{ puzzle.title }}</span>
                    <img :src="puzzle.url" class="puzzleImg"/>
                </div>
                    <!-- NEED TO BE CONNECTED TO THE BACKEND
                         USER'S COMPLETED PUZZLE PICTURES
                         需要连接后端
                         用户已完成的拼图
                    -->

                    <!-- <span class="boxTitle">My Puzzles</span><br><br>
                    <img src="@/assets/pic_1.jpg" class="collectionImage" :fit="cover"/>
                    <img src="@/assets/pic_2.jpg" class="collectionImage" :fit="cover"/>
                    <img src="@/assets/pic_3.png" class="collectionImage" :fit="cover"/>
                    <Icon class="add"><AddCircle20Regular /></Icon> -->

                
                
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