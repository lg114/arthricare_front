<!--Edit Med Page -->
<script setup>
  //import store from "@/store";
  import {Plus,Minus} from '@element-plus/icons-vue';
  
</script>
<template>
   <el-container class = "container">
    <div class = "container-flex" style="height:100% ; width:50%">
      <p id = "title">My Meds</p>
    </div>  
      <div id = container2>
        <p id = "label" style = "font-size : 35px ; font-weight:500;" >Edit Medication</p>
        <p id = "label">Medication Name *</p>

        <input ref="MedName" id="MedName" type="text" placeholder="Mecication Name" @keyup="processInput" @focus="toggleOptions"/>

        <div  class="menu" v-if="this.Meds2!==null  && showMed">
          <div ref="MedOption"  class="selected-option" v-for="item in Meds2" :key="item" @click="handleItemClick(item)">{{ item }}</div>
        </div> 

        <p id = "label">Change Category *</p>
        <div>
          <b><label for = "Category" ref = "Category"></label></b>
          <select name="Category" id="Category" class = "row-input" v-model="selectedCategory" >
           <option value="" disabled selected>Select Category *</option>
           <option value="Pill">Pill</option>
           <option value="Tablet">Tablet</option>
           <option value="Injection">Injection</option>
           <option value="Drop">Drop</option>
         </select>
        </div>

        <p id = "label">How often are you taking this medication ? *</p>
        <!-- <input ref = "Frequency" id="input" type="text" placeholder="  " /> -->
        <div>
          <select  ref="Frequency" name="Frequency" id="Frequency" class ="row-input" v-model="selectedFrequency" >
           <option value="" disabled selected>Select Category</option>
           <option value="Once a Day" >Once a Day</option>
           <option value="Twice a Day">Twice a Day</option>
           <option value="Three times a Day">Three times a Day</option>

         </select>

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

        </div>
        <p id = "label">How many units do you take each time ? *</p>
      
        <div class = "calculationPart">
          <el-icon class = "decreaseButton" @click="decreaseCounter"><Minus/></el-icon>
          <div ref = "Unit" class = "number">{{ counter }}</div>
          <el-icon class = "increaseButton" @click="increaseCounter"><Plus /></el-icon>
        </div>
        
        <p id = "label">When did you start taking this medication ? *</p>
        <div id = "date" >
          <VueDatePicker1 ref = "StartDate"  id="selectedStartDate" v-model="selectedStartDate" :format="dateFormat"></VueDatePicker1>
        </div>
        
        <p id = "label" style="margin-top: 50px;">When did you stop taking this medication ? *</p>
        <div id = "date">
          <VueDatePicker2 ref = "EndDate" id="selectedEndDate" v-model="selectedEndDate" :format="dateFormat"></VueDatePicker2>
        </div>

        <p id = "label" style = "margin-top:60px">Add a note ? (Optional)</p>
        <div >
          <textarea  ref="Note" id = "textarea1" name = "Note" column="20" row="20"></textarea>
        </div>
        <div class = "container-flex" style="margin-top:5%">   

        </div>  
          <el-footer class >
              <div class="buttons" >
                  <el-button class = "login-button" @click = "updateMedication">SAVE</el-button> 
              </div>
          </el-footer>
       </div>
  
    </el-container>
</template>
<!---------------------------- Styling ---------------------------->
<style src = "@/css/editMed.css" scoped></style>
<!---------------------------- Styling ---------------------------->
<script>
import VueDatePicker1 from '@vuepic/vue-datepicker';
import VueDatePicker2 from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
//import {ref} from 'vue';

