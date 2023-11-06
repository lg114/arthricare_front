<template>
    <var-overlay v-model:show="show" v-if="currentTask">
        <el-row class="main-row task-container" justify="center">
            <el-col class="main-col">
                <div class="task">
                    <div class = "puzzle-num-image">
                        <var-image :src="puzzleImage" style="width: 24px; height: 24px;"/>
                        <span>{{currentPuzzleNum}}</span>
                    </div>
                    <div class="task-content">
                        <var-image :src="currentTask.url" style="width: 64px; height: 64px;" />
                        <div class="task-progress-word">
                            <span style="text-align: left;">{{ currentTask.description }}</span>
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="progressPercentage" :color="'#F27B42'" style="width: 100%; min-width: 220px;">
                            <span>{{ currentTask.progress }}</span>
                            </el-progress>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </var-overlay>
</template>



<script setup>
import { ref,reactive,defineExpose,computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const takeMedNum = computed(() => store.getters['task/takeMedNum']);
const currentPuzzleNum = computed(() => store.getters['task/puzzleNum']);
const alreadyTakeMedNum = computed(() => store.getters['task/alreadyTakeMedNum']);
const addAlreadyTakeMedNum = (value) => {
  store.commit('task/addAlreadyTakeMedNum', value);
};
const addPuzzleNum = (value) => {
  store.commit('task/addPuzzleNum', value);
};


const show = ref(false);
const currentTask = ref(null); 
const progressPercentage = ref(0);
const puzzleImage = require('@/assets/tasks/puzzle.png');

function showTaskDialog(taskId) {
    const taskToShow = tasks.find(task => task.id === taskId);
    if (taskToShow) {
        currentTask.value = taskToShow;
        show.value = true;
        setTimeout(() => {
            progressPercentage.value = 100;  // 1秒后设置进度为100%

            setTimeout(() => {
                currentTask.value.progress = "1/1";  // 再过0.5秒后设置任务进度
                addPuzzleNum();
                //currentPuzzleNum .value ++;                
            }, 800);
        }, 1000);
    } else {
        console.error("Task not found with id:", taskId);
    }
}

function showTakeMedTaskDialog() {
    const taskToShow = tasks.find(task => task.id === 2);
    if (taskToShow) {
        taskToShow.progress = `${alreadyTakeMedNum.value}/${takeMedNum.value}`;
        currentTask.value = taskToShow;
        show.value = true;
        progressPercentage.value = alreadyTakeMedNum.value/takeMedNum.value*100;  // 重置进度为0
        setTimeout(() => {
            addAlreadyTakeMedNum();
            progressPercentage.value = (alreadyTakeMedNum.value)*100/takeMedNum.value; // 1秒后设置进度为100%

            setTimeout(() => {
                currentTask.value.progress = `${alreadyTakeMedNum.value}/${takeMedNum.value}`;  // 再过0.5秒后设置任务进度
                if(alreadyTakeMedNum.value==takeMedNum.value){
                    addPuzzleNum();  
                }             
            }, 800);
        }, 1000);
    } else {
        console.error("Task not found with id:", 2);
    }
}

function closeDialog()
{
    show.value = false;
}


defineExpose({
  showTaskDialog,closeDialog,showTakeMedTaskDialog,
})

const tasks = reactive([
                { id: 1, description: 'Daily Login', completed: true, url: require("@/assets/tasks/calendar.png"),progress:"0/1" },
                { id: 2, description: 'Take All Medications', completed: true, url: require("@/assets/tasks/takeMed.png"),progress:"0/5" },
                { id: 3, description: 'Create Medication Schedules (Reminder)', completed: true, url: require("@/assets/tasks/addReminder.png"),progress:"0/1" },
                { id: 4, description: 'Complete daily task', completed: true, url: require("@/assets/tasks/completeTask.png"),progress:"0/1" },
                { id: 5, description: 'Complete daily education learning', completed: true, url: require("@/assets/tasks/Learning.png"),progress:"0/1" },
                { id: 6, description: 'Completed Profile', completed: true, url: require("@/assets/tasks/completeProfile.png"),progress:"0/1" },
            ]);
</script>

<style scoped>
.task{
    width: 350px;
    height: 120px;
    padding: 0px;
    border-radius: 10px;
    /* border: 3px solid #006973; */
    background: #cfeef5;
    transition: box-shadow 0.2s ease;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.task-container{
    border-radius: 10px;
}

.task-content{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width:100%;
    margin-left: 20px;
}
.task-container .main-col {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.task-content span{
    color: #01385c;
    font-weight: 800;
    font-size: 14px;
}
.task-progress-word
{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 20px;
    height: 60px;
    width: 220px;
}
.puzzle-num-image{
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    padding-top: 10px;
    gap: 5px
}
</style>
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