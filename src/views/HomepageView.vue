<!--Home Page-->
<script>
    import { ref} from 'vue';
    import { User, Bell, UserFilled, Avatar, CaretRight, Message, MessageBox, Reading, WarningFilled, SwitchButton, HomeFilled, Calendar, CirclePlusFilled, Sugar, Present} from '@element-plus/icons-vue';
    
    export default{
        mounted() {
            document.title = "Home | ArthriCare";
        },
        data(){
            return{
                username: '',
                drawer: ref(false),
                imgUrl: '',
                dates: [],
                currentDate: new Date(),
                weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            };
        },
        created(){
            this.updateCalendar();
        },
        methods:{
            openDrawer() {
            this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
            handleAvatarSuccess(response, uploadFile){
                this.imgUrl = URL.createObjectURL(uploadFile.raw);
                console.log('handleAvatarSuccess executed');
                console.log('imgUrl:', this.imgUrl);
            },
            beforeAvatarUpload(rawFile){
                if (rawFile.type !== 'image/jpeg') {
                    this.$message.error('Avatar picture must be JPG format!');
                    return false;
                } else if (rawFile.size / 1024 / 1024 > 2) {
                    this.$message.error('Avatar picture size cannot exceed 2MB!');
                    return false;
                }
                return true;
            },
            updateCalendar(){
                const firstDayOfWeek = new Date(this.currentDate);
                    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());

                    this.dates = [];
                    const options = { month: 'short', day: 'numeric'};
                    for (let i = 0; i < 7; i++) {
                        const day = new Date(firstDayOfWeek);
                        day.setDate(day.getDate() + i);
                        this.dates.push(day.toLocaleDateString('en-US',options));
                    }
            },
            prevWeek() {
                    this.currentDate.setDate(this.currentDate.getDate() - 7);
                    this.updateCalendar();
                },
            nextWeek() {
                this.currentDate.setDate(this.currentDate.getDate() + 7);
                this.updateCalendar();
            },
        },
        components:{
        User,
        Bell,
        UserFilled,
        Avatar,
        CaretRight,
        Message,
        MessageBox,
        Reading,
        WarningFilled,
        SwitchButton,
        HomeFilled,
        Calendar,
        CirclePlusFilled,
        Sugar,
        Present
    }
};
</script>

<template>
    <div class = "container">
        <el-container class = "content-container">
            <el-header class = "header">
                <el-icon class="userbtn" @click="drawer = true"><User /></el-icon>
                <span class = "username">Hello, {{ username }}</span>
                <el-icon class = "bellbtn"><Bell /></el-icon>
            </el-header>
            <el-main class = "main">
                <div class = "calendar">
                    <button class = "arrow" @click="prevWeek">&#8249;</button>
                    <div class = "dates-contaniner">
                        <div class = "weekdays">
                            <!-- Weekday headers -->
                            <div v-for="day in weekdays" :key="day" class="date">{{ day }}</div>
                        </div>
                        <div class = "dates">
                            <!-- Dates -->
                            <div v-for="(date, index) in dates" :key="index" class="date">{{ date }}</div>
                        </div>
                    </div>
                    <button class = "arrow" @click = "nextWeek">&#8250;</button>
                </div>
                <div class = "medi-info-container">
                        <div class = "medi-info">
                            <router-link to="/AddMed">
                                <el-button class = "addmedbtn" round>Add a med</el-button>
                            </router-link>
                        </div>
                        
                    </div>
            </el-main>
            <el-footer class = "footer">
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
                                <!--Action是模拟接口，与后端连接时更换-->
                                <el-upload action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <el-avatar :size="65">
                                    <img :src="imgUrl" v-if="imgUrl" class="uploaded-avatar" />
                                    <template v-else>
                                        <UserFilled class="defalut-avatar" />
                                    </template>
                                    </el-avatar>
                                </el-upload>                                
                                <div class = "menu-item">
                                    <div class = "menu-button">
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
        </el-container>
    </div>
</template>

<style scoped>
    .container{
        display: flex;
        justify-content: center;
        height: 100vh;
        background-color: #1890FF;
        overflow: hidden;
    }
    .content-container{
        display: flex;
    }
    .header{
        height: 50px;
    }
    .main{
        background-color: #ffffff;
    }
    .footer{
        background-color: #1890FF;
        position:fixed;
        bottom:0;
        height: 60px;
        width:100%;
        text-align: center;
    }
    .footerBtn{
        font-size: 45px;
        color: #ffffff;
        height: 50px;
        width: 50px;
        padding-top: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }
    #addMed{
        color: #ffffff;
    }
    .userbtn{
        position: absolute;
        left: 20px;
        top: 10px;
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
    }
    .username{
        position: relative;
        top: 15px;
        left: 55px;
        color: #ffffff;
        font-weight: 550;
        font-size: 20px;
    }
    .bellbtn{
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 30px;
        color: #ffffff;
    }
    .sidebar{
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 20px;
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
    }
    .menu-button3{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 130px;
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
    .main{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .calendar{
        display: flex;
        align-items: center;
    }
    .arrow{
        width: 30px;
        height: 30px;
        font-size: 20px;
        color: #ffffff;
        background-color: #1890FF;
        border: 0ch;
        border-radius: 10px;
    }
    .arrow:hover{
        background-color: lightgray;
    }
    .dates-contaniner{
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
    }
    .date{
        padding: 3px;
        margin-right: 10px;
        font-weight: bold;
        color: #1890FF;
    }
    .weekdays{
        display: flex;
    }
    .dates{
        display: flex;
    }
    .weekdays .date{
        margin-right: 8px;
    }
    .dates .date{
        margin-right: -1px;
        margin-left: 6px;
    }
    .date.selected{
        background-color: #f0f0f0;
    }
    .date:hover {
        background-color: lightgray;
        border-radius: 5px;
    }
    .medi-info-container{
        display: flex;
        align-items: center;
    }
    .medi-info {
        margin-top: 20px;
        width: 320px;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        text-align: center;
    }
    .addmedbtn{
        background-color: #1890FF;
        color: #ffffff;
        font-size: 20px;
        font-weight: 800;
        width: 300px;
        height: 40px;
        margin-top: 598px;
    }
</style>