export default {
  components: { VueDatePicker1 , VueDatePicker2},


  computed: {
    changeToTrue() {
      return this.$store.state.changeToTrue;
    },
  },
  created(){
    console.log(this.$route.query.Index);
   // this.medicationId = sessionStorage.getItem('medicationId'); // Fetch and set the medicationId here
  //  this.fetchMedicationDetailsAndPopulateForm(); // Call the method to fetch the medication details
   // console.log('this medid', this.medicationId)
  },
  data() {
    return {
      //medicationId: sessionStorage.getItem('medicationId'), // don
      medicationName: '', // don
      note: '', //don
      reminderTimes: [], //don
      date1: null,
      date2: null,
      counter: 0,
      selectedCategory: null,
      selectedFrequency: null,
      selectedStartDate: null,
      selectedEndDate: null,
      timeInput1: '',
      timeInput2: '',
      timeInput3: '',

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

  // don's code
  mounted() {
    // Fetch the medicationId from sessionStorage
    this.medicationId = sessionStorage.getItem('medicationId');
    console.log('medicationId from sessionStorage:', this.medicationId);

    // Fetch medication details and populate the form
    this.fetchMedicationDetailsAndPopulateForm();

    document.title = "Edit Med | ArthriCare";
  },
  
  methods: {
    increaseCounter() {
      this.counter++;
    },
    decreaseCounter() {
      if (this.counter > 0) {
        this.counter--;
      }
    },
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
      console.log(Med);

    },
    
    toggleOptions() {
      this.showMed = !this.showMed;
      this.$refs.MedName.focus();
    },


    /// test code
     parseTimestampToDateString(timestamp) {
        
        const date = new Date(timestamp);
        
        // 将日期加一天
        date.setDate(date.getDate() + 1);

        // 将日期对象转换为字符串
        return date.toISOString().slice(0, 10);
      },


    populateFormWithMedicationDetails(medicationDetails) {
      /*var dosageUnit = parseFloat(medicationDetails.dosageUnit);
      if (!(dosageUnit % 1 !== 0)) {
        dosageUnit = dosageUnit.toFixed(1);
      }*/
      console.log("Medication Details:", medicationDetails);
      this.$refs.MedName.value = medicationDetails.medicationName;
      this.selectedCategory = medicationDetails.medicationCategory;
      this.selectedFrequency = medicationDetails.frequency;
      this.counter = medicationDetails.dosageUnit;
      this.selectedStartDate = this.parseTimestampToDateString(medicationDetails.startDate);
      this.selectedEndDate = this.parseTimestampToDateString(medicationDetails.endDate);
      console.log(this.parseTimestampToDateString(medicationDetails.startDate))
      this.note = medicationDetails.note;

      this.getReminderTime()
    },


    getReminderTime() {
      axios.get(`http://localhost:8181/reminders/findUniqueReminderTimeByMedicationId/${this.medicationId}`) 
        .then(response => {
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error("Failed to fetch medication details.");
          }
        })
        .then(timeList => {
            console.log(timeList);
            for (let i = 0; i < timeList.length; i++) {
            this[`timeInput${i + 1}`] = timeList[i];
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

    getReminderTimes() {
      this.reminderTimes = []; // Clear the timeInputs array
    if (this.selectedFrequency === 'Once a Day') {
      this.reminderTimes.push(this.timeInput1);
    } else if (this.selectedFrequency === 'Twice a Day') {
      this.reminderTimes.push(this.timeInput1, this.timeInput2);
    } else if (this.selectedFrequency === 'Three times a Day') {
      this.reminderTimes.push(this.timeInput1, this.timeInput2, this.timeInput3);
    }
      console.log(this.timeInputs);
    },

    getFrequencyPickerCount(frequency) {
      switch (frequency) {
        case "Once a Day":
          return 1;
        case "Twice a Day":
          return 2;
        case "Three times a Day":
          return 3;
        // Add more cases as needed for other frequency options
        default:
          return 1; // Default to 1 time picker if frequency is not recognized
      }
    },
    fetchMedicationDetailsAndPopulateForm() {
      axios.get (`http://localhost:8181/medications/${this.medicationId}`) 
        .then(response => {
          if (response.status === 200 ){
            return response.data;
          } else {
            throw new Error("Failed to fetch medication details.");
          }
        })
        .then(data => {
          this.populateFormWithMedicationDetails(data);   
        })
        .catch(error => {
          console.error(error);
        });
    },

    updateMedication() {
      var loggedInUser = sessionStorage.getItem('loggedInUser');
      if (loggedInUser) {
        loggedInUser = JSON.parse(loggedInUser);
      } else {

        console.log ('error. user not logged in')

      }

      this.getReminderTimes();
      // Get updated values from the form fields
      var data = {
        userId: loggedInUser.id,
        medicationId: this.medicationId,
        medicationName: this.$refs.MedName.value,
        medicationCategory: this.selectedCategory,
        frequency: this.selectedFrequency,
        dosageUnit: this.counter,
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate,
        note: this.$refs.Note.value,
        reminderTimes: JSON.stringify(this.reminderTimes),
      };
      console.log(data);
      // Make a PUT request to update the medication
      
      axios.put(`http://localhost:8181/medications/updateMedication`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(response => {
          if (response.status === 200) {
            sessionStorage.removeItem('medicationId');
            // Redirect to home page after successful update
            this.$router.push('/MyMeds');
          } else {
            
            console.log ('error making put request')
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

  },
}
</script>