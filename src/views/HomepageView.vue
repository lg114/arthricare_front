<!--Home Page-->
<script>
    import { ref} from 'vue';
    import { User, Bell, UserFilled, Avatar, CaretRight, Message, MessageBox, Reading, WarningFilled, SwitchButton} from '@element-plus/icons-vue';
    
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
                selectedDate: null
            };
        },
        created(){
            this.initDates();
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
            formatDate(date){ 
                if (!(date instanceof Date)) {
                    return '';
                }
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const month = months[date.getMonth()];
                const day = date.getDate();
                return `${month} ${day}`;
            },
            selectDate(date) {
                this.selectedDate = date;
            },
            initDates() {
                const currentDate = new Date();
                const dates = [];
                for (let i = -3; i <= 3; i++) {
                    const newDate = new Date(currentDate);
                    newDate.setDate(currentDate.getDate() + i);
                    dates.push(newDate);
                }
                this.dates = dates;
                this.selectedDate = this.formatDate(currentDate);
            }
        },
        computed:{
            getFullDate(){
                return(date) =>{
                    return date.getDate();
                };
            }
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
        SwitchButton
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
                    <button class = "arrow" @click="scrollDates(-1)">&#8249;</button>
                    <div class = "dates-contaniner">
                        <div class = "date">
                            <div class="weekday">Sun</div>
                            <div class="fulldate">{{ getFullDate(dates[0]) }}</div>
                        </div>
                        <div class = "date">
                            <div class="weekday">Mon</div>
                            <div class = "fulldate">{{ getFullDate(dates[1]) }}</div>
                        </div>
                        <div class = "date">
                            <div class="weekday">Tue</div>
                            <div class = "fulldate">{{ getFullDate(dates[2]) }}</div>
                        </div>
                        <div class = "date">
                            <div class="weekday">Wed</div>
                            <div class = "fulldate">{{ getFullDate(dates[3]) }}</div>
                        </div>
                        <div class = "date">
                            <div class="weekday">Thu</div>
                            <div class = "fulldate">{{ getFullDate(dates[4]) }}</div>
                        </div>
                        <div class = "date">
                            <div class="weekday">Fri</div>
                            <div class = "fulldate">{{ getFullDate(dates[5]) }}</div>
                        </div>
                        <div class = "date">
                            <div class="weekday">Sat</div>
                            <div class = "fulldate">{{ getFullDate(dates[6]) }}</div>
                        </div>
                    </div>
                    <button class = "arrow" @click = "scrollDate(1)">&#8250;</button><br>
                    <div>{{ formatDate(selectedDate) }}</div>
                </div>
                <div class = "medi-info-container">
                        <div class = "medi-info">
                            <p>12321</p>
                        </div>
                        
                    </div>
            </el-main>
            <el-footer class = "footer">
                footer
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
        height: 50px;
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
        overflow-x: auto;
    }
    .date{
        padding: 3px;
        margin-right: 10px;
        font-weight: bold;
        color: #1890FF;
    }
    .date.selected{
        background-color: #f0f0f0;
    }
    .date:hover {
        background-color: lightgray;
    }
    .medi-info-container{
        display: flex;
        align-items: center;
    }
    .medi-info {
        width: 300px;
        padding: 20px;
        background-color: #f0f0f0;
        border-radius: 10px;
        text-align: center;
    }
</style>