<!--Add Med Page -->
<script setup>
  import {ArrowLeftBold} from '@element-plus/icons-vue';
  import store from "@/store";
  import {Plus,Minus} from '@element-plus/icons-vue';
  
</script>

<template>
   <el-container class = "container">
      
    <div class = "container-flex" style="height:100% ; width:50% ;">
        <router-link to = "/home">
          <el-icon class = "backBtn"><ArrowLeftBold/></el-icon>
        </router-link>
        <p id= "title">My Meds</p>
      </div>
      
      <div id = container2>
        <p id = "label" style = "font-size : 35px ; font-weight:500;" >Add Medication</p>
        <p id = "label">Medication Name *</p>

        <input ref="MedName" id="MedName" type="text" placeholder="Medication Name" @keyup="processInput" @focus="toggleOptions" />

        <div  class="menu" v-if="this.Meds2!==null  && showMed">
          <div ref="MedOption"  class="selected-option" v-for="item in Meds2" :key="item" @click="handleItemClick(item)">{{ item }}</div>
        </div> 

        <p id = "label">Select Category *</p>
        <div>
          <b><label for = "Category"></label></b>
          <select  ref = "Category" name="Category" id="Category" class = "row-input" v-model="selectedCategory">
           <option value="" disabled selected>Select Category *</option>
           <option value="Pill" selected>Pill</option>
           <option value="Tablet">Tablet</option>
           <option value="Injection">Injection</option>
           <option value="Drop">Drop</option>
         </select>
        </div>

        <p id = "label" >How often are you taking this medication ? *</p>
        <!-- <input ref="Frequency" id="input" type="text" placeholder="  " /> -->
        <div>
          <select  ref="Frequency" name="Frequency" id="Frequency" class ="row-input" v-model="selectedFrequency">
           <option value="" disabled selected>Select Category</option>
           <option value="Once a Day">Once a Day</option>
           <option value="Twice a Day">Twice a Day</option>
           <option value="Three times a Day">Three times a Day</option>
          </select>
        </div>

        <div v-if="selectedFrequency === 'Once a Day'">
          <input type="time" v-model="timeInput1" />
        </div>

        <div v-else-if="selectedFrequency === 'Twice a Day'">
      
          <input type="time" v-model="timeInput1" />
          <input type="time" v-model="timeInput2" />
        </div>

        <div v-else-if="selectedFrequency === 'Three times a Day'">

          <input type="time" v-model="timeInput1" />
          <input type="time" v-model="timeInput2" />
          <input type="time" v-model="timeInput3" />
        </div>

        <p id = "label">How many units do you take each time ? *</p>

        <div class = "calculationPart">
          <el-icon class = "decreaseButton" @click="decreaseCounter"><Minus/></el-icon>
          <div ref = "Unit" class = "number">{{ counter }}</div>
          <el-icon class = "increaseButton" @click="increaseCounter"><Plus/></el-icon>
        </div>


        
        <p id = "label">When did you start taking this medication ? *</p>
        <div id = "date" >
          <VueDatePicker1 ref = "StartDate" id="startDate"  v-model="selectedStartDate" :format="dateFormat"></VueDatePicker1>
        </div>
        
        <p id = "label" style="margin-top: 50px;">When did you stop taking this medication ? *</p>
        <div id = "date">
          <VueDatePicker2  ref = "EndDate" id="endDate" v-model="selectedEndDate" :format="dateFormat"></VueDatePicker2>
        </div>

      
      

        <p id = "label" style = "margin-top:60px">Add a note ? (0ptional)</p>
        <div >
          <textarea ref="Note" id = "textarea1" name = "Note" column="20" row="20"></textarea>
        </div>
        <div class = "container-flex" style="margin-top:5%">   

        </div>  
        <el-footer class >
            <div class="buttons" >
                 <el-button class = "login-button" @click = "saveDataAndmedicineData">ADD</el-button> 
            </div>
         </el-footer>
        <!-- <date-picker v-model:value = "selectedDate"></date-picker> -->
      </div>

    </el-container>
</template>

<style src="@/css/addMed.css" scoped></style>

<script>
import VueDatePicker1 from '@vuepic/vue-datepicker';
import VueDatePicker2 from '@vuepic/vue-datepicker';
import axios from 'axios';

