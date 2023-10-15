<script>
    import { Avatar, CaretRight, Message, MessageBox, Reading, WarningFilled, SwitchButton } from '@element-plus/icons-vue';
   // import router from '@/router';

    export default {
        name: "SidebarContent",
        props: {
            imgUrl: String,
        },
        data() {
            return {
                drawer: false,
            };
        },
        methods: {
            goToUserProfile(){
                console.log("Logout button clicked");
                this.$router.push('/UserProfile');
            },
            goToMessage(){
                this.$router.push('/Message')
            },
            goToEducation(){
                this.$router.push('/Education')
            },
            goToAssessment(){
                this.$router.push('/Assessment')
            },
            async logout(){
                this.$store.dispatch('user/logout');
            }

        },
        components: {
            Avatar,
            CaretRight,
            Message,
            MessageBox,
            Reading,
            WarningFilled,
            SwitchButton,
        },
    };
</script>
<template>
        <div class = "sidebar">
            <div>
                <div class = "menu-item">
                             
                    <div class = "menu-item">
                        <div class = "menu-button" @click = "goToUserProfile">
                            <el-icon class="menu-icon"><Avatar/></el-icon>
                            <p>My Profile</p>
                            <el-icon class="menu-icon"><CaretRight /></el-icon>
                        </div>
                        <div class = "menu-button" @click = "goToMessage">
                            <el-icon class="menu-icon1"><Message /></el-icon>
                            <p>Message</p>
                            <el-icon class="menu-icon"><CaretRight /></el-icon>
                        </div>
                        <div class = "menu-button" @click = "goToEducation">
                            <el-icon class="menu-icon1"><Reading /></el-icon>
                            <p>Education</p>
                            <el-icon class="menu-icon"><CaretRight /></el-icon>
                        </div>
                        <div class = "menu-button" @click = "goToAssessment">
                            <el-icon class="menu-icon2"><MessageBox /></el-icon>
                            <p>Assessment</p>
                            <el-icon class="menu-icon"><CaretRight /></el-icon>
                        </div>
                        <div class = "menu-button3">
                            <el-icon class="menu-icon3"><WarningFilled /></el-icon>
                            <p>About</p>
                        </div>
                        <div class = "menu-button" @click = "logout">
                            <el-icon class="menu-icon3"><SwitchButton /></el-icon>
                            <p>Log Out</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
    /* -------------------------------- Side Bar ----------------------------------------------------*/
    .sidebar{
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 20px;
    }
    .divider-example-vertical-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
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
    }
    /* -------------------------------- Side Bar ----------------------------------------------------*/


</style>