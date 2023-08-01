<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import {ArrowLeftBold} from '@element-plus/icons-vue';
  import store from "@/store";
  
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

        <p id = "label">HOW OFTEN ARE YOU TAKING THIS MEDICATION?</p>
        <!-- <input ref = "Frequency" id="input" type="text" placeholder="  " /> -->
        <div>
          <select  ref="Frequency" name="Frequency" id="Frequency" class ="row-input" v-model="selectedFrequency" >
           <option value="" disabled selected>Select Category</option>
           <option value="Every Day">EveryDay</option>
           <option value="everyTwoDays">EveryTwoDays</option>
           <option value="Once a week">Once a week</option>
           <option value="Twice a week">Twice a week</option>
           <option value="Few times a week">Few times a week</option>
         </select>
        </div>
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
    console.log(this.$route.query.Index)
  },
  data() {
    return {
      date1: null,
      date2: null,
      counter: 0,
      selectedCategory: null,
      selectedFrequency: null,

      selectedStartDate: null,
      selectedEndDate: null,
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
    EditInputValue() {
      store.commit('changeToTrue');
      const arrayIndex = parseInt(this.$route.query.Index, 10);

      if (store.state.MedArray[arrayIndex] !== undefined) {
        console.log(arrayIndex);
        this.$refs.Field.value = store.state.MedArray[arrayIndex].Field;
        this.$refs.MedName.value = store.state.MedArray[arrayIndex].MedName;
        this.selectedCategory = store.state.MedArray[arrayIndex].Category;
        this.selectedFrequency = store.state.MedArray[arrayIndex].Frequency;
        this.counter = store.state.MedArray[arrayIndex].Unit;
        this.selectedStartDate = store.state.MedArray[arrayIndex].StartDate;
        this.selectedEndDate = store.state.MedArray[arrayIndex].EndDate;
        this.$refs.Note.value = store.state.MedArray[arrayIndex].Note;

        console.log("good");
      } else {
        console.log('Do not have this object in array');
      }
    },
    async updateMedication() {
      var loggedInUser = sessionStorage.getItem('loggedInUser');
      if (loggedInUser) {
        loggedInUser = JSON.parse(loggedInUser);
      } else {
        console.log('error, user not loggedin');
      }

      const arrayIndex = parseInt(this.$route.query.Index, 10);
      const dataObject = {
        userId: loggedInUser.id,
        medicationName: this.$refs.MedName.value,
        medicationCategory: this.selectedCategory,
        frequency: this.selectedFrequency,
        dosageUnit: this.counter,
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate,
        note: this.$refs.Note.value,
        //reminderTimes: JSON.stringify(this.timeInputs),
      };

      try {
        // Send the updated dataObject to the backend using axios PUT request
        const response = await axios.put(`http://localhost:8181/medications/updateMedication`, dataObject);
        console.log(response.data);

        // Update the store with updated dataobject
        store.state.MedArray[arrayIndex] = dataObject;

        // Redirect to mymeds
        this.$router.push({ path: '/MyMeds2' });
      } catch (error) {
        console.error('error updating', error);
      }
    }
  }
}
</script>