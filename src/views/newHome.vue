<script>
    import { ref } from 'vue';
    import { AlignLeft, AlertCircle, Logout } from '@vicons/tabler';
    import { UserProfileAlt} from '@vicons/carbon';
    import { CastForEducationFilled } from '@vicons/material';
    import { Icon } from '@vicons/utils';
    import HorizontalCalendar from '@/component/calendar.vue';
    import { mapGetters, mapActions } from 'vuex';
    
    export default{
        mounted(){
            //title
            document.title = "Home | ArthriCare";
            //默认当天日期
            const today = new Date(); 
            this.onDateSelected(today);
        },
        data(){
            return{
                drawer: ref(false),
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
            }
        },
        methods:{
            ...mapActions('reminder', ['fetchRemindersFromBackend']),

            // side bar goes to profile page
            goToUserProfile(){
                this.$router.push('/UserProfile');
            },
            // side bar log out
            async logout(){
                this.$store.dispatch('user/logout');
            },

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
        computed: {
            ...mapGetters('user', ['loggedInUser'])
        },
        components:{
            Icon,
            AlignLeft,
            Logout,
            AlertCircle,
            UserProfileAlt,
            CastForEducationFilled,
            HorizontalCalendar,
        }
    }
</script>
<template>
    <el-container class = "container">
        <el-header class = "header">
            <Icon class="header-icon" @click="drawer = true"><AlignLeft /></Icon>
            <span class = "username">Welcome to ArthriCare, User</span>
            <var-icon class = "header-icon2" name="message-text-outline" />
        </el-header>    
        <el-main class = "main">
            <HorizontalCalendar @date-selected="onDateSelected" />
            <!-------------------------------------------------MedicationDialog---------------------------------------------->
            <template v-if = "medicationList && medicationList.length > 0">
                <MedicationDialog :medicationList="medicationList" :selectedMedication="selectedMedication" :takenMedTime="selectedMedication.takenMedTime"  v-if="medicationList && medicationList.length > 0" @show-medication-popup="onShowMedicationPopup"/>
            </template>
            <template v-else>
                <div style = "text-align: center; padding: 20px; color:#1890FF; font-size: larger;">
                    <p><b>No meds on today...</b></p>
                </div>
            </template>     
            <!-------------------------------- Single Medication Dialog -------------------------------->
            <el-dialog  v-model = "dialogVisible" :title="dialogTitle" center align-center width="90%" round>
                <template #header>
                    <span style="color: #1890FF; font-weight: bold; font-size: larger;">{{ dialogTitle }}</span>
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
                    <span style="color: #1890FF; font-weight: bold; font-size: larger;">{{ dialogTitle }}</span>
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



    <!-- Side barDrawer -->
    <el-drawer v-model="drawer" direction="ltr" size="70%" :show-close="false" style = " background-color: #006973;">
        <template #header>
            <div class = "topping">
                <var-avatar :size = "100" bordered bordered-color="#FFFFFF" lazy error = "https://img.icons8.com/fluency-systems-regular/48/user--v1.png"/>
            </div>
        </template>
        <div class = "middle">
            <div class = "icon-text-container" @click = "goToUserProfile">
                <div class="icon-container">
                    <Icon><UserProfileAlt/></Icon>
                </div>
                <p>My profile</p>
            </div>
            <div class = "icon-text-container">
                <div class="icon-container">
                    <Icon><CastForEducationFilled/></Icon>
                </div>
                <p>Education</p>
            </div>
        </div>
        <template #footer>
            <div class = "bottom">
                <div class = "icon-text-container">
                    <div class="icon-container">
                        <Icon><AlertCircle/></Icon>
                    </div>
                    <p>About</p>
                </div>
                <div class = "icon-text-container" @click = "logout">
                    <div class="icon-container">
                        <Icon><Logout/></Icon>
                    </div>
                    <p>Log out</p>
                </div>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped>
    .container{
        background-color: #CFEEF5;
        height: 100%;
        
    }
    .header{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #006973;
        color: #FFFFFF;
    }
    .header-icon{
        font-size: 20px;
        position: absolute;
        left: 5%;
        font-weight: bold;
    }
    .header-icon2{
        position: absolute;
        right: 5%;
    }
    .username{
        font-weight: bold;
    }
    .useravatar{
        position: absolute;
        right: 5%;
        top: 25%;
        align-items: center;
    }
    .main{
        --el-main-padding: 0;
        background-color: #ffffff;  /* for the arrow's color of the calendar */
    }
    @media screen and (min-width: 380px){
        .header{

        }
    }
  @media screen and (min-width: 768px){
        .header{
            height: 10vh;
        }
        .username{
            font-size: 25px;
        }
   }



   .topping{
        color:#FFFFFF;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
   }
   .var-avatar{
        position: relative;
        top: 5vh;
   }
   .middle{
        color:#FFFFFF;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        margin-top: 50px;
   }
   .middle p{
        margin-bottom: 20px;
        text-align: center;
   }
   .icon-container {
        display: inline-block;
        margin-right: 50px; 
    }
    .icon-text-container {
        display: flex;
        align-items: center;
        padding-inline: 5px;
        justify-content: center;
    }

   .bottom{
        color:#FFFFFF;
        font-weight: bold;
        display: flex;
        flex-direction: column;
   }
   .bottom p {
        margin-bottom: 20px;
   }
</style>