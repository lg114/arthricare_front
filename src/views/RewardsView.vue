<!--Rewards Page -->
<!-- Author: Tianyi Hu, Zhenxi Zhang
Student number: 6774179, 6062027
Date: 2023/10/20 -->
<script>
    import { ref, reactive, computed } from 'vue';
    import { LineHorizontal320Filled, Home20Regular, BriefcaseMedical20Regular, Gift20Filled, PeopleCommunity20Regular, Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent'
    import { Icon } from '@vicons/utils';
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import axios from 'axios';
    import { mapGetters,mapMutations } from 'vuex';

    export default{
        mounted(){
            document.title = "Rewards | ArthriCare";
            this.findPointFromBackend();
            this.checkRewardsStatue();
            this.initializePuzzle();
        },
        setup(){

            const activeBottom = ref(2);
            const active = ref(0);
            //Tasks Handle

            //task list, rewrite into "const tasks = ref([]);" if it needs to connect to the backend, however
            //"completed:" is a value that need to be deal with backend, "false" is the default value
            const tasks = reactive([
                { id: 1, description: 'Daily Login', completed: true, url: require("@/assets/tasks/calendar.png"),progress:"0/1",progressPercentage:0, },
                { id: 2, description: 'Take All Medications', completed: true, url: require("@/assets/tasks/takeMed.png"),progress:"0/5",progressPercentage:0 },
                { id: 3, description: 'Create Medication Schedules (Reminder)', completed: true, url: require("@/assets/tasks/addReminder.png"),progress:"0/1",progressPercentage:0 },
                { id: 4, description: 'Complete daily task', completed: true, url: require("@/assets/tasks/completeTask.png"),progress:"0/1",progressPercentage:0 },
                { id: 5, description: 'Complete daily education learning', completed: true, url: require("@/assets/tasks/Learning.png"),progress:"0/1",progressPercentage:0 },
                { id: 6, description: 'Completed Profile', completed: true, url: require("@/assets/tasks/completeProfile.png"),progress:"0/1",progressPercentage:0 },
            ]);
            //Store search status
            const selectedStatus = ref('');

            //filter
            const filteredTasks = computed(() => {
                if(selectedStatus.value === 'all'){
                    //return all
                    return tasks;
                }else if(!selectedStatus.value){
                    //Returns all tasks if no task status is selected
                    return tasks;
                }else{
                    //Otherwise filter based on selected task status
                    return tasks.filter((task) => {
                    return(
                        (selectedStatus.value === 'incomplete' && !task.completed) ||
                        (selectedStatus.value === 'completed' && task.completed)
                    );
                    });
                }
            });

            return{
                selectedStatus,
                filteredTasks,
                tasks,
                activeBottom,
                active,
            }
        },
        data(){
            return{
                puzzleNumLeft:0,
                
                imageMap: [
                    require("@/assets/puzzleImage/puzzle1_initial.jpg"),
                    ...Array.from({ length: 34 }, (v, i) => require(`@/assets/puzzleImage/puzzle1_${i + 1}.jpg`)),
                    require("@/assets/puzzleImage/puzzle1_completed.jpg")
                ],

                user:{
                    name: 'Username',
                    level: '10',
                    points: '50',
                    pointsTotal: '100',
                    pointsNoLevel: "10"
                },
                puzzle:{
                    url: require("@/assets/puzzleImage/puzzle1_26.jpg"),
                    title: 'Italian Landscape with Girl Milking a Goat',
                    completed: 0,
                    total: 35,
                },
                drawer: ref(false),
                showAction: ref(false), //Show actions of the fab
            };
        },
        computed:{
            ...mapGetters('user', ['loggedInUser']),
            ...mapGetters('task',['takeMedNum','alreadyTakeMedNum','puzzleNum','addPuzzleNum']),
            calculatedPercentage(){  
                const number =  (this.user.pointsNoLevel/ this.user.pointsTotal) * 100;    
                const roundedNumber = Math.floor(number);
                console.log(roundedNumber);
                return roundedNumber;
            },
        },
        methods:{
            ...mapMutations('task',['resetAddPuzzleNum']),
            initializePuzzle(){
                if(this.addPuzzleNum == 0){
                    this.puzzle.url = this.imageMap[this.puzzleNum];
                    this.puzzle.completed = this.puzzleNum;
                }
                else{
                    this.puzzle.url = this.imageMap[this.puzzleNum-this.addPuzzleNum];
                    this.puzzle.completed = this.puzzleNum-this.addPuzzleNum;
                }
                this.puzzleNumLeft = this.addPuzzleNum;
            },
            
            openDrawer() {
            this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
            //Router
            goToRewards(){
                this.$router.push('/Rewards');
            },

            findPointFromBackend()
            {
                if (this.loggedInUser) {
                    axios.get('http://localhost:8181/rewards/findPointByUserId/' + this.loggedInUser.userId)
                        .then(response => {
                        var userScore = response.data;
                        this.user.points = userScore;
                        // Calculate user's level
                        var userLevel = Math.floor(userScore / 100);
                        this.user.level = userLevel;
                        this.user.pointsNoLevel = userScore - userLevel*100;
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });
                    } else {
                    window.location.href = 'index.html';
                    }
            },

            
            checkRewardsStatue()
            {   
                const takeMedTask = this.tasks.find(task => task.id === 2);
                takeMedTask.progress = `${this.alreadyTakeMedNum}/${this.takeMedNum}`;
                takeMedTask.progressPercentage = this.alreadyTakeMedNum/this.takeMedNum*100

                if (this.loggedInUser) {
                        axios.get('http://localhost:8181/rewards/checkLoginRewardStatue/' + this.loggedInUser.userId)
                        .then(response => {
                        if (!response.data.canClaimedLoginReward) {
                                const loginTask = this.tasks.find(task => task.id === 1);
                                if (loginTask) {
                                    loginTask.progressPercentage = 100;
                                    loginTask.progress = "1/1"
                                }
                            }
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });

                        axios.get('http://localhost:8181/rewards/checkProfileRewardStatue/' + this.loggedInUser.userId)
                        .then(response => {
                        const ProfileRewardCanBeClaimed = response.data;
                        console.log("ProfileRewardCanBeClaimed "+ ProfileRewardCanBeClaimed)
                        if (!ProfileRewardCanBeClaimed) {
                            const ProfileTask = this.tasks.find(task => task.id === 6);
                                if (ProfileTask) {
                                    ProfileTask.progress = "1/1";
                                    ProfileTask.progressPercentage = 100
                                }
                        }
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });
                    }
            

            },

            completeProfileTask() {
                axios.put('http://localhost:8181/rewards/claimProfileReward/' + this.loggedInUser.userId)
                    .then(response => {
                    if (response.status === 200) {
                        console.log('Reward claimed successfully');
                    } else {
                        throw new Error('Failed to claim reward.');
                    }
                    })
                    .catch(error => {
                    console.log('Error claiming reward:', error);
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
            
            fetchPuzzleDataFromBackend(){

            },    
            
            collectPuzzle() {
                if(this.puzzle.completed<this.puzzle.total&&this.puzzleNumLeft>0){
                    this.puzzle.completed++;
                    this.puzzle.url = this.imageMap[this.puzzle.completed];
                    this.puzzleNumLeft --;
                    if(this.puzzleNumLeft==0)
                    {
                        this.resetAddPuzzleNum;
                    }
                }
            },

            
            toggleCompletion(task){
                if(task.id==4){this.completeLoginTask();}
                if(task.id==5){this.completeProfileTask();}
                task.completed = !task.completed;
            },
            toggleAction(){
                this.showAction.value = !this.showAction.value
            }
        },

        components: {
            Icon,
            LineHorizontal320Filled, Pill28Filled, ChannelAdd20Regular,
            Home20Regular, 
            BriefcaseMedical20Regular, 
            Gift20Filled, 
            PeopleCommunity20Regular,
            UserFilled,
            SideBarContent
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
                <b class="pageTitle"> Rewards</b>
            </el-header>
        </el-container>
        <el-main class="main">
            <!-- This section shows user's stastics - current points, level, progress -->
                <div class="topBox" id="topBox">
                    <text class="boxTitle">Current Points</text>
                    <div class="pointBox" id="pointBox">
                        <text class="points">{{ user.points }}</text>
                    </div>
                    <div class="levelBox" id="levelBox">
                        <text class="level">Level {{ user.level }}</text>
                    </div><br>
                    <div class="progressBar" id="progressBar">
                        <var-progress
                        :value="calculatedPercentage"
                        line-width="20"
                        color="linear-gradient(135deg, #FFA174 0%, #D04300 100%)"
                        track-color="#CFEEF5"
                        label  
                        >
                        <span>{{ user.pointsNoLevel }}/{{ user.pointsTotal }}</span>
                        </var-progress>
                        <div class="percentageProgress">
                            <text class="progressText">{{ calculatedPercentage}}%</text>
                        </div>
                    </div>
                </div>

                <!-- This section contains 3 parts, puzzles, tasks, and vouchers -->
                <var-tabs
                class="tabs"
                elevation
                sticky
                color="#55BDCA"
                active-color="#fff"
                inactive-color="hsla(0, 0%, 100%, .6)"
                v-model:active="active"
                >
                <var-tab>Puzzles</var-tab>
                <var-tab>Tasks</var-tab>
                <var-tab>Vouchers</var-tab>
                </var-tabs>
                <var-tabs-items class="tabItems" v-model:active="active">
                    <!-- The puzzle will automatically adds a piece after the user completes certain tasks -->
                    <var-tab-item>
                        <h2 class="puzzleTitle">{{ puzzle.title }} ({{ puzzle.completed }}/{{ puzzle.total }})</h2>
                        <img :src="puzzle.url" :alt="puzzle" class="puzzleImage" :fit="contain"/>
                        <var-button v-if="puzzleNumLeft != 0" type="primary" @click="collectPuzzle" style="margin-bottom: 10px;margin-top: -10px">Collect Puzzle</var-button>
                        <var-link to="/userprofile" underline="none" style="display: block;">
                            <!-- By clicking the My Collection section, it will jump to User Profile page showing all the puzzles the user has completed -->
                        <div class="box">
                            <text class="collectionTitle">My Collection</text><br>
                            <img src="@/assets/puzzleImage/puzzle1_completed.jpg" class="collectionImage" :fit="cover"/>
                            <img src="https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg" class="collectionImage" :fit="cover"/>
                        </div>
                        </var-link>
                    </var-tab-item>
                    <!-- This is task section. If user meets the requirements of tasks, the user will be able to click the button to complete tasks.
                         And the user will gain points and pieces of puzzles -->
                    <var-tab-item>

                    <!--Displaying Tasks-->
                    <el-row class = "main-row task-container" justify = "center">
                        <el-col class = "main-col" v-for="task in filteredTasks" :key="task.id">
                            <div class = "task">
                                <div class = "task-content">
                                    <var-image :src= "task.url" style = "width: 64px;height: 64px;"/>
                                    <div class = "task-progress-word">
                                        <span style = "text-align: left;">{{ task.description }}</span>
                                        <el-progress :text-inside="true" :stroke-width="20" :percentage="task.progressPercentage" :color="'#F27B42'" style = "width：100%;min-width: 220px;">
                                        <span>{{task.progress}}</span>
                                        </el-progress>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    </var-tab-item>
                    <!-- This is voucher section. At this moment it's just placeholders and isn't functional -->
                    <var-tab-item >
                        <var-card
                        class="vouchers"
                        id="voucher1"
                        :elevation="2"
                        title="Chemist Warehouse"
                        subtitle="-5%"
                        description="Applied to first purchase"
                        />
                        <var-card
                        class="vouchers"
                        id="voucher2"
                        :elevation="2"
                        title="Woolworths"
                        subtitle="$20"
                        description="Applied to first purchase"
                        />
                        <var-card
                        class="vouchers"
                        id="voucher3"
                        :elevation="2"
                        title="Priceline Pharmacy"
                        subtitle="-8%"
                        description="Applied to first purchase"
                        />
                    </var-tab-item>
                </var-tabs-items>
            </el-main>
            <!-- The bottom navigation contains 4 sections, Homepage, My Meds, Rewards, and Community. 
                If it's at the corresponding page, the button will turns green. 
                If the current page doesn't belong to any of them, none of the 4 buttons will light up. -->
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
                <Icon style="font-size: 38px;"><Gift20Filled /></Icon><br>
                <span>Rewards</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/Community" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><PeopleCommunity20Regular /></Icon><br>
                <span>Community</span>
            </var-bottom-navigation-item>    
            </var-link>
        </var-bottom-navigation>
                        <!-- This is the fab button, contains 2 actions, add a new medication, and add a new post -->
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

<style src = "@/css/rewards.css" scoped></style>
<style>
.el-progress-bar__innerText {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: #fff;
    font-size: 12px;
    margin: 3px 0px;
    width: 220px;
}
.el-progress-bar__outer {
    background-color: #ffffff;
}
</style>