<script>
    import { ref } from 'vue';
    import { AlertCircle, Logout } from '@vicons/tabler';
    import { LineHorizontal320Filled, Add20Filled, Home20Filled, BriefcaseMedical20Regular, Gift20Regular, Person20Regular } from '@vicons/fluent';
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
                dialog: ref(false)
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
                this.medicationList.sort((a, b) => {
                    const timeA = a.time.split(":").map(Number);
                    const timeB = b.time.split(":").map(Number);

                    if (timeA[0] !== timeB[0]) {
                        return timeA[0] - timeB[0];
                    }

                    return timeA[1] - timeB[1];
                });
                //testing
                console.log("Medication List for selected date:", this.medicationList);
            },

            showMedicationDetails(medication) {
                this.selectedMedication = medication;
                this.dialog = true;
            }
        },
        computed: {
            ...mapGetters('user', ['loggedInUser'])
        },
        components:{
            Icon,
            Logout,
            AlertCircle,
            LineHorizontal320Filled,
            Add20Filled,
            Home20Filled, 
            BriefcaseMedical20Regular, 
            Gift20Regular, 
            Person20Regular,
            UserProfileAlt,
            CastForEducationFilled,
            HorizontalCalendar,
        }
    }
</script>
<template>
    <el-container class = "container">
        <el-header class = "header">
            <Icon class="header-icon" @click="drawer = true"><LineHorizontal320Filled /></Icon>
            <span class = "username">Welcome to ArthriCare, {{ loggedInUser && loggedInUser.name ? loggedInUser.name : 'Guest' }}</span>
            <var-icon class = "header-icon2" name="message-text-outline" />
        </el-header>    
        <el-main class = "main">
            <HorizontalCalendar @date-selected="onDateSelected" />
            <template v-if = "medicationList && medicationList.length > 0">
                <div :class="['divider', {'last-medication': index === medicationList.length - 1}]" v-for = "(medication, index) in medicationList" :key = "medication.reminderId">
                    <span style = "width: 30vw; color: #006973; font-weight: bold;">{{ medication.time }}</span>
                    <var-divider vertical/>
                    <var-card layout="row">
                        <template #title>
                            <h3>{{ medication.name }}</h3>
                        </template>
                        <template #description>
                            <div v-if="medication.takenMedTime">
                                <p>Taken at {{ medication.takenMedTime }}</p>
                            </div>
                        </template>
                        <template #extra>
                                <var-button @click = "showMedicationDetails(medication)">
                                    <var-icon name = "cog" color = "#006973"/>
                                </var-button>
                        </template>
                    </var-card>
                </div>
            </template>
            <template v-else>
                    <div style = "text-align: center; padding: 20px; color:#006973; font-size: larger;">
                        <p><b>No meds on today...</b></p>
                    </div>
            </template>
        </el-main>
    </el-container>
    <el-dialog  v-model = "dialog" center align-center width="90%" round show-close = "false">
        <template #header>
            <span style="color: #006973; font-weight: bold; font-size: larger;">{{ selectedMedication.name }}</span>
        </template>
        <div style = "text-align: center;">
            <el-button color = "#006973" @click="onTime(medication)" round>On Time</el-button>
            <el-button color = "#006973" @click="nowTime(medication)" round>Now</el-button>
            <el-button color = "#006973" @click="setTime(selectedMedication)" round>Set Time</el-button>
        </div>
    </el-dialog>

    <var-bottom-navigation
            class="footer"
            v-model:active="active"
            border="true"
            safe-area="true"
            :fab-props="{color:'#006973'}"
        >
            <var-link href="/#/Home" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="homeButton">
                <Icon  style="font-size: 38px;"><Home20Filled /></Icon><br>
                <span><b>Home</b></span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/MyMeds" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="medsButton">
                <Icon style="font-size: 38px;"><BriefcaseMedical20Regular /></Icon><br>
                <span><b>My Meds</b></span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/Rewards" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="rewardsButton">
                <Icon style="font-size: 38px;"><Gift20Regular /></Icon><br>
                <span><b>Rewards</b></span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/UserProfile" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><Person20Regular /></Icon><br>
                <span><b>Profile</b></span>
            </var-bottom-navigation-item>    
            </var-link>
            <template #fab >
                <var-link href="/#/AddMed" style="color: white;">
                <Icon class="addButton"><Add20Filled /></Icon>
                </var-link>
            </template>
    </var-bottom-navigation>

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
    .main{
        --el-main-padding: 0;
        background-color: #ffffff;  /* for the arrow's color of the calendar */
        margin-bottom: 55px;
    }

    .divider{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        --divider-color: #006973;
        text-align: center;
        margin-top: 5vw;
    }
    .last-medication{
        margin-bottom: 15vw;
    }
    .var-card{
        margin-right: 5vw;
        color:#006973;
        height: 15vh;
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

   .bottomButton{
        padding-left:20px;
        padding-right: 20px;
    }
    .footer{
        display: inline;
        position: fixed;
        text-align: center;
        bottom: 0;
        height:80px;
        --bottom-navigation-item-font-size: 13px;
        --bottom-navigation-item-active-color: #006973;
        white-space: nowrap;
    }  
    .addButton{
        font-size: 35px;
    }
</style>