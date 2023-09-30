<!--Rewards Page -->
<script>
    import { ref, reactive, computed } from 'vue';
<<<<<<< Updated upstream
    import { MoreHorizFilled, MedicationOutlined, CardGiftcardFilled, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled, AddCircleOutlineFilled } from '@vicons/material';
=======
    import { LineHorizontal320Filled, Home20Regular, BriefcaseMedical20Regular, Gift20Filled, PeopleCommunity20Regular, AddCircle20Regular,Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent';
    import { AlertCircle, Logout } from '@vicons/tabler';
    import { UserProfileAlt } from '@vicons/carbon';
    import { CastForEducationFilled } from '@vicons/material';
>>>>>>> Stashed changes
    import { Icon } from '@vicons/utils';
    import axios from 'axios';

    export default{
        mounted(){
            document.title = "Rewards | ArthriCare";
            this.findPointFromBackend();
            this.checkRewardsStatue();
        },
        setup(){
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
<<<<<<< Updated upstream
            }
=======
            },
            toggleAction(){
                this.showAction.value = !this.showAction.value
            },
            async logout(){
                this.$store.dispatch('user/logout');
            },
>>>>>>> Stashed changes
        },

        components: {
            Icon,
<<<<<<< Updated upstream
            MoreHorizFilled,
            MedicationOutlined, 
            CardGiftcardFilled, 
            CardGiftcardOutlined, 
            HomeRound, 
            AccountCircleOutlined,
            AddCircleFilled,
            AddCircleOutlineFilled,
=======
            LineHorizontal320Filled, Pill28Filled, ChannelAdd20Regular,
            Home20Regular, 
            BriefcaseMedical20Regular, 
            Gift20Filled, 
            PeopleCommunity20Regular,
            AddCircle20Regular,
            UserProfileAlt,
            CastForEducationFilled,
            AlertCircle,
            Logout
>>>>>>> Stashed changes
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><MoreHorizFilled /></Icon>
                <Icon class="present"><CardGiftcardFilled /></Icon>
                <b class="pageTitle"> Rewards</b>
                <var-icon class = "header-icon2" name="message-text-outline" @click="gotoMsg"/>
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
                        <el-progress 
                        :percentage="calculatedPercentage"
                        :text-inside="true"
                        :stroke-width="20"
                        >
                        <span>{{ user.pointsNoLevel }}/{{ user.pointsTotal }}</span>
                        </el-progress>
                        <div class="percentageProgress">
                            <text class="progressText">{{ calculatedPercentage}}%</text>
                        </div>
                    </div>
                </div>

                <el-tabs class="tabs">
                        <el-tab-pane label="Puzzles">
                            <text class="puzzleTitle">{{ puzzle.title }} ({{ puzzle.completed }}/{{ puzzle.total }})</text><br><br>
                            <el-image class="puzzleImage" :fit="contain"></el-image><br><br>
                            <div class="box">
                                <text class="collectionTitle">My Collection</text><br>
                                <el-image class="collectionImage" :fit="cover"></el-image>
                                <el-image class="collectionImage" :fit="cover"></el-image>
                                <el-image class="collectionImage" :fit="cover"></el-image><br>
                                <Icon class="add"><AddCircleOutlineFilled /></Icon>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Tasks" class="taskPanel">
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
                        </el-tab-pane>
                        <el-tab-pane label="Vouchers">Vouchers</el-tab-pane>
                </el-tabs>
            </el-main>
<<<<<<< Updated upstream
        <el-footer class="footer">
                <router-link to = "/Home">
                <Icon class="footerBtn" id="home"><HomeRound /></Icon>                    
                </router-link>
                <router-link to = "/MyMeds">
                <Icon class="footerBtn" id="medication"><MedicationOutlined /></Icon>
                </router-link>
                <router-link to = "/AddMed">
                    <Icon class="footerBtn" id="addMed"><AddCircleFilled /></Icon>
                </router-link>
                <Icon class="footerBtn" id="rewards"><CardGiftcardOutlined /></Icon>
                <router-link to = "/UserProfile">
                <Icon class="footerBtn" id="profile"><AccountCircleOutlined /></Icon>
                </router-link><br>
                <span id="homeText">Home</span>
                <span id="medText">My Meds</span>
                <span id="rewardsText">Rewards</span>
                <span id="profileText">Profile</span>
        </el-footer>
=======
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
>>>>>>> Stashed changes
    </div>
</template>

<style src = "@/css/sidebar.css" scoped></style>
<style src = "@/css/rewards.css" scoped></style>