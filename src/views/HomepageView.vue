<!--Home Page-->
<script>
    import { ref, reactive} from 'vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import { HomeRound, MedicationOutlined, AddCircleFilled, CardGiftcardOutlined, AccountCircleOutlined, MoreHorizFilled} from '@vicons/material';
    import { Icon } from '@vicons/utils';
    import HorizontalCalendar from '@/component/calendar.vue';
    import SideBarContent from '@/component/Sidebar.vue';
    import MedicationDialog from '@/component/MedicationDialog.vue';
    import axios from 'axios';

    export default{
        //title
        mounted(){
            document.title = "Home | ArthriCare";

            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");

            var formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);
            // 调用onDateSelected函数，并传递只包含年月日的日期对象
            //this.onDateSelected(dateOnly);
        },
        data(){
            return{
                //用户数据
                user: reactive({
                        name: "",
                        email: "",
                        AvatarUrl: "",
                    }),
                drawer: false,
                imgUrl: '',
                //初始化存放当天需要服用的药物列表
                medicationList: [],
                selectedDate: null,
                dialogVisible: ref(false),
            };
        },
        methods:{
            //Drawer
            beforeDrawerClose(done){
                done();
            },

            //实现homepage选中日期显示药物功能
            //首先，在日历组件中，创建一个事件@date-selected来在选定日期时通知父组件
            //在homepage中，接收@date-selected事件，并在处理函数onDateSelected中获取当天需要服用的药物列表，并按照时间排序
            //将药物列表传递给一个弹窗组件，并在弹窗中展示药物信息和三个按钮
            //弹窗组件中，对每个按钮绑定相应的点击事件，分别处理按时吃药、现在吃药但不按时、和设置什么时候吃了药

            //Calendar (父组件中的处理选定日期的方法)
            async onDateSelected(selectedDate){
                var year = selectedDate.year;
                var month = (selectedDate.month).toLocaleString('en-US', { minimumIntegerDigits: 2 });
                var day = selectedDate.day.toLocaleString('en-US', { minimumIntegerDigits: 2 });

                var formattedDate = `${year}-${month}-${day}`;
                console.log("Selected Date: ", formattedDate);

                //存储选定的日期
                this.selectedDate = formattedDate; 
                //假设medicationList是从后端获取的当天药物数据的数组
                this.medicationList = await this.getMedFromBackend(formattedDate);
                console.log(this.medicationList.length>0);
                //然后从早到晚排序 sorting
                this.medicationList.sort((a, b) => (a.time > b.time ? 1 : -1));

                //testing
                console.log("Medication List for selected date:", this.medicationList);
            },
            

            async getMedFromBackend(selectedDate) {
                try {
                    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
                    if (loggedInUser) {
                        const userId = loggedInUser.id;
                        const data = {
                            userId: userId,
                            chooseDate: selectedDate
                        };

                        const response = await axios.post('http://localhost:8181/medications/findMedicationByUserIdAndDate', data);
                        //const reminderList = JSON.parse(response.data);

                        let reminders = [];
                        let idCounter = 1;

                        response.data.forEach(reminder => {
                            const timeWithoutSeconds = reminder.reminderTime.slice(0, -3);
                            reminders.push({
                                id: idCounter++,
                                name: reminder.medicationName,
                                time: timeWithoutSeconds,
                                date: ""
                                // Add any other properties you want to include from the reminder
                            });
                        });

                        return reminders;
                    } else {
                        throw new Error('User is not logged in.'); // Handle the case when the user is not logged in
                    }
                } catch (error) {
                    console.error('Error:', error);
                    throw error; // Rethrow the error so the caller of this method can handle it if needed
                }
            },

            //Dialog
            onShowMedicationPopup(medication) {
                console.log("Show medication popup:", medication);
                this.dialogVisible = true;
            },
            onTime(){
                console.log("On Time button clicked");
                this.dialogVisible = false;
            },

            notOnTime(){
                console.log("Not On Time button clicked");
                this.dialogVisible = false;
            },

            setReminder(){
                console.log("Set Reminder button clicked");
                this.dialogVisible = false;
            },
        },


        components:{
            UserFilled,
            HomeRound, 
            MedicationOutlined, 
            AddCircleFilled, 
            CardGiftcardOutlined, 
            AccountCircleOutlined,
            MoreHorizFilled,
            Icon,
            HorizontalCalendar,
            SideBarContent,
            MedicationDialog
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
                <HorizontalCalendar @date-selected="onDateSelected" />
                <!-------------------------------------------------MedicationDialog---------------------------------------------->
                <MedicationDialog :medicationList="medicationList"  v-if="medicationList && medicationList.length > 0" @show-medication-popup="onShowMedicationPopup"/>
                <!-- Dialog -->
                <el-dialog  v-model = "dialogVisible" :title="dialogTitle" center align-center width="90%">
                    <template #title>
                        <span style="color: #1890FF; font-weight: bold;">Medication Actions</span>
                    </template>
                    <div style = "text-align: center;">
                        <el-button type="primary" @click="onTime" round>On Time</el-button>
                        <el-button type="primary" @click="notOnTime" round>Now</el-button>
                        <el-button type="primary" @click="setReminder" round>Set Time</el-button>
                    </div>
                </el-dialog>
                <!-------------------------------------------------MedicationDialog---------------------------------------------->
            </el-main>
        </el-container>
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
                </router-link><br>
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
        width: 100vw;
    }
    .footer{
        background-color: white;
        position:fixed;
        bottom:0;
        height: 80px;
        width:100%;
        text-align: center;
        margin-left: 0;
        margin-right: 0;
        white-space: nowrap;
        box-shadow: inset 0 0  5px grey;
        align-items: center;
    }
    /* -------------------------------- Component Layout -------------------------------------------*/

    /* -------------------------------- Footer -----------------------------------------------------*/
    br {
            display: block; /* makes it have a width */
            content: ""; /* clears default height */
            margin-top: 1px; /* change this to whatever height you want it */
}
    .footerBtn{
    font-size: 45px;
    color: gray;
    height: 50px;
    width: 50px;
    padding-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
}
#homeText{
    position: relative;
    color: #1890FF;
    right: 50px;
}
#medText{
    position: relative;
    color: gray;
    right: 35px;
}
#rewardsText{
    position: relative;
    color:gray;
    left: 35px;
}
#profileText{
    position: relative;
    color: gray;
    left: 48px;
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
        left:5%;
        top:1.5%;
        font-size: 30px;
        color: white;
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
    .sidebar{
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #ffffff;
    }
    .uploaded-avatar {
        width: 100%;
        height: 100%;
    }
    .defalut-avatar{
        width: 70%;
        height: 80%;
    }

    /* -------------------------------- Small Screen -----------------------------------------------*/
    @media screen and (max-width: 400px) {
        .content-container{
            overflow-y: auto;
            overflow-x: auto;
        }
    }
    /* -------------------------------- Small Screen ------------------------------------------------*/
</style>