export default {
  components: { VueDatePicker1 , VueDatePicker2 },
  computed: {
    changeToTrue() {
      return this.$store.state.changeToTrue;
    },
    
  },
  data() {
    return {
      timeInput1: '',
      timeInput2: '',
      timeInput3: '',

      /// don's Edit
      timeInputs:[],

      selectedDate: null, 
      counter: 0,
      selectedCategory: null,
      selectedFrequency: null,
      selectedStartDate: null,
      selectedEndDate: null,

      dateFormat: 'yyyy-MM-dd',
      Meds : ["Abatacept",
    "Adalimumab",
    "Allopurinol",
    "Ambrisentan",
    "Anakinra",
    "Anifrolumab",
    "Apremilast",
    "Azathioprine",
    "Baricitinib",
    "Biosimilars",
    "Bisphosphonates (Oral)",
    "Bisphosphonates (Intravenous/IV)",
    "Bosentan",
    "Cannabinoids - Medicinal Cannabis",
    "Certolizumab",
    "Colchicine",
    "Ciclosporin",
    "Cyclophosphamide",
    "Denosumab",
    "Duloxetine",
    "Etanercept",
    "Febuxostat",
    "Glucosamine",
    "Golimumab",
    "Goserelin",
    "Guselkumab",
    "Hyaluronic Acid",
    "Hydroxychloroquine",
    "Iloprost",
    "Infliximab",
    "Ixekizumab",
    "IV Immunuglobulin",
    "Leflunomide",
    "Methotrexate",
    "Self-Injecting Methotrexate for the Treatment of Arthritis",
    "Mycophenolate",
    "NSAIDs",
    "Opioids",
    "Paracetamol",
    "Prednisolone",
    "Pregabalin",
    "Probenecid",
    "Raloxifene",
    "Rituximab",
    "Romosozumab",
    "Secukinumab",
    "Sulfasalazine",
    "Tacrolimus",
    "Teriparatide",
    "Tocilizumab",
    "Tofacitinib",
    "Ustekinumab",
    "Upadacitinib"],
      Meds2:[],
      Meds3:[],

      // pass data to MyMed


      category: [
        { id: 1, title: 'Pill' },
        { id: 2, title: 'Tablet' },
        { id: 3, title: 'Injection' },
        { id: 4, title: 'Drop' }
      ],
      Med: [
        { id: 1, meds: 'Mg' },
        { id: 2, meds: 'Bottle'}
      ],
      selectedMed: null,
      showMed: false,

    };
    
  },
  
  methods: {

    increaseCounter() {
        this.counter++;
    },
    decreaseCounter() {
      if(this.counter == 0){
        this.counter += 0
      }else{
        this.counter--;
      }
    },

    // fliter letter
    filterWordsByLetter(wordsArray, letter) {
      const lowercaseLetter = letter.toLowerCase();
      const filteredWords = wordsArray.filter(word => word.toLowerCase().startsWith(lowercaseLetter));
      return filteredWords;
   },
   showResult(){
    if(this.$refs.MedName.value === ""){
      this.Meds2 =this.Meds3;
      console.log(this.Meds2);
    }else{
      const filteredWordsStartingWithLetters = this.filterWordsByLetter(this.Meds, this.$refs.MedName.value);
      this.Meds2 = filteredWordsStartingWithLetters;
      console.log(this.Meds2);
    }
  }
   ,
   getResult(){
    const filteredWordsStartingWithLetters = this.filterWordsByLetter(this.words, this.$refs.MedName.value);
    return filteredWordsStartingWithLetters;
   },
   processInput(event) {
     if (event.keyCode !== 13) {
        this.showResult();

         }
      },
      

      //show Med in list
    handleItemClick(Med) {
      this.selectedMed = Med;
      this.showMed = false;
      this.$refs.MedName.value = Med;
      this.$refs.MedName.blur();
      this.Meds2=this.getResult;
      this.getReminderTimes(); // don's code. 
      console.log(Med);

    },
    
    toggleOptions() {
      this.showMed = !this.showMed;
      this.$refs.MedName.focus();
    },

saveDataAndmedicineData() {
      this.saveData();
      this.medicineData();
    },

    getReminderTimes() {
      this.timeInputs = []; // Clear the timeInputs array
    if (this.selectedFrequency === 'Once a Day') {
      this.timeInputs.push(this.timeInput1);
    } else if (this.selectedFrequency === 'Twice a Day') {
      this.timeInputs.push(this.timeInput1, this.timeInput2);
    } else if (this.selectedFrequency === 'Three times a Day') {
      this.timeInputs.push(this.timeInput1, this.timeInput2, this.timeInput3);
    }
      console.log(this.timeInputs);
    },

    // New function for medicineData
  medicineData() {
  this.getReminderTimes();
  const reminderTimes = [];

    // Now call this.$nextTick() after updating the array
  this.$nextTick(() => {
    if (this.$refs.timePicker1) {
      reminderTimes.push(this.$refs.timePicker1.value);
    }
    if (this.$refs.timePicker2) {
      reminderTimes.push(this.$refs.timePicker2.value);
    }
    if (this.$refs.timePicker3) {
      reminderTimes.push(this.$refs.timePicker3.value);
    }


  var loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      loggedInUser = JSON.parse(loggedInUser);
    } else {
      console.log ('error, user not loggedin');
    }

    
    console.log ('TING TING IS HERE',loggedInUser.id);
   

/////////////////////////////////////////////////////////////
    const dataObject = {
      userId: loggedInUser.id,
      medicationName: this.$refs.MedName.value,
      medicationCategory: this.selectedCategory,
      frequency: this.selectedFrequency,
      dosageUnit: this.$refs.Unit.innerHTML,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      note: this.$refs.Note.value,
      reminderTimes: JSON.stringify(this.timeInputs),
    };

    console.log('timereminder test', JSON.stringify(this.timeInputs))

    const backendurl = 'http://localhost:8181/medications/create';

    axios
      .post(backendurl, dataObject)
      .then((response) => {
        console.log('Data sent successfully', response);
      })
      .catch((error) => {
        console.log('Data sending failed', error);
      });
  }); // Here
}, //

 watch: {
    selectedFrequency: 'getReminderTimes',
  },

    // pass value to MyMed
     saveData() {
        store.commit('changeToTrue');
        this.$router.push({
              path: '/MyMeds',
              query: {
                MedName: this.$refs.MedName.value,
                Category: this.selectedCategory,
                Frequency:this.selectedFrequency,
                Unit:this.$refs.Unit.innerHTML,
                StartDate: this.selectedStartDate ,
                EndDate: this.selectedEndDate,
                Note: this.$refs.Note.value,
                timeInput1: this.timeInput1,
                timeInput2: this.timeInput2,
                timeInput3: this.timeInput3,
             }
           })
           console.log(this.timeInput1)
           console.log(this.selectedEndDate)

    }},

}


</script>
