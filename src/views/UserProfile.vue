<!--User Profile Page -->
<script>
    import { ref} from 'vue';
    import { MoreFilled } from '@element-plus/icons';
    import { UserFilled, Edit, CirclePlus, HomeFilled, Calendar, CirclePlusFilled, Sugar, Present, Avatar, CaretRight, Message, MessageBox, Reading, WarningFilled, SwitchButton } from '@element-plus/icons';

    export default{
        mounted() {
                document.title = "User Profile | ArthriCare";
        },
        data(){
            return{
                user:{
                    name: 'Username',
                    level: '69',
                    points: '420'
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
            MoreFilled,
            UserFilled,
            Calendar,
            CirclePlus,
            HomeFilled,
            Message,
            MessageBox,
            Reading,
            WarningFilled,
            Sugar,
            SwitchButton,
            Edit,
            CaretRight,
            Avatar,
            Present,
            CirclePlusFilled
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <el-icon class="more" @click="drawer = true"><MoreFilled></MoreFilled></el-icon>
                <el-icon class="user"><UserFilled></UserFilled></el-icon>
                <b class="pageTitle">My Profile</b>
                <el-icon class="edit"><Edit></Edit></el-icon>
            </el-header>
            <el-main class="main">
                <el-avatar class="avatar" icon="el-icon-user-solid"></el-avatar> 
                <h2>{{ user.name }}</h2>
                <p>Level {{ user.level }} | {{ user.points }} points</p>
                <div class="box">
                    <text class="boxTitle">My Puzzles</text><br><br>
                    <el-icon class="add"><CirclePlus></CirclePlus></el-icon>
                </div>
                <div class="box">
                    <text class="boxTitle">My Friends</text><br><br>
                    <el-icon class="add"><CirclePlus></CirclePlus></el-icon>
                </div>
                <div class="box">
                    <text class="boxTitle">My Posts</text><br><br>
                    <el-icon class="add"><CirclePlus></CirclePlus></el-icon>
                </div>
                <div class="box">
                    <text class="boxTitle">My Meds</text><br><br>
                    <el-icon class="add"><CirclePlus></CirclePlus></el-icon>
                </div>
            </el-main> 
        </el-container>
        <el-footer class="footer">
                <router-link to = "/Home">
                <el-icon class="footerBtn" id="home"><HomeFilled></HomeFilled></el-icon>                    
                </router-link>
                <el-icon class="footerBtn" id="calendar"><Calendar></Calendar></el-icon>
                <router-link to = "/AddMed">
                    <el-icon class="footerBtn" id="addMed"><CirclePlusFilled></CirclePlusFilled></el-icon>
                </router-link>
                <el-icon class="footerBtn" id="medication"><Sugar></Sugar></el-icon>
                <el-icon class="footerBtn" id="rewards"><Present></Present></el-icon>
        </el-footer>
        <el-drawer style="background-color: #1890FF;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
                <div class = "sidebar">
                    <div>
                        <div class = "menu-item">
                                <el-upload action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <el-avatar :size="65">
                                    <img :src="imgUrl" v-if="imgUrl" class="uploaded-avatar" />
                                    <template v-else>
                                        <UserFilled class="defalut-avatar" />
                                    </template>
                                    </el-avatar>
                                </el-upload>                                
                                <div class = "menu-item">
                                    <div class = "menu-button" @click = "goToUserProfile">
                                        <el-icon class="menu-icon"><Avatar/></el-icon>
                                        <p>My Profile</p>
                                        <el-icon class="menu-icon"><CaretRight /></el-icon>
                                    </div>
                                    <div class = "menu-button">
                                        <el-icon class="menu-icon1"><Message /></el-icon>
                                        <p>Message</p>
                                        <el-icon class="menu-icon"><CaretRight /></el-icon>
                                    </div>
                                    <div class = "menu-button">
                                        <el-icon class="menu-icon2"><MessageBox /></el-icon>
                                        <p>Community</p>
                                        <el-icon class="menu-icon"><CaretRight /></el-icon>
                                    </div>
                                    <div class = "menu-button">
                                        <el-icon class="menu-icon1"><Reading /></el-icon>
                                        <p>Education</p>
                                        <el-icon class="menu-icon"><CaretRight /></el-icon>
                                    </div>
                                    <div class = "menu-button3">
                                        <el-icon class="menu-icon3"><WarningFilled /></el-icon>
                                        <p>About</p>
                                    </div>
                                    <div class = "menu-button">
                                        <el-icon class="menu-icon3"><SwitchButton /></el-icon>
                                        <p>Log Out</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </el-drawer>
    </div>
</template>



<style scoped>
    .header{
        display: flex;
        align-items: center;
        color: white;
    }
    .more{
        margin-left: 5px;
        margin-right: 50px;
        font-size: 30px;
    }
    .user{
        margin-left: 10px;
        margin-right: 10px;
        font-size: 30px;
    }
    .edit{
        margin-left: 100px;
        font-size: 30px;
    }
    .pageTitle{
        font-size: 20px;
        white-space: nowrap;
    }
    .container{
        display: grid;
        flex-direction: column;
        place-items: center;
        height: 100vh;
        background-color: #1890FF;
        overflow:hidden;
    }
    .main{
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        height: 100vh;
    }
    h2{
        text-align: center;
        color: white;
    }
    p{
        text-align: center;
        color: white;
    }
    .avatar{
        display: flex;
        align-items: center;
        width: 130px;
        height: 130px;
        margin-left: 115px;
        border: 3px solid white;
        box-shadow: 2px 2px 2px rgb(83, 83, 83);
    }
    .box{
        width: 350px;
        height: 90px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 2px 2px 2px rgb(83, 83, 83);
        margin-left: 5px;
        margin-bottom: 15px;
    }
    .boxTitle{
        padding-left: 15px;
    }
    .add{
        font-size: 40px;
        margin-left: 300px;
        color: #1890FF;
    }
    .image{
        height: 20px;
        width: 40px;
        margin-left: 10px;
        padding-right: 5px;
        padding-left: 5px;
    }
    .footer{
        background-color: white;
        position:fixed;
        bottom:0;
        height: 60px;
        width:100%;
        text-align: center;
    }
    .sidebar{
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 20px;
        }
    #addMed{
        color: #1890FF;
    }
    .footerBtn{
        font-size: 45px;
        color: gray;
        height: 50px;
        width: 50px;
        padding-top: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .uploaded-avatar {
            width: 100%;
            height: 100%;
        }
        .defalut-avatar{
            width: 70%;
            height: 80%;
        }
        .menu-item{
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #ffffff;
        }
        .menu-icon{
            color: #ffffff;
            font-size: 20px;
        }
        .menu-icon1{
            color: #ffffff;
            font-size: 25px;
            margin-right: 15px;
        }
        .menu-icon2{
            color: #ffffff;
            font-size: 25px;
            margin-right: 5px;
        }
        .menu-icon3{
            color: #ffffff;
            font-size: 25px;
            margin-right: 1px;
        }
        .menu-button{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            cursor: pointer;
        }
        .menu-button3{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 130px;
            cursor: pointer;
        }
        .menu-button3 p{
            font-size: 20px;
            font-weight: 550;
            margin: 20px 35px;
        }
        .menu-button p{
            font-size: 20px;
            font-weight: 550;
            margin: 30px 30px;
            text-decoration: none;
        }
</style>