<!--Add med page-->
<script setup>
  import store from "@/store";
  import '@varlet/ui/es/button/style/index';
 
  
</script>

<template>
   <el-container class = "container">
      
    <div class = "container-flex" style="height:100% ; width:50% ;">
      <router-link to = "/MyMeds">
        <var-icon class="backBtn" name="chevron-left" :size="42" color="white"/>
      </router-link> 

        <p id= "title">Add Medication</p>
      </div>
      
     <div id = container2>

      <div class = "container3">
        <h1>MEDICATION DETAIL </h1>

        <p id = "label" >Medication Name *</p>
        <input ref="MedName" id="MedName" type="text" placeholder="Mecication Name" @keyup="processInput" @focus="toggleOptions"/>
        
        <div  class="menu" v-if="this.Meds2!==null  && showMed">
          <div ref="MedOption"  class="selected-option" v-for="item in Meds2" :key="item" @click="handleItemClick(item)">{{ item }}</div>
        </div> 


      <div class="container-flex" >
        <div class="container-block"  >
          <p id = "label" >Category *</p>
          <label for = "Category"></label>
          <select style = " height: 48px;width:115% ; margin-right:5px ; padding-left: 13%;padding-top: 1%;padding-bottom: 1%" ref = "Category" name="Category" id="Category" class = "row-input" v-model="selectedCategory">
            <option value="" data-icon="@/assets/capsulesblue.png" alt="ArthriCare Logo" disabled selected>Select Category *</option>
            <option value="Pill" selected>Pill</option>
            <option value="Tablet">Tablet</option>
            <option value="Injection">Injection</option>
            <option value="Drop">Drop</option>
          </select>
        </div>

        <div class="container-block" style="margin-left:9% ;">
          <p id = "label">Dosage *</p>
          <input ref="Unit" style = "width:128% ; height: 66.4%;padding-left:12% " type="number" placeholder="Dosage"  />
        </div>  
    
      </div>

        <p id = "label">Note (Optional)</p>
        <input id="Note" ref="Note" type="text" placeholder="Note"  />

      </div>   


      <div class = "container3">
        <h1>SET REMINDER</h1>

        <p id = "label" >Frequency *</p>
        <div class="Frequency1">
          <select  ref="Frequency" name="Frequency" id="Frequency" class ="row-input" v-model="selectedFrequency" style = "padding-left:5% ">
           <option value="" disabled selected>Select Category</option>
           <option value="Once a Day">Once a day</option>
           <option value="Twice a Day">Twice a day</option>
           <option value="Three times a Day">Three times a day</option>
          </select>
        </div>
        <p id = "label" >Time *</p>
        <div  v-if="selectedFrequency === 'Once a Day'">
          <input type="time" v-model="timeInput1" />
        </div>

        <div v-else-if="selectedFrequency === 'Twice a Day'">
          <input type="time" v-model="timeInput1" />
          <input type="time" v-model="timeInput2" />
        </div>

        <div class="Frequency" v-else-if="selectedFrequency === 'Three times a Day'">
          <input type="time" v-model="timeInput1" />
          <input type="time" v-model="timeInput2" />
          <input type="time" v-model="timeInput3" />
        </div>

        <p id = "label">Start Time *</p>
        <div id = "date" >
          <VueDatePicker1 ref = "StartDate" id="startDate"  v-model="selectedStartDate" :format="dateFormat"></VueDatePicker1>
        </div>
        
        <p id = "label" style="margin-top: 7%;">End Time *</p>
       
          <VueDatePicker2 ref = "EndDate" id="endDate" v-model="selectedEndDate" :format="dateFormat"></VueDatePicker2>

        <div class = "container-flex" style="margin-top:10%">   
      </div>   
        </div>  
        <el-footer class >
            <div class="buttons" >
                 <el-button class = "login-button" @click = "saveDataAndmedicineData">ADD</el-button> 
            </div>
         </el-footer> 
      </div>

    </el-container>
</template>

<style lang = "css" scoped> 
    .Frequency{
      width:107%;
    }

/* scoped src="@/style/addMed.css" */
    h1{
      color:#55BBC9;
      font-size:17px;
      font-family: system-ui;
    }
    .container3{
      border: 1px solid #eceff1;
      padding-left:5%;
      padding-right:5%;
      margin:5%;
      background-color: #ffffff;
      padding-bottom:5%;
    }
    .calculationPart{
      display:flex;
      width:40%;
      height:100%;
      margin-left:20%;
      border: 4px solid #1890FF;
      border-radius:10px 10px 10px 10px;
      margin:0;
      padding:0;
}
.buttons{
  height:30%;
  width:100%;
}

#textarea1{
  background-size: 100% 4rem;
  border: 1px solid  #DDDDDD;
  width: 96%;
  padding: 2% ;
  font-size:99%;
  color:black;
  font-family: arial;
  margin-top:3%;
  height:10px;
}

.row-input{
  color: black;
  background-color: white;
  border: 1px solid #ccdde9;
  width: 100.5%;
  height: 20%;
  border-radius: 5px;
  padding-left: 2%;
  outline: none;
  font-size:100%;
  margin-top:3%;
  position:relative;
  z-index: 1;
  padding-bottom:5%;
  padding-top:5%;
}
select{
  appearance: none;
}
.container-flex{
  display:flex;
  z-index: 1;
}

