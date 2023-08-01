<!--Home Page-->
<script>
    import { reactive, ref} from 'vue';
    import { UserFilled, Avatar, CaretRight, Message, MessageBox, Reading, WarningFilled, SwitchButton, } from '@element-plus/icons-vue';
    import { HomeRound, MedicationOutlined, AddCircleFilled, CardGiftcardOutlined, AccountCircleOutlined, MoreHorizFilled} from '@vicons/material';
    import { Icon } from '@vicons/utils'

    export default{
        //title
        mounted() {
            document.title = "Home | ArthriCare";
        },
        data(){
            return{
                user: reactive({
                        name: "",
                        email: "",
                        AvatarUrl: "",
                    }),
                drawer: ref(false),
                dates: [],
                year: 0,
                currentDate: new Date(),
                weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                medication: ''
            };
        },
        created(){
            this.updateCalendar();
        },
        methods:{
            //Drawer
            openDrawer(){
            this.drawer = true;
            },
            beforeDrawerClose(done){
                done();
            },
            //Avatar

            //Calendar
            updateCalendar(){
                const firstDayOfWeek = new Date(this.currentDate);
                const currentDayOfWeek = firstDayOfWeek.getDay(); // 获取当前日期的星期几
                    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDayOfWeek); 
                    this.dates = [];


                    const options = { month: 'short', day: 'numeric'};
                    for (let i = 0; i < 7; i++) {
                        const day = new Date(firstDayOfWeek);
                        day.setDate(day.getDate() + i);
                        this.dates.push(day.toLocaleDateString('en-US',options));
                    }
                    this.year = firstDayOfWeek.getFullYear();
                    console.log(this.year);
            },
            //Calendar
            prevWeek(){
                    this.currentDate.setDate(this.currentDate.getDate() - 7);
                    this.updateCalendar();
            },
            //Calendar
            nextWeek(){
                this.currentDate.setDate(this.currentDate.getDate() + 7);
                this.updateCalendar();
            },
            //Router
            goToUserProfile(){
                this.$router.push('/UserProfile');
            },
            //Handle the date click event to obtain the year, month, and day information of the selected date
            onDateClick(selectedDate) {
                //Create a new date object and convert the string of the selected date into a date object
                const selectedDay = new Date(selectedDate);

                // Format the selected date using the same options used in updateCalendar()
                const options = { month: 'short', day: 'numeric' };
                const formattedDate = selectedDay.toLocaleDateString('en-US', options);

                //Get the year, month, and day information of the selected date
                const year = selectedDay.getFullYear();
                const month = selectedDay.getMonth() + 1; //Months are counted from 0, so add 1
                const day = selectedDay.getDate();

                //testing
                console.log(`Selected Date: Year: ${year}, Month: ${month}, Day: ${day}`);
                console.log(`Formatted Date: ${formattedDate}`);
            },

        },
        components:{
            UserFilled,
            Avatar,
            CaretRight,
            Message,
            MessageBox,
            Reading,
            WarningFilled,
            SwitchButton,
            HomeRound, 
            MedicationOutlined, 
            AddCircleFilled, 
            CardGiftcardOutlined, 
            AccountCircleOutlined,
            MoreHorizFilled,
            Icon,
    }
};
</script>

