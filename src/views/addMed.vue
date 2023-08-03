<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import {ArrowLeftBold} from '@element-plus/icons-vue';
  import store from "@/store";
  import {Plus,Minus} from '@element-plus/icons-vue';
  
</script>

<template>
   <el-container class = "container">
      
    <div class = "container-flex" style="height:100% ; width:50% ;">
        <router-link to = "/">
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
                 <el-button class = "login-button" @click = "saveData">ADD</el-button> 
            </div>
         </el-footer>
        <!-- <date-picker v-model:value = "selectedDate"></date-picker> -->
      </div>

    </el-container>
</template>

<style scoped>  

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
          width: 86%;
          line-height: 2rem;
          padding: 2% 2%;
          font-size:99%;
          color:black;
          margin-left:4%;
          font-family: arial;
          margin-top:3%;
        }

       .row-input{
          color: black;
          background-color: #f4f4f4;
          border: 2px solid #f0dddd;
          width: 90%;
          height: 30px;
          border-radius: 5px;
          margin: 3.5px;
          padding-left: 10px;
          outline: none;
          font-size:100%;
          margin-left:4.5%;
          margin-top:3%;
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
          width:92%; 
          height:10px;
        }
        .number{
          display: block;
          float:center;
          background-color: rgb(253, 248, 248);
          bottom: 13%;
          width:1%;
          position:relative;
          font-size:200%;
          color:#1890FF;
          margin-left:12%;
          margin-right:5%;
          
        }
        .increaseButton{
          font-size:180%;
          margin-left:30%;
          color:#1890FF;
          position:relative;
          top:4px;
          
        }

        .decreaseButton{
          font-size:180%;
          margin-right:10%;
          color:#1890FF;
          top:4px;
          position:relative;
        }

        .calculationPart{
          display:flex;
          width:40%;
          height:80%;
          border: 2px solid #1890FF;
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
        background-color: #1890FF;
        overflow: auto;
        flex-direction: column;
        margin: 0 ;
    }

    #container2{
      overflow-y: auto;
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
      position:relative;
      color:#FFFFFF;
      margin:5px;
      left:15%;
      top:13%;
      width:100%;
      padding-top:6.5%;
    }

    #label{   
      width:95%;
      font-weight:600;
      font-size: 85%;
      color:  #1890FF;
      margin-left:4%;
      text-align: left;
      letter-spacing:1px;
      margin-bottom:0%;
      margin-top:5%;
    }

    input{
      align-items: center;
      width:89%;    
      font-size:100%;   
      background-color: white;
      border:none; 
      border-bottom: 3px solid #DDDDDD;
      color: black;
      margin-left:4%;
      letter-spacing:1px;
      margin-bottom:2%;
      margin-top:2%;
    } 
    
    input[type="time"] {
      width:23%;
      padding:2%;
      font-size:100%;
      size:5%;
      margin-left:5%;
      font-family:system-ui;
      margin-top:2%;
      margin-bottom:4%;
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
        right:200%;
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

    .login-button{
        margin-top:5%;
        margin-left:2.5%;
        width: 95%;
        height: 350%;
        margin-bottom: 10px;
        border-radius: 10px;
        font-weight: 700;
        background-color:black;
        font-size:17px;
    }

    .login-button{
      color:white;
      position: relative;
      display: inline-block;
      padding: 10px 20px;
      background-color: transparent;
      background-color:#1890FF;
      border: 2px solid white;
      transition: background-color 0.5s, color 0.5s;
    }

    
        
</style>

<script>
import VueDatePicker1 from '@vuepic/vue-datepicker';
import VueDatePicker2 from '@vuepic/vue-datepicker';
// import DatePicker from 'vue-datepicker-next';
// import 'vue-datepicker-next/index.css';
// import 'vue-datepicker-next/locale/es';

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

      selectedDate: null, 
      counter: 0,
      selectedCategory: "Pill",
      selectedFrequency:  "Once a Day",
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
      console.log(Med);

    },
    
    toggleOptions() {
      this.showMed = !this.showMed;
      this.$refs.MedName.focus();
    },

    getCurrentTime() {
      const now = new Date();
      const formattedTime = now.toISOString().slice(11, 16);
      console.log(formattedTime);
      return formattedTime;
    },

    getCurrentDate() {
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 10);
      console.log(formattedTime);
      return formattedTime;
    },

    // pass value to MyMed
    saveData() {
      // const dataObject = {
      //   Field: this.$refs.Field.value,
      //   MedName: this.$refs.MedName.value,
      //   Category: this.$refs.Category.value,
      //   Frequency:this.$refs.Frequency.value,
      //   StartDate: this.$refs.StartDate.value ,
      //   EndDate: this.$refs.EndDate.value,
      //   Note: this.$refs.Note.value,

      //  };

        //  this.$router.push({
        //       path: '/MyMeds2',
        //       query: {
        //         Field: this.$refs.Field.value,
        //         MedName: this.$refs.MedName.value,
        //         Category: this.$refs.Category.value,
        //     }
        //   });
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
           // this.selectValue();

  
        },
        setup(){
          
            
        }
}


</script>
