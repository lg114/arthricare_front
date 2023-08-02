<!--Rewards Page -->
<script>
    import { ref, reactive, computed } from 'vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import { MoreHorizFilled, MedicationOutlined, CardGiftcardFilled, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled, AddCircleOutlineFilled } from '@vicons/material';
    import { Icon } from '@vicons/utils';
    import SideBarContent from '@/component/Sidebar.vue';

    export default{
        mounted(){
            document.title = "Rewards | ArthriCare";
        },
        setup(){
            //Tasks Handle

            //task list, rewrite into "const tasks = ref([]);" if it needs to connect to the backend, however
            //"completed:" is a value that need to be deal with backend, "false" is the default value
            const tasks = reactive([
                { id: 1, description: 'Take Medications', completed: false },
                { id: 2, description: 'Create Medication Schedules (Reminder)', completed: false },
                { id: 3, description: 'Upload Information for Your Medication', completed: false },
                { id: 4, description: 'Daily Login', completed: false },
                { id: 5, description: 'Completed Profile', completed: false },
            ]);
            //Store search status
            const selectedStatus = ref('');

            //complete status handler,this step need to fetch backend data, for now just for frontend displaying
            const toggleCompletion = (task) =>{
                task.completed = !task.completed;
            }
                                    
            
            // Assuming you're connecting to the backend
            //Toggle task completion status
            //const toggleTask = (task) => {
            //task.completed = !task.completed;
            //axios.put(`/api/tasks/${task.id}`, { completed: task.completed })
                //.then(response => {
                // Handle the response from the backend if needed
                //})
                //.catch(error => {
                // Handle any error that occurred during the request
                // Rollback the change on error (if needed)
                //task.completed = !task.completed;
                //});
            //};

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
                toggleCompletion
            }
        },
        data(){
            return{
                user:{
                    name: 'Username',
                    level: '10',
                    points: '50',
                    pointsTotal: '100',
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
                return (this.user.points / this.user.pointsTotal) * 100;
            },
        },
        methods:{
            //Drawer
            beforeDrawerClose(done) {
                done();
            },
            //Router
            goToUserProfile(){
                this.$router.push('/Rewards');
            }
        },
        components: {
            Icon,
            UserFilled,
            MoreHorizFilled,
            MedicationOutlined, 
            CardGiftcardFilled, 
            CardGiftcardOutlined, 
            HomeRound, 
            AccountCircleOutlined,
            AddCircleFilled,
            AddCircleOutlineFilled,
            SideBarContent
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
                        <span>{{ user.points }}/{{ user.pointsTotal }}</span>
                        </el-progress>
                        <div class="percentageProgress">
                            <text class="progressText">{{ calculatedPercentage }}%</text>
                        </div>
                    </div>
                </div>
                <el-tabs type="card" class="tabs">
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
                        <el-tab-pane label="Tasks">
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
                </router-link>
        </el-footer>
        <el-drawer style="background-color: #1890FF;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
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

<style scoped>
.header{
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
    margin-right: 100px;
}
.more{
    position: absolute;
    left:20px;
    top:10px;
    font-size: 30px;
}
.present{
    position:relative;
    left: 30%;
    font-size: 30px;
}
.pageTitle{
    position:relative;
    left: 33%;
    font-size: 20px;
    white-space: nowrap;
}
.container{
    display: grid;
    flex-direction: column;
    place-items: center;
    height: 100vh;
    background-color: #1890FF;
    overflow-y: auto;
}
.main{
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    height: 100vh;
    background-color:white;
    width: 100%;
    padding-top: 0%;
    padding-left: 0%;
    padding-right: 0%;
    padding-bottom: 80px;
}
h2{
    text-align: center;
    color: white;
}
p{
    text-align: center;
    color: white;
}
.topBox{
    width: 100%;
    height: 150px;
    background-color: #185B8B;
    box-shadow: 2px 2px 2px rgb(83, 83, 83);
    text-align: center;
    margin-bottom: 15px;
    padding-top: 8px;
}
.boxTitle{
    padding-top:5px;
    color: white; 
    font-size: large;
    text-align: center;
}
.collectionTitle{
    padding-top:5px;
    color: #1890FF; 
    font-size: large;
}
.pointBox{
    width: 120px;
    height: 25px;
    background-color: white;
    margin:auto;
    margin-top: 5px;
    border-radius: 10px;
}
.points{
    color: #1890FF;
    font-size: large;
}
.levelBox{
    width:80px;
    height:25px;
    background-color: #4BA9FF;
    margin:auto;
    border-radius: 0px 0px 10px 10px;
}
.level{
    color: white;
}
.progressBar{
    margin: auto;
    width: 95%;
}
.percentageProgress{
    width: 40px;
    height: 18px;
    border-radius: 5px;
    background-color: #ffffff;
    float: right;
    margin-right: 10px;
    margin-top: 2px;
}
.progressText{
    font-size: small;
    color: #1890FF;
    vertical-align:text-top;
}
.tabs{
    width: 90%;
    height: 600px;
    border-radius: 5px;
    margin: auto;
    background-color: #D3EAFF;
    text-align: center;overflow-y: auto;
}
.puzzleTitle{
    font-size: x-large;
    color: #1890FF;
    font-weight: bold;
}
.puzzleImage{
    width: 300px;
    height: 250px;
    border-radius: 10px;
    border: 5px solid #1890FF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.box{
    width: 350px;
    height: 110px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 2px 2px 2px rgb(83, 83, 83);
    margin:auto;

}
.boxTitle{
    padding-left: 15px;
}
.collectionImage{
    width: 80px;
    height: 60px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    float: left;
}
.add{
    font-size: 40px;
    color: #1890FF;

}
.footer{
    background-color: white;
    position:fixed;
    bottom:0;
    height: 60px;
    width:100%;
    text-align: center;
    margin-left: 0;
    margin-right: 0;
    white-space: nowrap;
    box-shadow: inset 0 0 5px grey;
}
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
#addMed{
    color: #1890FF;
}
#rewards{
    color: #1890FF;
}
.footerBtn{
    font-size: 45px;
    color: gray;
    height: 50px;
    width: 50px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}