<template>
    <div class = "container">
        <el-container class = "content-container">
            <el-header class = "header">
                <Icon class="more" @click="drawer = true"><MoreHorizFilled /></Icon>
                <span class = "username">Hello, {{ name }}</span>
            </el-header>
            <el-main class = "main">
                <div class = "calendar">
                    <button class = "arrow" @click="prevWeek">&#8249;</button>
                    <div class = "dates-contaniner">
                        <div class = "weekdays">
                            <!-- Weekday headers -->
                            <div v-for="day in weekdays" :key="day" class="day">{{ day }}</div>
                        </div>
                        <div class = "dates">
                            <!-- Dates -->
                            <div v-for="(date, index) in dates" :key="index" class="date" @click = "onDateClick(date)">{{ date }}</div>
                        </div>
                    </div>
                    <button class = "arrow" @click = "nextWeek">&#8250;</button>
                </div>
                <div class = "medi-info-container">
                        <div class = "medi-info">
                            <!--加"no meds on today""-->
                            <div v-if = "medication">{{ medication }}</div>
                            <div v-else>No Meds on Today</div>
                        </div>
                </div>
            </el-main>
            <el-footer class="footer">
                
                <Icon class="footerBtn" id="home"><HomeRound /></Icon>                  
                <router-link to = "/MyMeds">
                <Icon class="footerBtn" id="medication"><MedicationOutlined /></Icon>
                </router-link>
                <router-link to = "/AddMed">
                    <Icon class="footerBtn" id="addMed"><AddCircleFilled /></Icon>
                </router-link>
                <router-link to = "/Rewards">
                <Icon class="footerBtn" id="rewards"><CardGiftcardOutlined /></Icon>
                </router-link>
                <router-link to = "/UserProfile">
                <Icon class="footerBtn" id="profile"><AccountCircleOutlined /></Icon>
                </router-link>
        </el-footer>
            <el-drawer style="background-color: #1890FF;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
                <div class = "sidebar">
                    <div>
                        <div class = "menu-item">
                                <!--Action是模拟接口，与后端连接时更换-->
                                <el-upload action="" :show-file-list="false">
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
        </el-container>
    </div>
</template>



<!-- the following is all css-->
<style scoped>
    /* -------------------------------- Base Layout -----------------------------------------------*/
    .container{
        display: grid;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
        background-color: #1890FF;
    }
    .content-container{
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: auto;
    }
    /* -------------------------------- Base Layout -----------------------------------------------*/

    /* -------------------------------- Component Layout ------------------------------------------*/
    .header{
        height: 50px;
    }
    .main{
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        padding-bottom: 50px;
    }
    .footer{
    background-color: white;
    position:fixed;
    bottom:0;
    height: 60px;
    width:100%;
    text-align: center;
    margin-left: 0;
    margin-right: 0;
    white-space: nowrap;
    box-shadow: inset 0 0 5px grey;
}
    /* -------------------------------- Component Layout -------------------------------------------*/

    /* -------------------------------- Footer -----------------------------------------------------*/
    .footerBtn{
    font-size: 45px;
    color: gray;
    height: 50px;
    width: 50px;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
    #addMed{
        color: #1890FF;
    }
    
    #home{
        color: #1890FF;
    }
    /* -------------------------------- Footer -----------------------------------------------------*/

    /* -------------------------------- Header -----------------------------------------------------*/
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
    .more{
    position: absolute;
    left:20px;
    top:10px;
    font-size: 30px;
    color: white;
}
    /* -------------------------------- Header ------------------------------------------------------*/

    /* -------------------------------- Side Bar ----------------------------------------------------*/
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

    /* -------------------------------- Top Calendar ------------------------------------------------*/
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
    .day{
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
    /* -------------------------------- Top Calendar ------------------------------------------------*/

    /* -------------------------------- Medication Display Container --------------------------------*/
    .medi-info-container{
        display: flex;
        align-items: center;
    }
    .medi-info {
        margin-top: 10px;
        width: 320px;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        text-align: center;
        color:#1890FF;
        font-weight: 800;
    }
    /* -------------------------------- Medication Display Container --------------------------------*/

    /* -------------------------------- Add Med Button ----------------------------------------------*/
    .addmedbtn{
        background-color: #1890FF;
        color: #ffffff;
        font-size: 20px;
        font-weight: 800;
        width: 300px;
        height: 40px;
    }
    /* -------------------------------- Add Med Button ----------------------------------------------*/

    /* -------------------------------- Small Screen -----------------------------------------------*/
    @media screen and (max-width: 400px) {
        .content-container{
            overflow-y: auto;
            overflow-x: auto;
        }
        .arrow{
            width: 25px;
            height: 25px;
        }
        .dates .date{
            margin-right: -2px;
            margin-left: 2px;
            padding: 5px;
        }
    }
    /* -------------------------------- Small Screen ------------------------------------------------*/
</style>