<!--Home Page-->
<script>
    import { ref,reactive} from 'vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import { HomeRound, MedicationOutlined, AddCircleFilled, CardGiftcardOutlined, AccountCircleOutlined, MoreHorizFilled} from '@vicons/material';
    import { Icon } from '@vicons/utils';
    import HorizontalCalendar from '@/component/calendar.vue';
    import SideBarContent from '@/component/Sidebar.vue';
    import MedicationDialog from '@/component/MedicationDialog.vue';
    import { mapGetters, mapActions } from 'vuex';


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
        //get user information from store
        computed: {
            ...mapGetters('user', ['loggedInUser'])
        },
        
        methods:{
            //Drawer
            beforeDrawerClose(done){
                done();
            },

            ...mapActions('reminder', ['fetchRemindersFromBackend']),

            //Calendar (父组件中的处理选定日期的方法)
            async onDateSelected(selectedDate){
                //存储选定的日期
                this.selectedDate = selectedDate; 
                //假设medicationList是从后端获取的当天药物数据的数组
                this.medicationList = await this.fetchRemindersFromBackend(selectedDate);
                //然后从早到晚排序 sorting
                if (this.medicationList) {
                    this.medicationList.sort((a, b) => {
                        const timeA = new Date(a.time);
                        const timeB = new Date(b.time);
                        return timeA > timeB ? 1 : -1;
                    });
                }
                //testing
                console.log("Medication List for selected date:", this.medicationList);
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
                <span class = "username">Welcome to ArthiCare, {{ loggedInUser ? loggedInUser.name : 'Guest' }}</span>
                
            </el-header>
            <el-main class = "main">
                <HorizontalCalendar @date-selected="onDateSelected" />
                <!-------------------------------------------------MedicationDialog---------------------------------------------->
                <MedicationDialog :medicationList="medicationList" :selectedMedication="selectedMedication" :takenMedTime="selectedMedication.takenMedTime"  v-if="medicationList && medicationList.length > 0" @show-medication-popup="onShowMedicationPopup"/>
                <!-------------------------------- Dialog -------------------------------->
                <el-dialog  v-model = "dialogVisible" :title="dialogTitle" center align-center width="90%">
                    <template #header>
                        <span v-if = "userLoggedIn" style="color: #1890FF; font-weight: bold;">{{ dialogTitle }}</span>
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
<style src = "@/css/homepage.css" scoped></style>