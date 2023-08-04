<!--Home Page-->
<script>
    import { ref,reactive} from 'vue';
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
            //默认当天日期
            const today = new Date(); 
            this.onDateSelected(today);
        },
        data(){
            return{
                //用户数据
                user: reactive({
                        name: "",
                        email: "",
                        AvatarUrl: "",
                    }),
                //sidebar
                drawer: false,
                //初始化存放当天需要服用的药物列表
                medicationList: [],
                //初始化选中日期
                selectedDate: null,
                //药物弹窗
                dialogVisible: ref(false),
                dialogTitle:'',
                //popup dialog
                takenMedTime: null,
                medicationTime: null, //Timepicker中用户设置的将会吃药的时间
                selectedMedication: {}, //存储用户当前选择的药物
                showTimePicker: false, //timepicker
            };
        },
        methods:{
            //Drawer
            beforeDrawerClose(done){
                done();
            },

            //Calendar (父组件中的处理选定日期的方法)
            async onDateSelected(selectedDate){

                //存储选定的日期
                this.selectedDate = selectedDate; 
                //假设medicationList是从后端获取的当天药物数据的数组
                this.medicationList = await this.getMedFromBackend(selectedDate);
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
////////////////////////////////////////////////////////////////////////////////
                        this.user.name = response.name;
                        console.log (this.user.name);
///////////////////////////////////////////////////////////////////////////////////
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
                //构建弹窗标题，显示药物的名称和时间
                this.dialogTitle = `${medication.name} - ${medication.time}`;
                //将药物信息传递给弹窗组件
                this.selectedMedication = medication ;
                this.dialogVisible = true;
            },

            //on time button
            onTime(){
                if (!this.selectedMedication){
                    // 如果没有选定药物对象，则无法执行按时服药的操作
                    return;
                }
                console.log("On Time button clicked");
                console.log("Medication Object:", this.selectedMedication);
                
                // TODO: 在这里执行按时服药的逻辑，例如更新药物的状态和时间
                this.selectedMedication.takenMedTime = this.selectedMedication.time;
                console.log("Medication has been taken in ", this.selectedMedication.takenMedTime);
                this.dialogVisible = false;
            },
            //Now button
            nowTime(){
                if (!this.selectedMedication){
                    // 如果没有选定药物对象，则无法执行按时服药的操作
                    return;
                }
                console.log("Now Time button clicked");
                console.log("Medication Object:", this.selectedMedication);
                
                // TODO: 在这里执行不按时服药的逻辑，例如更新药物的状态和时间
                const currentTime = new Date();
                const currentHour = currentTime.getHours();
                const currentMinute = currentTime.getMinutes();
                const formattedTime = `${currentHour}:${currentMinute}`;

                this.selectedMedication.takenMedTime = formattedTime;
                console.log("Medication has been taken in ", this.selectedMedication.takenMedTime);
                this.dialogVisible = false;
            },
            //set time button
            setTime(medication){
                if (!this.selectedMedication){
                    // 如果没有选定药物对象，则无法执行按时服药的操作
                    return;
                }
                console.log("Set Reminder button clicked");
                console.log("Medication:", medication);
                // 设置弹窗标题，显示药物的名称
                this.dialogTitle = this.selectedMedication.name;
                // 打开弹窗，显示时间选择器
                this.showTimePicker = true;
            },

            //选择timepicker
            onTimePickerConfirm() {
                console.log("Selected time:", this.medicationTime);

                const currentHour = this.medicationTime.getHours();
                const currentMinute = this.medicationTime.getMinutes();
                const formattedTime = `${currentHour}:${currentMinute}`;

                //将时间保存到药物对象中
                this.selectedMedication.takenMedTime = formattedTime;
                console.log("Medication has been taken in ", this.selectedMedication.takenMedTime);
                this.showTimePicker = false;
                this.dialogVisible = false;
            },
            //取消选择timepicker
            onTimePickerCancel() {
                // 用户取消选择时间，关闭MessageBox
                this.showTimePicker = false;
                this.dialogVisible = false;
            },
            //关闭timePicker
            onTimePickerClose() {
                // MessageBox关闭时，重置时间选择器并关闭MessageBox
                this.medicationTime = null;
                this.showTimePicker = false;
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
                <span class = "username">Welcome to ArthiCare {{ this.user.name }}</span>
                
            </el-header>
            <el-main class = "main">
                <HorizontalCalendar @date-selected="onDateSelected" />
                <!-------------------------------------------------MedicationDialog---------------------------------------------->
                <MedicationDialog :medicationList="medicationList" :selectedMedication="selectedMedication" :takenMedTime="selectedMedication.takenMedTime"  v-if="medicationList && medicationList.length > 0" @show-medication-popup="onShowMedicationPopup"/>
                <!-------------------------------- Dialog -------------------------------->
                <el-dialog  v-model = "dialogVisible" :title="dialogTitle" center align-center width="90%">
                    <template #header>
                        <span style="color: #1890FF; font-weight: bold;">{{ dialogTitle }}</span>
                    </template>
                    <div style = "text-align: center;">
                        <el-button type="primary" @click="onTime(medication)" round>On Time</el-button>
                        <el-button type="primary" @click="nowTime(medication)" round>Now</el-button>
                        <el-button type="primary" @click="setTime(selectedMedication)" round>Set Time</el-button>
                    </div>
                </el-dialog>
                <!------------------------ Dialog for medication time picker ----------------->
                <el-dialog v-model="showTimePicker" title="Set Time" @close="onTimePickerClose" center align-center width="90%">
                    <template #header>
                        <span style="color: #1890FF; font-weight: bold;">{{ dialogTitle }}</span>
                    </template>
                    <div style = "text-align: center;">
                        <el-time-picker  v-if="showTimePicker" v-model="medicationTime" placeholder="Select time" format="HH:mm"></el-time-picker>                        
                    </div>
                    <template v-slot:footer>
                        <el-button @click="onTimePickerCancel" round>Cancel</el-button>
                        <el-button type="primary" @click="onTimePickerConfirm" round>Confirm</el-button>
                    </template>
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