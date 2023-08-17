<!--Mission Page -->

<!--页脚：蓝底白字-->
<script>
    import { AlignJustified } from '@vicons/tabler';
    import { ref, reactive, computed } from 'vue';
    //import axios from 'axios';

    export default{
        //title
        mounted() {
            document.title = "Mission | ArthriCare";
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

            //complete status handler,this step need to fetch backend data, for now just for frontend displaying
            const toggleCompletion = (task) =>{
                task.completed = !task.completed;
            }


            //filter tasks based on selectedStatus
            //Store search status
            const selectedStatus = ref('all');
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
                toggleCompletion
            }
        },
        components:{
            AlignJustified
        }
    }
</script>

<template>
    <el-container>
        <el-header class = "header">
            <el-row class = "header-row">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div class = "header-com"><AlignJustified class = "lefticon" @click="drawer = true"/></div></el-col>
                <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="16"><div class = "header-com"><b>Mission</b></div></el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div class = "header-com"></div></el-col>
            </el-row>
        </el-header>
        <el-main class = "main">
            <!--Filter-->
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
        </el-main>

        <el-footer>
            <el-row class = "footer-row">
                <el-col :xs="24" class = ""></el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<style scoped>
    /* -------------------------------- Header -----------------------------------------------*/
    .header{
        padding: 0px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0;
        z-index: 1;
    }
    .header-row{
        background-color: #1890FF;
        color: #ffffff;
        font-size: 20px;
    }
    .lefticon{
        width: 30px;
        height: 30px;
    }
    .header-com{
        align-items: center;
        justify-content: center;
        display: flex;
        height: 50px;
    }
    /* -------------------------------- Header -----------------------------------------------*/

    /* -------------------------------- Main -------------------------------------------------*/
    .main{
        padding: 50px;
    }
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
    /* -------------------------------- Main -------------------------------------------------*/
</style>