.uploaded-avatar {
        width: 100%;
        height: 100%;
    }
    .defalut-avatar{
        width: 70%;
        height: 80%;
    }
    .menu-item{
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #ffffff;
    }
    .menu-icon{
        color: #ffffff;
        font-size: 20px;
    }
    .menu-icon1{
        color: #ffffff;
        font-size: 25px;
        margin-right: 15px;
    }
    .menu-icon2{
        color: #ffffff;
        font-size: 25px;
        margin-right: 5px;
    }
    .menu-icon3{
        color: #ffffff;
        font-size: 25px;
        margin-right: 1px;
    }
    .menu-button{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        cursor: pointer;
    }
    .menu-button3{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 130px;
        cursor: pointer;
    }
    .menu-button3 p{
        font-size: 20px;
        font-weight: 550;
        margin: 20px 35px;
    }
    .menu-button p{
        font-size: 20px;
        font-weight: 550;
        margin: 30px 30px;
        text-decoration: none;
    }
    /* Task tab panel */
    .main-row{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        width: 100%;
        margin-top: 10px;
    }
    .main-col{
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .task{
        width: 280px;
        height: 100px;
        padding: 0px;
        border-radius: 20px;
        border: 3px solid #066CCA;
        background-color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.2s ease;
    }
    .task-container{
        background: linear-gradient(to bottom right, rgb(0,124,242), rgb(136,83,249));
        border-radius: 20px;
    }
    .task:hover{
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .task-content{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .task-container .main-col {
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .task-content span{
        color:#066CCA;
        font-weight: 800;
        font-size: 14px;
    }
    .missionBtn{
        margin-top: 15px;
        background-color: #066CCA;
        color: #FFFFFF;
        font-weight: 800;
        border: none;
        width: 125px;
        border: 3px solid #066CCA;
    }
    .completed-btn::before {
        content: '\2714'; 
        font-size: 18px;
        color: #FFFFFF;
        margin-right: 5px;
        border: 3px solid #f0f0f0;
    }
    .disabled-btn {
        background-color: #f0f0f0;
        cursor: not-allowed;
        border: 3px solid #f0f0f0;
        pointer-events: none; 
    }
</style>