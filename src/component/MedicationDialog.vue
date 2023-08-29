<!-- MedicationDialogComponent.vue -->
<script>
    export default{
        name: "MedicationDialog",
        props:{
            medicationList:{
                type: Array,
                default: () => [],
            },
            selectedMedication:{
                //接收选定的药物信息
                type: Object,
                default: null,
            },
            selectedMedicationIndex: {
                type: Number,
                default: null,
            },
            //用户选择保存的吃药时间
            takenMedTime:{
                type: Date,
                default: null,
            },
        },
        data() {
            return {
            SelectedMedication: null,
            };
        },
        methods:{
            showMedicationPopup(medication){
                this.$emit("show-medication-popup", medication);
            },
        }
    };
</script>

<template>
    <!-- 当药物列表不为空时，显示药物信息 -->
    <el-scrollbar style="max-height: 600px;">
        <div @click="showMedicationPopup(medication)" v-for="medication in medicationList" :key="medication.reminderId" class = "medicationList">
            <var-card style = "height: 108px;" ripple outline :elevation="2">
                <template #description>
                    <div class="medication-time">{{ medication.time }}</div>
                    <div class="medication-name">{{ medication.name }}</div>
                    <div v-if="medication.takenMedTime">
                        <p>Taken at {{ medication.takenMedTime }}</p>
                    </div>
                </template>
            </var-card>
        </div>
    </el-scrollbar>
</template>

<style scoped>
    /* -------------------------------- Medication Display Container --------------------------------*/
    .medicationList{
        color:#1890FF;
        font-weight: bold;
        width: 320px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        text-align: center;
        border-radius: 5px;
    }
    .medication-time{
        font-size: 20px;
        text-align: left;
        margin-left: 10px;
        margin-top: 10px;
    }
    .medication-name{
        margin-top: 5px;
        font-size: 18px;
        text-align: center;
    }
    
    /* -------------------------------- Medication Display Container --------------------------------*/
</style>