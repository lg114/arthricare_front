<!--Rewards Page -->
<script>
    import { ref, reactive, computed } from 'vue';
    import { LineHorizontal320Filled, Add20Filled, Home20Regular, BriefcaseMedical20Regular, Gift20Filled, Person20Regular, AddCircle20Regular } from '@vicons/fluent'
    import { Icon } from '@vicons/utils';
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import axios from 'axios';

    export default{
        mounted(){
            document.title = "Rewards | ArthriCare";
            this.findPointFromBackend();
            this.checkRewardsStatue();
        },
        setup(){
            const activeBottom = ref(2);
            const active = ref(0);
            //Tasks Handle

            //task list, rewrite into "const tasks = ref([]);" if it needs to connect to the backend, however
            //"completed:" is a value that need to be deal with backend, "false" is the default value
            const tasks = reactive([
                { id: 1, description: 'Take Medications', completed: true },
                { id: 2, description: 'Create Medication Schedules (Reminder)', completed: true },
                { id: 3, description: 'Upload Information for Your Medication', completed: true },
                { id: 4, description: 'Daily Login', completed: true },
                { id: 5, description: 'Completed Profile', completed: true },
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
                active
            }
        },
        data(){
            return{

                user:{
                    name: 'Username',
                    level: '10',
                    points: '50',
                    pointsTotal: '100',
                    pointsNoLevel: "10"
                },
                puzzle:{
                    title: 'The Starry Night',
                    completed: '10',
                    total: '15',
                },
                drawer: ref(false),
            };
        },
        computed:{
            calculatedPercentage(){  
                const number =  (this.user.pointsNoLevel/ this.user.pointsTotal) * 100;    
                const roundedNumber = Math.floor(number);
                console.log(roundedNumber);
                return roundedNumber;
            },
        },
        methods:{
            
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
                var loggedInUser = sessionStorage.getItem('loggedInUser');
                if (loggedInUser) {
                    loggedInUser = JSON.parse(loggedInUser);
                    if (loggedInUser) {
                    axios.get('http://localhost:8181/rewards/findPointByUserId/' + loggedInUser.id)
                        .then(response => {
                        var userScore = response.data;
                        this.user.points = userScore;
                        // 计算用户等级
                        var userLevel = Math.floor(userScore / 100);
                        this.user.level = userLevel;
                        this.user.pointsNoLevel = userScore - userLevel*100;
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });
                    } else {
                    // 如果用户未登录，可以根据需求进行逻辑处理，如跳转到登录页面
                    window.location.href = 'index.html';
                    }
                }else
                {
                    console.log("login first");
                }
            },

            
            checkRewardsStatue()
            {   var loggedInUser = sessionStorage.getItem('loggedInUser');
                if (loggedInUser) {
                    loggedInUser = JSON.parse(loggedInUser);
                    if (loggedInUser) {
                        axios.get('http://localhost:8181/rewards/checkLoginRewardStatue/' + loggedInUser.id)
                        .then(response => {
                        const alreadyClaimedLoginReward = response.data;
                        console.log(alreadyClaimedLoginReward);
                        if (alreadyClaimedLoginReward) {
                                const loginTask = this.tasks.find(task => task.id === 4);
                                if (loginTask) {
                                    loginTask.completed = false;
                                }
                            }
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });

                        axios.get('http://localhost:8181/rewards/checkProfileRewardStatue/' + loggedInUser.id)
                        .then(response => {
                        const ProfileRewardCanBeClaimed = response.data;

                        if (ProfileRewardCanBeClaimed) {
                            const ProfileTask = this.tasks.find(task => task.id === 5);
                                if (ProfileTask) {
                                    ProfileTask.completed = false;
                                }
                        }
                        })
                        .catch(error => {
                        console.log('Error fetching user information:', error);
                        });
                        }
                }else
                {
                    console.log("login first");
                }
            

            },

            completeProfileTask() {
                var loggedInUser = sessionStorage.getItem('loggedInUser');
                loggedInUser = JSON.parse(loggedInUser);
                axios.put('http://localhost:8181/rewards/claimProfileReward/' + loggedInUser.id)
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
                    var loggedInUser = sessionStorage.getItem('loggedInUser');
                    loggedInUser = JSON.parse(loggedInUser);
                    // Claim login reward by making a PUT request to the backend using axios
                    axios.put('http://localhost:8181/rewards/claimLoginReward/' + loggedInUser.id)
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

            toggleCompletion(task){
                if(task.id==4){this.completeLoginTask();}
                if(task.id==5){this.completeProfileTask();}
                task.completed = !task.completed;
            }
        },

        components: {
            Icon,
            LineHorizontal320Filled, 
            Add20Filled, 
            Home20Regular, 
            BriefcaseMedical20Regular, 
            Gift20Filled, 
            Person20Regular,
            UserFilled,
            AddCircle20Regular,
            SideBarContent
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
                <Icon class="present"><Gift20Filled /></Icon>
                <b class="pageTitle"> Rewards</b>
            </el-header>
        </el-container>
        <el-main class="main">
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
                        line-width="15"
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
                    <var-tab-item>
                        <h2 class="puzzleTitle">{{ puzzle.title }} ({{ puzzle.completed }}/{{ puzzle.total }})</h2>
                        <el-image class="puzzleImage" :fit="contain"></el-image><br><br>
                        <div class="box">
                            <text class="collectionTitle">My Collection</text><br>
                            <img src="@/assets/pic_1.jpg" class="collectionImage" :fit="cover"/>
                            <img src="@/assets/pic_2.jpg" class="collectionImage" :fit="cover"/>
                            <img src="@/assets/pic_3.png" class="collectionImage" :fit="cover"/>
                            <Icon class="add"><AddCircle20Regular /></Icon>
                        </div>
                    </var-tab-item>
                    <var-tab-item>
                        <el-row class="main-row" justify="center">
                    <el-col class="main-col">
                        <el-select v-model="selectedStatus" placeholder="Select Status">
                            <el-option label="All" value="all"></el-option>
                            <el-option label="Incomplete" value="incomplete"></el-option>
                            <el-option label="Completed" value="completed"></el-option>
                        </el-select>
                    </el-col>
                    </el-row>

                    <!--Displaying Tasks-->
                    <el-row class = "main-row task-container" justify = "center">
                        <el-col class = "main-col" v-for="task in filteredTasks" :key="task.id">
                            <div class = "task">
                                <div class = "task-content">
                                    <span>{{ task.description }}</span>
                                    <el-button round class = "missionBtn " :class="{ 'completed-btn': task.completed, 'disabled-btn': task.completed }" 
                                        @click="toggleCompletion(task)" :disabled="task.completed">{{ task.completed ? 'Completed' : 'Complete' }}</el-button>
                                </div>
                            </div>
                        </el-col>

                        <el-col class = "main-col">
                            <div class = "task">
                                <div class = "task-content">
                                    <span>More Missions Coming Soon</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    </var-tab-item>
                    <var-tab-item>
                        To Be Determined
                    </var-tab-item>
                </var-tabs-items>
            </el-main>
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
            <var-link href="/#/UserProfile" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><Person20Regular /></Icon><br>
                <span>Profile</span>
            </var-bottom-navigation-item>    
            </var-link>
            <template #fab>
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

<style src = "@/css/rewards.css" scoped></style>