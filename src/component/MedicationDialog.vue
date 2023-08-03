<!-- MedicationDialogComponent.vue -->
<script>
    export default{
        name: "MedicationDialog",
        props:{
            medicationList:{
                type: Array,
                default: () => [],
            },
        },
        methods:{
            showMedicationPopup(medication) {
                this.$emit("show-medication-popup", medication);
            },
        }
    };
</script>

<template>
  <div class = "medi-info-container">
    <div class = "medi-info">
        <div v-if="medicationList.length > 0">
            <!-- 当药物列表不为空时，显示药物信息 -->
            <div @click="showMedicationPopup(medication)" v-for="medication in medicationList" :key="medication.id" class = "medicationList">
                <div class="medication-time">{{ medication.time }}</div>
                <div class="medication-name">{{ medication.name }}</div>
                <el-divider></el-divider>
            </div>
        </div>
        <div v-else>
            <!-- 当药物列表为空时，显示一条消息 -->
            No Meds on Today
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
        padding: 20px;
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
    }
    .medication-name{
        margin-top: 5px;
        font-size: 18px;
        text-align: center;
    }
    /* -------------------------------- Medication Display Container --------------------------------*/
</style>