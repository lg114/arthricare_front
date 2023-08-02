<script setup>
  import {ArrowLeftBold} from '@element-plus/icons-vue';
  import store from "@/store";
  
</script>
<template>
   <el-container class = "container">
    <div class = "container-flex">
      <router-link to = "/MyMeds">
         <el-icon class = "backBtn"><ArrowLeftBold/></el-icon>
      </router-link>
      <p id = "title">My Meds</p>
    </div>  
      <div id = container2>
        <p id = "label" style = "font-size : 35px ; font-weight:500;" >Edit Medication</p>
        <p id = "label">MEDICATION NAME</p>

        <input ref="MedName" id="MedName" type="text" placeholder="" @keyup="processInput" @focus="toggleOptions"/>

        <div  class="menu" v-if="this.Meds2!==null  && showMed">
          <div ref="MedOption"  class="selected-option" v-for="item in Meds2" :key="item" @click="handleItemClick(item)">{{ item }}</div>
        </div> 

        <p id = "label">CHANGE CATEGORY</p>
        <div>
          <b><label for = "Category" ref = "Category"></label></b>
          <select name="Category" id="Category" class = "row-input" v-model="selectedCategory" >
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
           <option value="Once a Day">Once a Day</option>
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
        <p id = "label">HOW MANY UNITS DO YOU TAKE EACH TIME?</p>

        <div class = "container-flex">
          <div class="DecreaseButton" @click="decreaseCounter">-</div>
          <div ref = "Unit" class = "number">{{ counter }}</div>
          <div class="IncreaseButton" @click="increaseCounter">+</div>
        </div>
        
        <p id = "label">WHEN DID YOU START TAKING THIS MEDICATION?</p>
        <div id = "date" >
          <VueDatePicker1 ref = "StartDate"  id="selectedStartDate" v-model="selectedStartDate" :format="dateFormat"></VueDatePicker1>
        </div>
        
        <p id = "label" style="margin-top: 50px;">WHEN DID YOU STOP TAKING THIS MEDICATION?</p>
        <div id = "date">
          <VueDatePicker2 ref = "EndDate" id="selectedEndDate" v-model="selectedEndDate" :format="dateFormat"></VueDatePicker2>
        </div>

        <p id = "label" style = "margin-top:60px">ADD A NOTE ? (optional)</p>
        <div >
          <textarea  ref="Note" id = "textarea1" name = "Note" column="20" row="20"></textarea>
        </div>
        <div class = "container-flex" style="margin-top:5%">   

        </div>  
        <div class="Button" path="/MyMeds" @click="ReplaceObjectIntoArray" >
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
          margin-top:3%;
        }

        .container-flex{
          display:flex;
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

      .backBtn{
        font-size: 30px;
        color:#FFFFFF;
        position: absolute;
        left:20px;
      top:10px;
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
import '@vuepic/vue-datepicker/dist/main.css'
import {ref} from 'vue';

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
      dateFormat: 'yyyy-MM-dd',

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

    EditInputValue(){
      store.commit('changeToTrue');
      const arrayIndex = parseInt(this.$route.query.Index, 10);
      if (store.state.MedArray[arrayIndex]!== null) {
          console.log(arrayIndex);
          this.$refs.MedName.value = store.state.MedArray[arrayIndex].MedName,
          this.selectedCategory = store.state.MedArray[arrayIndex].Category,
          this.selectedFrequency = store.state.MedArray[arrayIndex].Frequency,
          this.$refs.Unit.innerHTML = store.state.MedArray[arrayIndex].Unit,
          this.selectedStartDate = store.state.MedArray[arrayIndex].StartDate,
          this.selectedEndDate = store.state.MedArray[arrayIndex].EndDate,
          this.$refs.Note.value = store.state.MedArray[arrayIndex].Note,
          this.timeInput1 = store.state.MedArray[arrayIndex].timeInput1,
          this.timeInput2 = store.state.MedArray[arrayIndex].timeInput2,
          this.timeInput3 = store.state.MedArray[arrayIndex].timeInput3;
          console.log(store.state.MedArray[arrayIndex].timeInput1);
        }else{
          console.log('Do not have this object in array')
        }
    },

    ReplaceObjectIntoArray(){
      
      const arrayIndex = parseInt(this.$route.query.Index, 10);
      const dataObject = {
            MedName: this.$refs.MedName.value,
            Category:  this.selectedCategory,
            Frequency: this.selectedFrequency,
            Unit: this.$refs.Unit.innerHTML,
            StartDate:   this.selectedStartDate ,
            EndDate:  this.selectedEndDate ,
            Note:  this.$refs.Note.value ,
            timeInput1 : this.timeInput1,
            timeInput2 : this.timeInput2,
            timeInput3 : this.timeInput3,
          }
            store.state.MedArray[arrayIndex] = dataObject;
            console.log(store.state.MedArray[0].MedName)
            console.log(store.state.MedArray[arrayIndex].MedName)
            this.$router.push({
              path: '/MyMeds',
          
           })
          
    }
  },
 
  mounted(){
            document.title = 'Edit Med | ArthriCare',
            this.EditInputValue();
        },
        
        setup(){
            const name = ref('');
            const selectedAge = ref('');
            const gender = ref('');
            const selectedWeight = ref('');
            const email = ref('');
            const password = ref('');

            const generateAgeOptions = (start, end) => {
            const options = [];
            for (let i = start; i <= end; i++) {
                options.push(i.toString());
            }
            return options;
            };

            const generateWeightOptions = (start, end) => {
            const options = [];
            for (let i = start; i <= end; i++) {
                options.push(i.toString());
            }
            return options;
            };

            return {
              name,
              selectedAge,
              gender,
              selectedWeight,
              email,
              password,
              ageOptions: generateAgeOptions(10, 100),
              weightOptions: generateWeightOptions(35, 200),
            };
        }
        
}


</script>