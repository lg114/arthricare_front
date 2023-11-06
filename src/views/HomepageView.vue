<!--Home Page-->
<!--
    Author: Lin Gan
    Student number: 6502933
    Date: 2023/10/20  
    Description: 
    In the script section, necessary Vue components and libraries are imported, and various variables and methods are defined.
    These include methods for handling user-selected dates, formatting time, displaying medication details, etc.
    In the template section, the layout structure of the page is defined, including the top navigation bar, the calendar component,
    the medication reminder list, the discussion component, etc.
    It also includes a dialog for displaying medication details and another dialog for selecting a specific time.
    Finally, at the bottom of the page, there is a bottom navigation bar with several navigation buttons for redirecting to other pages. 
    There is also a floating action button for performing addition operations.
-->
<script>
    import { ref } from 'vue';
    import { Home20Filled, PeopleCommunity20Regular, LineHorizontal320Filled, BriefcaseMedical20Regular, Gift20Regular, Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent';
    import { Icon } from '@vicons/utils';
    import HorizontalCalendar from '@/component/calendar.vue';
    import Discussion from '@/component/post.vue';
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import SidebarContent from '@/component/Sidebar.vue';
    import axios from 'axios';
    export default{
        mounted(){
            //title
            document.title = "Home | ArthriCare";
            //默认当天日期
            const today = new Date(); 
            this.onDateSelected(today);
            this.fetchLoginStatueFromBackend();
            this.initializeTakeMedNum();
        },
        data(){
            return{
                drawer: ref(false),
                //初始化存放当天需要服用的药物列表
                medicationList: [],
                //初始化选中日期
                dialog: ref(false),
                timeDialog: ref(false),
                now: ref(false),
                setTime: ref(false),
                setTimeSelected: null,
            }
        },
        methods:{
            ...mapMutations('reminder', ['SET_SELECTED_DATE']),
            ...mapMutations('task',['setTakeMedNum','setAlreadyTakeMedNum','setPuzzleNum']),
            ...mapActions('reminder', ['fetchRemindersFromBackend']),

            showTakeMedTaskDialog(){
                this.$refs.TaskDialogRef.showTakeMedTaskDialog();
            },

            fetchTakeMedStatueFromBackend(reminderId){
                axios.get('http://localhost:8181/reminders/findReminderByReminderId/' + reminderId)
                        .then(response => {
                            console.log(response.data);
                           if(!response.data.alreadyTakeMedication){
                                this.showTakeMedTaskDialog();
                           }
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });

            },


            fetchLoginStatueFromBackend()
            {
                axios.get('http://localhost:8181/rewards/checkLoginRewardStatue/' + this.loggedInUser.userId)
                        .then(response => {
                            if(response.data)
                            {
                                this.showTaskDialog(1,response.data.puzzleNum);
                                this.completeLoginTask();
                            }
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });
            },

            completeLoginTask() {
                // Claim login reward by making a PUT request to the backend using axios
                axios.put('http://localhost:8181/rewards/claimLoginReward/' + this.loggedInUser.userId)
                    .then(response => {
                    if (response.status === 200) {
                        // The reward was successfully claimed
                        // You can perform additional actions here if needed
                        console.log('Reward claimed successfully');
                    } else {
                        throw new Error('Failed to claim reward.');
                    }
                    })
                    .catch(error => {
                    console.log('Error claiming reward:', error);
                    });
            },

            showTaskDialog(taskId,puzzleNum)
            {
                this.$refs.TaskDialogRef.showTaskDialog(taskId,puzzleNum);
            },

            // side bar goes to profile page
            goToUserProfile(){
                this.$router.push('/UserProfile');
            },
            gotoMsg(){
                this.$router.push('/Message');
            // side bar log out
            },
            async logout(){
                this.$store.dispatch('user/logout');
            },

            async initializeTakeMedNum(){

                axios.get('http://localhost:8181/rewards/getPuzzleNumByUserId/' + this.loggedInUser.userId)
                        .then(response => {
                            this.setPuzzleNum(response.data);
                            console.log("initialize data")
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });


                const medicationListFromBack = await this.fetchRemindersFromBackend(new Date());
                this.setTakeMedNum(medicationListFromBack.length); 
                let alreadyTakeMedNum = 0;
                for(const item of  medicationListFromBack){
                    if(item.alreadyTakeMedication){
                        alreadyTakeMedNum++;
                    }
                }
                console.log("alreadyTakeMedNum"+alreadyTakeMedNum)
                this.setAlreadyTakeMedNum(alreadyTakeMedNum);
            },

            //Calendar (父组件中的处理选定日期的方法)
            async onDateSelected(selectedDate){
                //存储选定的日期
                this.selectedDate = selectedDate; 
                this.SET_SELECTED_DATE(selectedDate);
                console.log('Selected date:', selectedDate);
                //假设medicationList是从后端获取的当天药物数据的数组
                const medicationListFromBack = await this.fetchRemindersFromBackend(selectedDate);

                //然后从早到晚排序 sorting
                medicationListFromBack.sort((a, b) => {
                    const timeA = a.time.split(":").map(Number);
                    const timeB = b.time.split(":").map(Number);

                    if (timeA[0] !== timeB[0]) {
                        return timeA[0] - timeB[0];
                    }

                    return timeA[1] - timeB[1];
                });

                this.medicationList.splice(0, this.medicationList.length);

                for (let item of medicationListFromBack) {
                    this.medicationList.push(item);
                }
                
                //testing
                console.log("Medication List for selected date:", this.medicationList);
            },
            formatTakeMedTime(takeMedTime) {
                const takemedTimeString = String(takeMedTime);
                if (!takemedTimeString) {
                    return "No takemedtime available.";
                }

                const takeMedTimeArray = takemedTimeString.split(',').map(Number); // 将字符串分割并转换为数字数组

                const [year, month, day, hour, minute] = takeMedTimeArray;

                // 使用 padStart() 来补零
                const formattedHour = String(hour).padStart(2, '0');
                const formattedMinute = String(minute).padStart(2, '0');

                const formattedTime = `${day}/${month}/${year} ${formattedHour}:${formattedMinute}`; // 格式化为字符串

                return `Take med time: ${formattedTime}`;
            },
            showMedicationDetails(medication) {
                this.selectedMedication = medication;
                this.$store.commit('reminder/SET_SELECTED_MEDICATION', this.selectedMedication);
                this.dialog = true;
            },
            handleNow(reminderId) {
                this.fetchTakeMedStatueFromBackend(reminderId);
                console.log('Now button clicked');
                const currentTime = new Date();
                const isoTime = currentTime.toISOString();
                this.$store.dispatch('reminder/takeMedication', { date: isoTime })
                    .then(() => {
                        this.dialog = false;
                        this.selectedMedication.alreadyTakeMedication = true;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            },
            handleOnTime(reminderId) {
                this.fetchTakeMedStatueFromBackend(reminderId);
                console.log('On Time button clicked');

                const selectedDate = new Date(this.selectedDate);
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth() + 1;
                const day = selectedDate.getDate();

                const remindertime = this.selectedMedication.time;
                const [hour, minute] = remindertime.split(":").map(Number);

                const combinedDateTime = new Date(year, month - 1, day, hour, minute);

                const isoTime = combinedDateTime.toISOString();

                this.$store.dispatch('reminder/takeMedication', { date: isoTime })
                    .then(() => {
                        this.dialog = false;
                        this.selectedMedication.alreadyTakeMedication = true;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            },
            openTimeDialog(){
                this.timeDialog = true;
            },
            handleSetTime(reminderId) {
                this.fetchTakeMedStatueFromBackend(reminderId);
                console.log('Set Time button clicked');
                
                const date = this.setTimeSelected;
                const isoTime = date.toISOString();

                this.$store.dispatch('reminder/takeMedication', { date: isoTime })
                    .then(() => {
                        this.timeDialog = false;
                        this.dialog = false;
                        this.selectedMedication.alreadyTakeMedication = true;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        },
        computed: {
            ...mapGetters('user', ['loggedInUser']),
            selectedDate(){
                return this.$store.state.reminder.selectedDate;
            },
            formattedDate(){
                const date = new Date(this.selectedDate);
                const options = { month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                return formattedDate;
            }
        },
        components:{
            Icon,
            LineHorizontal320Filled,
            BriefcaseMedical20Regular, 
            Gift20Regular, 
            HorizontalCalendar,
            Discussion,
            ChannelAdd20Regular,
            Pill28Filled,
            Home20Filled, PeopleCommunity20Regular,
            SidebarContent,
        }
    }
</script>
<template>
    <TaskDialog ref="TaskDialogRef"/>
    <el-container class = "container">
        <el-header class = "header">
            <Icon class="header-icon" @click="drawer = true"><LineHorizontal320Filled /></Icon>
            <var-ellipsis style="max-width: 270px" :tooltip="false">            
                <span class = "username">Welcome to ArthriCare, {{ loggedInUser && loggedInUser.name ? loggedInUser.name : 'Guest' }}</span>
            </var-ellipsis>
            <var-icon class = "header-icon2" name="message-text-outline" @click="gotoMsg"/>
        </el-header>    
        <el-main class = "main">
            <div class = "calendar">
                <HorizontalCalendar @date-selected="onDateSelected" />
            </div>

            <!--<button @click="showTakeMedTaskDialog(1,0)">show task</button>-->

            <el-scrollbar max-height="30vh" always >
                <template v-if = "medicationList && medicationList.length > 0">
                <div :class="['divider', {'last-medication': index === medicationList.length - 1}]" v-for = "(medication, index) in medicationList" :key = "medication.id"
                v-motion="`item-${medication.id}`"
                :initial="{ opacity: 0, x: 100 }"
                :enter="{ opacity: 1, x: 0 }"
                :leave="{ opacity: 0, x: -250 }">
                    <span style = "width: 30vw; color: #006973; font-weight: bold;">{{ medication.time }}</span>
                    <var-divider vertical/>
                    <var-chip size="large"  @click = "showMedicationDetails(medication)">
                        <var-ellipsis style="max-width: 98vw" :tooltip="false"><h4>{{ medication.name }}</h4></var-ellipsis>
                        <template #right>
                            <var-icon name="checkbox-marked-circle-outline" v-if="medication.alreadyTakeMedication === true"/>
                            <var-icon name="radio-blank" v-if="medication.alreadyTakeMedication === false"/>
                        </template>
                    </var-chip>
                </div>
                </template>
                <template v-else>
                        <div style = "text-align: center; padding: 20px; color:#006973; font-size: larger;">
                            <p><b>No meds on this date.</b></p>
                        </div>
                </template>
            </el-scrollbar>
            <hr style="width: 90%; background-color:#E5E5E5; border: none; height:1px;">
            <Discussion />
            
        </el-main>
    </el-container>
    <el-dialog  v-model = "dialog" center align-center width="90%" round>
        <template #header>
            <span style="color: #006973; font-weight: bold; font-size: larger; margin-left: 16px">{{ selectedMedication.name }}</span>
        </template>
        <div style = "text-align: center; font-size: small; line-height: 2;">
            <span>Scheduled for {{ selectedMedication.time}}, {{ formattedDate }}</span><br>
            <span>Medication category: {{ selectedMedication.category}}</span><br>
            <span>Take {{ selectedMedication.dosageUnit }}
                <span v-if="selectedMedication.category === 'Pill'">pill(s)</span>
                <span v-if="selectedMedication.category === 'Tablet'">tablet(s)</span>
                <span v-if="selectedMedication.category === 'Injection'">injection(s)</span>
                <span v-if="selectedMedication.category === 'Drop'">drop(s)</span>
            </span><br>
            <b><span v-if="selectedMedication.note">Note: {{ selectedMedication.note }}</span></b><br>
            <b><span v-if="selectedMedication.alreadyTakeMedication">{{ formatTakeMedTime(selectedMedication.takeMedTime) }}</span></b>
        </div>
        <template #footer>
        <div v-if="!selectedMedication.alreadyTakeMedication" style="text-align: center;">
            <el-button color="#006973" @click="handleNow(selectedMedication.id)" round>Now &#10004;</el-button>
            <el-button color="#006973" @click="handleOnTime(selectedMedication.id)" round>On Time &#10004;</el-button>
            <el-button color="#006973" @click="openTimeDialog()" round>Set Time &#10004;</el-button>
        </div>
    </template>
    </el-dialog>

    <!-- time selector dialog -->
    <el-dialog v-model="timeDialog" center align-center width="90%" round>
        <template #header>
            <span style="color: #006973; font-weight: bold; font-size: larger;">{{ selectedMedication.name }}</span>
        </template>
        <div style = "text-align: center; font-size: small; line-height: 2;">
            <el-date-picker class = "timedialog" v-model = "setTimeSelected" type="datetime" placeholder="Pick a date and time" format="YYYY/MM/DD HH:mm:ss"/>
            <el-button color="#006973" @click="handleSetTime(selectedMedication.id)" round style="margin-top: 1vh;">Continue</el-button>
        </div>
    </el-dialog>

        <var-bottom-navigation
            class="footer"
            v-model:active="active"
            border="true"
            safe-area="true"
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
            <var-link href="/#/Community" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><PeopleCommunity20Regular /></Icon><br>
                <span>Community</span>
            </var-bottom-navigation-item>    
            </var-link>
            <!-- <template #fab >
                <var-link href="/#/AddMed" style="color: white;">
                <Icon class="addButton"><Add20Filled /></Icon>
                </var-link>
            </template> -->
        </var-bottom-navigation>
        
        <!-- Fab button -->
        <var-fab v-model:active="showAction" style="margin-bottom: 100px;" color="#006973" inactive-icon-size="26px" active-icon-size="30px" elevation="5">
            <var-button class="action" round color="#F27B42" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
                <var-link href="/#/AddPost" text-color="white" text-size="25px">
                <Icon><ChannelAdd20Regular /></Icon>
            </var-link>
            </var-button>
            <var-button class="action" round color="#55BDCA" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
                <var-link href="/#/AddMed" text-color="white" text-size="25px">
                    <Icon><Pill28Filled /></Icon>
                </var-link>
            </var-button>
        </var-fab>
        <el-drawer style="background-color: #006973;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
            <!--Action是模拟接口，与后端连接时更换-->
                <div class = "sidebar">
                    <var-avatar :size = "100" bordered bordered-color="#FFFFFF" lazy :src="require('@/assets/logo.png')"/>
                </div>
            <SidebarContent :imgUrl="imgUrl" />    
        </el-drawer>
</template>

<!-- the following is all css-->
<style src = "@/css/homepage.css" scoped></style>