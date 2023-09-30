<script>
    import { ref } from 'vue';
    import { AlertCircle, Logout } from '@vicons/tabler';
    import { LineHorizontal320Filled,Home20Regular, BriefcaseMedical20Regular, PeopleCommunity20Filled, Gift20Regular, Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent';
    import { UserProfileAlt } from '@vicons/carbon';
    import { CastForEducationFilled } from '@vicons/material';
    import { Icon } from '@vicons/utils';
    import HorizontalCalendar from '@/component/calendar.vue';
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    
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
                dialog: ref(false),
                onTime: ref(false),
                now: ref(false),
                setTime: ref(false),
            }
        },
        methods:{
            ...mapMutations('reminder', ['SET_SELECTED_DATE']),
            ...mapActions('reminder', ['fetchRemindersFromBackend']),

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
            //Calendar (父组件中的处理选定日期的方法)
            async onDateSelected(selectedDate){
                //存储选定的日期
                this.selectedDate = selectedDate; 
                this.SET_SELECTED_DATE(selectedDate);
                console.log('Selected date:', selectedDate);
                //假设medicationList是从后端获取的当天药物数据的数组
                const medicationList = await this.fetchRemindersFromBackend(selectedDate);
                //然后从早到晚排序 sorting
                this.medicationList.sort((a, b) => {
                    const timeA = a.time.split(":").map(Number);
                    const timeB = b.time.split(":").map(Number);

                    if (timeA[0] !== timeB[0]) {
                        return timeA[0] - timeB[0];
                    }

                    return timeA[1] - timeB[1];
                });
                this.medicationList = medicationList;
                //testing
                console.log("Medication List for selected date:", this.medicationList);
            },
            showMedicationDetails(medication) {
                this.selectedMedication = medication;
                this.$store.commit('reminder/SET_CURRENT_MEDICATION', this.selectedMedication);
                this.dialog = true;
            },
            handleNow() {
                console.log('Now button clicked');
                this.$store.dispatch('reminder/takeMedicationNow');
                this.dialog = false;
            },
            handleOnTime() {
                this.dialog = false;
                console.log('On Time button clicked');
            },
            handleSetTime() {
                this.dialog = false;
                console.log('Set Time button clicked');
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
            Logout,
            AlertCircle,
            LineHorizontal320Filled,
            Home20Regular, 
            BriefcaseMedical20Regular, 
            Gift20Regular, 
            PeopleCommunity20Filled,
            UserProfileAlt,
            CastForEducationFilled,
            HorizontalCalendar,
            ChannelAdd20Regular,
            Pill28Filled,
        }
    }
</script>
<template>
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
            <template v-if = "medicationList && medicationList.length > 0">
                <div :class="['divider', {'last-medication': index === medicationList.length - 1}]" v-for = "(medication, index) in medicationList" :key = "medication.reminderId">
                    <span style = "width: 30vw; color: #006973; font-weight: bold;">{{ medication.time }}</span>
                    <var-divider vertical/>
                    <var-card layout="row" elevation = 0 outline @click = "showMedicationDetails(medication)">
                        <template #title>
                            <h3>{{ medication.name }}</h3>
                        </template>
                        <template #description>
                            <div v-if="medication.takenMedTime">
                                <p>Taken at {{ medication.takenMedTime }}</p>
                            </div>
                        </template>
                    </var-card>
                </div>
            </template>
            <template v-else>
                    <div style = "text-align: center; padding: 20px; color:#006973; font-size: larger;">
                        <p><b>No meds on this date</b></p>
                    </div>
            </template>
        </el-main>
    </el-container>
    <el-dialog  v-model = "dialog" center align-center width="90%" round>
        <template #header>
            <span style="color: #006973; font-weight: bold; font-size: larger;">{{ selectedMedication.name }}</span>
        </template>
        <div style = "text-align: center; font-size: small; line-height: 2;">
            <span>Scheduled for {{ selectedMedication.time}}, {{ formattedDate }}</span><br>
            <span>Medication category: {{ selectedMedication.category}}</span><br>
            <span>Take {{ selectedMedication.dosageUnit }}
                <span v-if="selectedMedication.category === 'Pill'">pill(s)</span>
                <span v-if="selectedMedication.category === 'Tablet'">tablet(s)</span>
                <span v-if="selectedMedication.category === 'Injection'">injection(s)</span>
                <span v-if="selectedMedication.category === 'Drop'">drop(s)</span>
            </span>
        </div>
        <template #footer>
            <div style = "text-align: center;">
                <el-button color="#006973" @click="handleNow()" round>Now &#10004;</el-button>
                <el-button color="#006973" @click="handleOnTime()" round>On Time &#10004;</el-button>
                <el-button color="#006973" @click="handleSetTime()" round>Set Time &#10004;</el-button>
            </div>
        </template>
    </el-dialog>
    <!-- time selector dialog -->
    <el-dialog v-model="onTime" center align-center width="90%" round>
        <template #header>
            <span style="color: #006973; font-weight: bold; font-size: larger;">{{ selectedMedication.name }}</span>
        </template>
        <div style = "text-align: center; font-size: small; line-height: 2;">
            <el-date-picker v-model = "value2" type="datetime" placeholder="Pick a date and time" format="YYYY/MM/DD HH:mm:ss"/>
        </div>
    </el-dialog>

    <var-bottom-navigation
        class="footer"
        v-model:active="activeBottom"
        border="true"
        safe-area="true"
        :fab-props="{color:'#55BDCA'}"
    >
        <var-link href="/#/Home" underline="none">
        <var-bottom-navigation-item class="bottomButton" name="homeButton">
            <Icon  style="font-size: 38px;"><Home20Regular /></Icon><br>
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
            <Icon style="font-size: 38px;"><PeopleCommunity20Filled /></Icon><br>
            <span>Community</span>
        </var-bottom-navigation-item>    
        </var-link>
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

<style src="@/css/homepage.css" scoped></style>