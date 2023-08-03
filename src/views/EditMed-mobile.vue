<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import {ArrowLeftBold} from '@element-plus/icons-vue';

  
</script>
<template>
   <el-container class = "container">
   
    <div class = "container-flex">
      <router-link to = "/">
         <el-icon class = "backBtn"><ArrowLeftBold/></el-icon>
      </router-link>
      <p id = "title">My Meds</p>
    </div>  
      <div id = container2>
        <p id = "label" style = "font-size : 35px ; font-weight:500;" >Edit Medication</p>
       <input id="Add" type="text" placeholder="Required Field*" ref = "Field" style = "width:50%"/><br>  
        <p id = "label">MEDICATION NAME</p>

        <input ref="MedName" id="MedName" type="text" placeholder=""/>

        <div  class="menu" v-if="this.Meds2!==null  && showMed">
          <div ref="MedOption"  class="selected-option" v-for="item in Meds2" :key="item" @click="handleItemClick(item)">{{ item }}</div>
        </div> 

        <p id = "label">CHANGE CATEGORY</p>
        <div>
          <b><label for = "Category" ref = "Category"></label></b>
          <select v-model="selectedCategory" name="Category" id="Category" class = "row-input" >
           <option value="" disabled selected>Select Category</option>
           <option value="Pill">Pill</option>
           <option value="Tablet">Tablet</option>
           <option value="Injection">Injection</option>
           <option value="Drop">Drop</option>
         </select>
        </div>

        <p id="label">HOW OFTEN ARE YOU TAKING THIS MEDICATION?</p>
<div>
  <select ref="Frequency" name="Frequency" id="Frequency" class="row-input" v-model="selectedFrequency">
    <option value="" disabled selected>Select Category</option>
    <option value="Once a Day">Once a Day</option>
    <option value="Twice a Day">Twice a Day</option>
    <option value="Three times a Day">Three times a Day</option>
  </select>
</div>

        <!-- Conditionally render time pickers based on selectedFrequency -->
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
        <div id="timePickersContainer"></div>

        <p id = "label">HOW MANY UNITS DO YOU TAKE EACH TIME?</p>

        <div class = "container-flex">
          <div class="IncreaseButton" @click="increaseCounter">+</div>
          <div ref = "Unit" class = "number">{{ counter }}</div>
          <div class="DecreaseButton" @click="decreaseCounter">-</div>
        </div>
        
        <p id = "label">WHEN DID YOU START TAKING THIS MEDICATION?</p>
        <div id = "date" >
          <VueDatePicker1 ref = "StartDate"  id="selectedStartDate" v-model="selectedStartDate"></VueDatePicker1>
        </div>
        
        <p id = "label" style="margin-top: 50px;">WHEN DID YOU STOP TAKING THIS MEDICATION?</p>
        <div id = "date">
          <VueDatePicker2 ref = "EndDate" id="selectedEndDate" v-model="selectedEndDate"></VueDatePicker2>
        </div>

        <p id = "label" style = "margin-top:60px">ADD A NOTE ? (optional)</p>
        <div >
          <textarea  ref="Note" id = "textarea1" name = "Note" column="20" row="20"></textarea>
        </div>
        <div class = "container-flex" style="margin-top:5%">   

        </div>  
        <div class="Button" path="/MyMeds2" @click="updateMedication" >
           Save
        </div>
      </div>

    </el-container>
</template>

