<!--User Profile Page -->
<!-- Author: Tianyi Hu
Student number: 6774179
Date: 2023/10/20 -->
<script>
    import { ref } from 'vue';
    import { LineHorizontal320Filled,Pill28Filled, ChannelAdd20Regular, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular, Edit20Regular, Camera20Filled } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import { ImagePreview } from '@varlet/ui'
    
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
                    email: 'arthricare@example.com',
                    age: '26',
                    height: '185cm',
                    weight: '70kg',
                },
                puzzle:{
                    url: require("@/assets/puzzleImage/puzzle1_completed.jpg"),
                    title: 'Italian Landscape with Girl Milking a Goat',
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
            },
            previewPuzzle1(){
                ImagePreview(this.puzzle.url)
            },
            previewPuzzle2(){
                ImagePreview("https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg")
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
                <b class="pageTitle">My Profile</b>
                <router-link to="/EditProfile" style="color: white;">
                    <!-- The user can update his/her personal information by click the pen icon at the top-right corner.
                        It also contains Delete Account function.
                    -->
                <Icon class="edit"><Edit20Regular /></Icon>
                </router-link>
            </el-header>
            <el-main class="main">
                <var-sticky>
                    <!-- This first half section shows user's personal information. Username, email, avatar, age, height, and weight. -->
                            <div style="background-color: white;">
                        <div class="avatarWrapper">
                            <!-- FOR TINGTING
                                NEED TO BE CONNECTED TO THE BACKEND
                                AVATAR IMAGE VARIABLE IS IN THE SCRIPT {avatarData}
                                需要连接后端
                                头像图片的变量名为{avatarData}
                            -->
                            <!-- FOR DON
                                User is able to upload avatars by clicking the green round part, and the process can be repeated
                            -->
                            <label class="avatarLabel">
                                <div class="avatar" :style="avatarStyle">
                                    <div v-if="!avatarData" class="plusIcon"><Icon><Camera20Filled /></Icon></div>
                                </div>
                                <input type="file" @change="previewAvatar" style="display: none">
                            </label>
                        </div>
                        <h2 style="margin-top: 5px;">{{ user.name }}</h2>
                        <p>{{ user.email }}</p>
                        <div style="background-color: #CFEEF5; border-radius: 10px; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                        <var-row :gutter="[10,10]" justify="center" style="margin-top: -20px;">
                            <var-col :span="7">
                                <div class="itemValue">{{ user.age }}</div>
                            </var-col>
                            <var-divider vertical="ture" />
                            <var-col :span="7" justify="center">
                                <div class="itemValue">{{ user.height }}</div>
                            </var-col>
                            <var-divider vertical="ture" />
                            <var-col :span="7" justify="flex-end">
                                <div class="itemValue">{{ user.weight }}</div>
                            </var-col>
                        </var-row>
                        <var-row :gutter="[10,8]" justify="center">
                            <var-col :span="7" justify="flex-start">
                                <div class="item">Age</div>
                            </var-col>
                            <var-divider vertical="ture" />
                            <var-col :span="7" justify="center">
                                <div class="item">Height</div>
                            </var-col>
                            <var-divider vertical="ture" />
                            <var-col :span="7" justify="flex-end">
                                <div class="item">Weight</div>
                            </var-col>
                        </var-row>
                        </div>
                        <br>
                        <var-divider description="My Puzzles" style="--divider-text-color: #006973; font-size: larger;" />

                        </div>
            </var-sticky>

                    <!-- The second half section shows all the puzzles that the user has completed.
                        If the picture is clicked it will show in full screen.
                    -->
                    <div style="overflow: hidden; text-align: center;">
                    
                    <span class="puzzleTitle">{{ puzzle.title }}</span>
                    <img :src="puzzle.url" @click="previewPuzzle1" class="puzzleImg"/>
                    <var-divider></var-divider>
                    <span class="puzzleTitle">The Starry Night</span>
                    <img src="https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg" @click="previewPuzzle2" class="puzzleImg"/>
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
        <el-drawer style="background-color: #006973;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">

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