.container-block{
  display:inline-block;
  width:40%;
  
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
  background-color:#56569D;
  text-align: center;
  color:white;
  cursor: pointer;
  
}
.note:hover{
  background-color: grey;
}

#date{
  margin-top: 2%; 
  width:100.5%; 
}
.number{
  display: block;
  float:center;
  background-color: rgb(253, 248, 248);
  bottom: 13%;
  width:1%;
  position:relative;
  font-size:200%;
  color:#0b437a;
  margin-left:12%;
  margin-right:5%;
  
}
.increaseButton{
  font-size:180%;
  margin-left:30%;
  color:#56569D;
  position:relative;
  top:4px;
  
}

.decreaseButton{
  font-size:180%;
  margin-right:10%;
  color:#9F9FC8;
  top:4px;
  position:relative;
}

.calculationPart{
  display:flex;
  width:40%;
  height:80%;
  border: 2px solid#9F9FC8;
  /* border: 2px solid #1890FF; */
  border-radius:10px;
  justify-content: center;
  padding-left:10%;
  padding-right:10%;
  margin-left:17%;
  margin-top:5%;
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
    width: 50%;
    text-align: center;
    transition-duration: 0.6s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    left:20%;
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
  overflow-y: auto;
  display: flex;
  align-items: center;
  height: 100%;
  width:100%;
  background-color:#55BBC9;
  overflow: auto;
  flex-direction: column;
  margin: 0 ;
  }

#container2{
  overflow-y: auto;
  padding-left:auto;
  padding-right:auto;
  align-items: center;
  background-color: rgb(251, 251, 255);
  height:200%;
  width:100%;
  padding-bottom:100px;
  justify-content: center;
  align-items: center;
  display:inline-block;
  }

#title{
  font-size: 100%;
  position:relative;
  color:#FFFFFF;
  font-family: system-ui;
  top:13%;
  width:150%;
  padding-top:6.5%;
  }

#label{   
  width:95%;
  font-weight:600;
  font-size: 85%;
  color:  #787885;
  text-align: left;
  margin-bottom:0%;
  margin-top:4%;
  font-family: system-ui;
  margin-left:8px;
  }

input{
  align-items: center;
  width:100%;    
  font-size:90%;   
  background-color: white;
  border:none; 
  border : 1px solid #ccdde9;
  color: black;

  margin-bottom:2%;
  margin-top:2%;
  padding:5%;
  border-radius: 5px;
  font-family: system-ui;
  box-sizing: border-box;
  } 

input[type="time"] {
  width:30%;
  height:50px;
  padding:2%;
  padding-left:3%;
  font-size:100%;
  size:5%;
  font-family:system-ui;
  padding-top:1%;
  margin-top:1.5%;
  position:relative;
  margin-right:2%;
  }

  input:focus
  { 
  outline-style: none;
  border-bottom: 1px solid #b5b7c2;
  }

  .backBtn{
    color:#FFFFFF;
    position:relative;
    right:150%;
    top:30%;
    }

.menu {
  display: inline-block;
  position:absolute;
  top:25%;
  right:40%;
  height:auto;
  width:50%;
  }

.selected-option {
  width: 120%;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid white;
  color:#008866;
  font-size:50%;
  letter-spacing:1px;
  position: relative;
  z-index: 3;
  }

.login-button{
  margin-top:5%;
  margin-left:2.5%;
  width: 95%;
  height: 350%;
  margin-bottom: 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size:17px;
  }

.login-button{
  color:white;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  background-color: transparent;
  background-color:#55BBC9;
  border: 2px solid white;
  transition: background-color 0.5s, color 0.5s;
  }

option {
  padding-left: 20px;
  background-image: url("@/assets/capsulesblue.png");
  background-repeat: no-repeat;
  }
</style>
<!-- ----------------------------------------------------------------------------------->
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
      timeInput1: this.getCurrentTime(),
      timeInput2: this.getCurrentTime(),
      timeInput3: this.getCurrentTime(),

      /// don's Edit
      timeInputs:[],

      selectedDate: null, 
      counter: 0,
      selectedCategory: null,
      selectedFrequency: null,
      selectedStartDate: this.getCurrentDate(),
      selectedEndDate: this.getCurrentDate(),

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

    
    console.log ('DON IS HERE',loggedInUser.id);
   

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
    console.log("looking inside dataobject:", dataObject);

    const backendurl = 'http://localhost:8181/medications/create';

    axios
      .post(backendurl, dataObject)
      .then((response) => {
        console.log('Data sent successfully', response);
      })
      .catch((error) => {
    console.log('Data sending failed', error);
    console.log('Response data:', error.response.data);
                    });
  }); // Here
}, //

// added from jihao 21/08/23
getCurrentTime() {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      console.log(formattedTime);
      return formattedTime;
    },

    getCurrentDate() {
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 10);
      console.log(formattedTime);
      return formattedTime;
    },


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

    mounted(){
            document.title = 'Add Medication';
        },
        setup(){
        
        }
}
</script>
