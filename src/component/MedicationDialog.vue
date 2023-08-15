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
  <div class = "medi-info-container">
    <div class = "medi-info">
        <div>
            <!-- 当药物列表不为空时，显示药物信息 -->
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
        </div>
    </div>
  </div>
</template>

<style scoped>
    /* -------------------------------- Medication Display Container --------------------------------*/
    .medi-info-container{
        display: flex;
        align-items: center;
    }
    .medi-info{
        margin-top: 10px;
        width: 320px;
        padding: 5px;
        text-align: center;
        color:#1890FF;
        font-weight: 800;
    }
    .medicationList{
        margin-top: 10px;
        width: 320px;
        display: flex;
        flex-direction: column;
        text-align: center;
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