<style scoped>
    
        #textarea1{
          background-image: linear-gradient(#F1F1F1 50%, #F9F9F9 50%);
          background-size: 100% 4rem;
          border: 1px solid #CCC;
          width: 85%;
          line-height: 2rem;
          padding: 2% 2%;
          font-size:20px;
          color:black;;
          font-weight:bold;
          margin-left:4%;
          font-family:custom;
        }

       .row-input{
          color: #1890FF;
          background-color: #f4f4f4;
          border: 2px solid #f0dddd;
          width: 45%;
          height: 30px;
          border-radius: 5px;
          margin: 3.5px;
          padding-left: 10px;
          outline: none;
          font-size:100%;
          font-weight:bold;
          margin-left:4.5%;
        }

        .container-flex{
          display:flex;
        }

        .BellBtn{
          font-size: 30px;
          color: #1890FF;
          position:relative;
          margin-left:60%;
          size:40%;
      }
        
        .note{
          position:relative;
          width:130px ; 
          height:30px;
          top:7%;
          left:2%;
          font-size:110%;
          border-radius:10px 10px 10px 10px;
          background-color: #1890FF;
          text-align: center;
          color:white;
          cursor: pointer;
        }
        .note:hover{
          background-color: grey;
        }

        #date{
          margin-left: 3%;
          margin-top: 10px; 
          width:90%; 
          height:10px;
        }
        .number{
          z-index: 9;
          display: block;
          float:center;
          padding: 10px;
          background-color: rgb(253, 248, 248);
          margin-bottom: 6%;
          margin-top: 6%;
          width:40px;
          height:40px;
          position:relative;
          font-size:35px;
          text-align: center;
          border: 4px solid #1890FF;
          border-radius:10px 10px 10px 10px;
          color:#1890FF;
          margin-left:12%;
          margin-right:5%;
          
        }

      .IncreaseButton {
        text-align: center;
        display: block;
        cursor: pointer;
        padding: 1%;
        background-color: rgb(253, 248, 248);
        margin-bottom: 10px;
        width:40px;
        height:40px;
        position:relative;
        font-size:200%;
        border-radius:10px 10px 10px 10px;
        border: 2.5px solid #a39e9e;
        color: #a19191;
        margin-top:7%;
        margin-left:8%;

      }

      .DecreaseButton {
        text-align: center;
        display: block;
        cursor: pointer;
        padding: 1%;
        background-color: rgb(253, 248, 248);
        margin-bottom: 10px;
        width:40px;
        height:40px;
        position:relative;
        font-size:200%;
        border-radius:10px 10px 10px 10px;
        border: 2.5px solid #a39e9e;
        color: #a19191;
        margin-top:7%;
        margin-left:8%;

      }
      .unitButton{
        color: #a19191;
        text-align: center;
        float:right;
        display: block;
        cursor: pointer;
        padding: 10px;
        background-color: rgb(253, 248, 248);
        width:45px;
        position:relative;
        font-size: 15px;
        border-radius:10px 10px 10px 10px;
        border: 2px solid #a39e9e;
        height:8px;
        bottom:3%;
        right:49%;
        
      }

      #counter {
        font-size: 24px;
        text-align: center;
      }
        .Button{
            position: relative;
            background-color: #1890FF;
            border: none;
            font-size:130%;
            color: #ffffff;
            padding: 0px;
            width: 70%;
            text-align: center;
            transition-duration: 0.6s;
            text-decoration: none;
            overflow: hidden;
            cursor: pointer;
            left:15%;
            border-radius:10px 10px 10px 10px; 
            height: 4%;
            margin-top:40px;
            line-height: -50px;
        }

        .Button::after{
            content: '';
            background:#53a4f0;
            display: block;
            position: absolute;
            padding-top: 300%;
            padding-left: 350%;
            margin-left: -20px ;
            margin-top: -120%;
            opacity: 0;
            transition:all 0.8s;
        }
        .Button:active::after{
            padding: 0;
            margin: 0;
            opacity: 1;
            transition: 0s;
        }

    .container{
        display: flex;
        align-items: center;
        height: 100vh;
        width:100%;
        background-color: #1890FF;
        overflow: auto;
        flex-direction: column;
        margin: 0 ;
    }

    #container2{
        padding-left:auto;
        padding-right:auto;
        align-items: center;
        margin-top:6%;
        background-color: rgb(253, 253, 253);
        height:200%;
        width:100%;
        padding-bottom:100px;
        justify-content: center;
        align-items: center;
        display:inline-block;
    }

    #title{
      font-size: 130%;
      position: relative;
      color:#FFFFFF;
      margin:5px;
      right:9%;
      top:30%;
    }

    #label{   
      width:95%;
      font-weight:600;
      font-size: 20%;
      color:  #1890FF;
      margin-left:4%;
      margin-bottom:2%;
      margin-top:2%;
      text-align: left;
      letter-spacing:1px;
    }

    input{
      align-items: center;
      width:80%;    
      height: 4%;    
      font-size:100%;    
      background-color: white;
      margin:auto;
      border:none; 
      border-bottom: 3px solid #DDDDDD;
      color: #008866;
      margin-left:5%;
      letter-spacing:1px;
      
    } 

    input:focus
    { 
      outline-style: none;
      border-bottom: 3px solid #c2b5b5;
    }

    .backBtn{
        font-size: 25px;
        color:#FFFFFF;
        position:relative;
        margin-top:80%;
        right:350%;
    }

    .menu {
      display: inline-block;
      left:4%;
      position:relative;
    }

    .selected-option {

      width: 120%;
      padding: 10px;
      background-color: #f4f4f4;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid white;
      color:#008866;
      font-size:17px;
      letter-spacing:1px;
    }


    
        
</style>

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
    showResult() {
      if (this.$refs.MedName.value === "") {
        this.Meds2 = this.Meds;
        console.log(this.Meds2);
      } else {
        const filteredWordsStartingWithLetters = this.filterWordsByLetter(this.Meds, this.$refs.MedName.value);
        this.Meds2 = filteredWordsStartingWithLetters;
        console.log(this.Meds2);
      }
    },
    getResult() {
      const filteredWordsStartingWithLetters = this.filterWordsByLetter(this.words, this.$refs.MedName.value);
      return filteredWordsStartingWithLetters;
    },
    processInput(event) {
      if (event.keyCode !== 13) {
        this.showResult();
      }
    },
    handleItemClick(Med) {
      this.selectedMed = Med;
      this.showMed = false;
      this.$refs.MedName.value = Med;
      this.$refs.MedName.blur();
      this.Meds2 = this.getResult();
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

      // Get updated values from the form fields
      var updatedMedication = {
        userId: loggedInUser.id,
        medicationId: this.medicationId,
        medicationName: this.medicationName,
        medicationCategory: this.selectedCategory,
        frequency: this.selectedFrequency,
        dosageUnit: this.counter,
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate,
        note: this.note,
        reminderTimes: JSON.stringify(this.reminderTimes),
      };

      // Make a PUT request to update the medication
      axios.put(`http://localhost:8181/medications/updateMedication`, updatedMedication, {
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(response => {
          if (response.status === 200) {
            sessionStorage.removeItem('medicationId');
            // Redirect to home page after successful update
            this.$router.push('/MyMeds2');
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