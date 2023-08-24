<!--Home Page-->
<script>
    import { ref,reactive} from 'vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import { LineHorizontal320Filled, Add20Filled, Home20Filled, BriefcaseMedical20Regular, Gift20Regular, Person20Regular } from '@vicons/fluent'
    import { Icon } from '@vicons/utils';
    import HorizontalCalendar from '@/component/calendar.vue';
    import SideBarContent from '@/component/Sidebar.vue';
    import MedicationDialog from '@/component/MedicationDialog.vue';
    import { mapGetters, mapActions } from 'vuex';


    export default{
        mounted(){
            //title
            document.title = "Home | ArthriCare";
            //默认当天日期
            const today = new Date(); 
            this.onDateSelected(today);
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                const value = sessionStorage.getItem(key);
                console.log(`Key: ${key}, Value: ${value}`);
                }
                console.log("checked session here");

        },
        setup(){
            const active = ref(0);
            return {active};
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
                console.log('Selected date:', selectedDate);
                //假设medicationList是从后端获取的当天药物数据的数组
                this.medicationList = await this.fetchRemindersFromBackend(selectedDate);
                //然后从早到晚排序 sorting
                if (this.medicationList) {
                    this.medicationList.sort((a, b) => {
                        const timeA = new Date(a.time);
                        const timeB = new Date(b.time);
                        return timeA > timeB;
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
            LineHorizontal320Filled, 
            Home20Filled, 
            BriefcaseMedical20Regular, 
            Gift20Regular, 
            Person20Regular,
            Add20Filled,
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
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
                <span class = "username">Welcome to ArthriCare, {{ loggedInUser ? loggedInUser.name : 'Guest' }}</span>
            </el-header>
            <el-main class = "main">
                <HorizontalCalendar @date-selected="onDateSelected" />
                <!-------------------------------------------------MedicationDialog---------------------------------------------->
                <template v-if = "medicationList && medicationList.length > 0">
                    <MedicationDialog :medicationList="medicationList" :selectedMedication="selectedMedication" :takenMedTime="selectedMedication.takenMedTime"  v-if="medicationList && medicationList.length > 0" @show-medication-popup="onShowMedicationPopup"/>
                </template>
                <template v-else>
                    <div style = "text-align: center; padding: 20px; color:#006973; font-size: larger;">
                        <p><b>No meds on today...</b></p>
                    </div>
                </template>
                <!-------------------------------- Dialog -------------------------------->
                <el-dialog  v-model = "dialogVisible" :title="dialogTitle" center align-center width="90%" round>
                    <template #header>
                        <span style="color: #006973; font-weight: bold; font-size: larger;">{{ dialogTitle }}</span>
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
                        <span style="color: #006973; font-weight: bold; font-size: larger;">{{ dialogTitle }}</span>
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
        <var-bottom-navigation
            class="footer"
            v-model:active="active"
            border="true"
            safe-area="true"
            :fab-props="{color:'#55BDCA'}"
        >
            <var-link href="/#/Home" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="homeButton">
                <Icon  style="font-size: 38px;"><Home20Filled /></Icon><br>
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
            <var-link href="/#/UserProfile" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><Person20Regular /></Icon><br>
                <span>Profile</span>
            </var-bottom-navigation-item>    
            </var-link>
            <template #fab >
                <var-link href="/#/AddMed" style="color: white;">
                <Icon class="addButton"><Add20Filled /></Icon>
                </var-link>
            </template>
        </var-bottom-navigation>
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

<!-- the following is all css-->
<style src = "@/css/homepage.css" scoped></style>