<template>
    <div>
      <!-- My Meds Page -->
      <div class="header"></div>
  
      <!-- Current Medication -->
      <div class="d-flex align-center flex-column">
        <h1>Current Medication</h1>
        <hr>
        <div class="card" v-for="medicine in medicineData" :key="medicine.name">
          <v-card width="400" prepend-icon="mdi-home">
            <v-card-title>{{ medicine.name }}</v-card-title><br>
            <v-card-subtitle class="subtitle">Next Reminder: {{ medicine.nextReminder }}</v-card-subtitle>
          </v-card>
        </div>
      </div>
  
      <!-- Past Medication -->
      <div>
        <hr>
        <h1>Past Medication</h1>
        <hr>
        <div class="card">
          <v-card width="400" prepend-icon="mdi-home">
            <v-card-title>Acetaminophen</v-card-title><br>
            <v-card-subtitle class="subtitle">10/10 times</v-card-subtitle>
          </v-card>
        </div>
        <hr>
      </div>
  
      <!-- Plus Button -->
      <div class="button">
        <span class="button-wrapper" @click="addMedicine">
          <Plus color="#FFF" style="width: 3em; height: 3em;" />
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Plus } from '@element-plus/icons-vue';
  
  // Sample data for medicine cards
  const medicineData = ref([
    { name: 'Ibuprofen', nextReminder: 'Today: 10:00 AM' },
    { name: 'Acetaminophen', nextReminder: 'Tomorrow: 8:00 AM' },
    { name: 'Aspirin', nextReminder: 'Today: 2:00 PM' }
  ]);
  
  const addMedicine = () => {
    const newMedicine = {
      name: 'New Medicine',
      nextReminder: 'Tomorrow: 9:00 AM'
    };
    medicineData.value.push(newMedicine);
  };
  </script>
  
  <script>
  // eslint-disable-next-line no-unused-vars
  export default {
    mounted() {
      document.title = 'Mymeds | AthriCare';
    }
  };
  </script>
  
  <style scoped>
  h1 {
    padding-left: 10%;
  }
  
  .card {
    padding-left: 10%;
  }
  
  hr.shortDivider {
    padding-left: 10%;
  }
  
  .header {
    padding: 40px;
    text-align: center;
    background: #178ffe;
    color: white;
    font-size: 30px;
  }
  
  .subtitle {
    color: darkgray;
  }
  
  .button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  display: flex;
  justify-content: center;
}

  
  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    background: #178ffe;
    color: #fff;
    border-radius: 50%;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
  
  .button-wrapper:hover {
    opacity: 0.5;
  }
  
  .button-wrapper:hover Plus {
    opacity: 1;
  }
  </style>
  