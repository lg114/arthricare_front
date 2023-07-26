<!--add med Page -->
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
        <input id="Add" type="text" placeholder="*Required Field" style = "width:50%"/><br>
        <p id = "label">MEDICATION NAME</p>
        <input id="MedName" type="text" placeholder="" />
        <p id = "label">CHANGE CATEGORY</p>

        <div class = "input-row">
          <b><label for = "Category"></label></b>
          <select name="Category" id="Category" class = "row-input" v-model="Category">
           <option value="" disabled selected>Select Category</option>
           <option value="Pill">Pill</option>
           <option value="Tablet">Tablet</option>
           <option value="Injection">Injection</option>
           <option value="Drop">Drop</option>
         </select>
        </div>

        <p id = "label">HOW OFTEN ARE YOU TAKING THIS MEDICATION?</p>
        <input id="input" type="text" placeholder="  " />
        <p id = "label">HOW MANY UNITS DO YOU TAKE EACH TIME?</p>

        <div class = "container-flex">
          <div class="IncreaseButton" @click="increaseCounter">+</div>
          <div class = "number">{{ counter }}</div>
          <div class="DecreaseButton" @click="decreaseCounter">-</div>
        </div>
        
        <p id = "label">WHEN DID YOU START TAKING THIS MEDICATION?</p>
        <div id = "date" >
          <VueDatePicker1 id="date1" v-model="date1"></VueDatePicker1>
        </div>
        
        <p id = "label" style="margin-top: 50px;">WHEN DID YOU STOP TAKING THIS MEDICATION?</p>
        <div id = "date">
          <VueDatePicker2 id="date2" v-model="date2"></VueDatePicker2>
        </div>

        <p id = "label" style = "margin-top:60px">ADD A NOTE ? (optional)</p>
        <div >
          <textarea id = "textarea1" name = "Note" column="20" row="20"></textarea>
        </div>
        <div class = "container-flex" style="margin-top:5%">

          <div class = "note">Reminder
            </div>   


        </div>  
        <div class="Button" >
           Next
        </div>
      </div>

    </el-container>
</template>

<style scoped>

        #textarea1{
          background-image: linear-gradient(#F1F1F1 50%, #F9F9F9 50%);
          background-size: 100% 4rem;
          border: 1px solid #CCC;
          width: 90%;
          line-height: 2rem;
          padding: 2% 2%;
          font-size:20px;
          color:#1890FF;
          font-weight:bold;
          margin-left:2%;
        }

       .row-input{
          color: #1890FF;
          background-color: #f4f4f4;
          border: 2px solid #f0dddd;
          width: 150px;
          height: 40px;
          border-radius: 10px;
          margin: 3.5px;
          padding-left: 10px;
          outline: none;
          font-size:100%;
          font-weight:bold;
        }

        .container-flex{
          display:flex;
        }

        
        .note{
          position:relative;
          width:130px ; 
          height:30px;
          top:7%;
          left:2%;
          font-size:20px;
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
          display: block;
          float:center;
          padding: 10px;
          background-color: rgb(253, 248, 248);
          margin-bottom: 10px;
          width:50px;
          height:50px;
          position:relative;
          font-size:35px;
          text-align: center;
          border: 4px solid #1890FF;
          border-radius:10px 10px 10px 10px;
          color:#1890FF;
          margin-left:70px;
          
        }

      .IncreaseButton {
        text-align: center;
        display: block;
        cursor: pointer;
        padding: 10px;
        background-color: rgb(253, 248, 248);
        margin-bottom: 10px;
        width:40px;
        height:40px;
        position:relative;
        font-size: 30px;
        border-radius:10px 10px 10px 10px;
        border: 2.5px solid #a39e9e;
        color: #a19191;
        margin-top:10px;
        margin-left:20px;

      }

      .DecreaseButton {
        color: #a19191;
        text-align: center;
        float:right;
        display: block;
        cursor: pointer;
        padding: 10px;
        background-color: rgb(253, 248, 248);
        margin-bottom: 10px;
        width:40px;
        position:relative;
        font-size: 30px;
        border-radius:10px 10px 10px 10px;
        border: 2.5px solid #a39e9e;
        margin-left:70px;
        height:40px;
        margin-top:10px;
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
            font-size: 35px;
            color: #ffffff;
            padding: 0px;
            width: 50%;
            text-align: center;
            transition-duration: 0.6s;
            text-decoration: none;
            overflow: hidden;
            cursor: pointer;
            left:22%;
            border-radius:10px 10px 10px 10px; 
            height: 5%;
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
        margin-top:4%;
        background-color: rgb(253, 253, 253);
        height:200%;
        width:100%;
        border-radius:10px 10px 0px 0px;
        padding-bottom:100px;
        justify-content: center;
        align-items: center;
        display:inline-block;
    }

    #title{
      font-size: 40px;
      position: relative;
      color:#FFFFFF;
      margin:5px;
      right:5%;
    }

    #label{   
      width:80%;
      font-weight:bold;
      font-size: 100%;
      color:  #1890FF;
      margin-left:2%;
      margin-bottom:25px;
      text-align: left;
    }

    input{
      align-items: center;
      width:90%;    
      height: 4%;    
      font-size:150%;    
      background-color: white;
      margin:auto;
      border:none; 
      border-bottom: 3px solid #f0dddd;
      color: #008866;
      margin-left:2%;
    } 

    input:focus
    { 
      outline-style: none;
      border-bottom: 3px solid #c2b5b5;
    }

    .backBtn{
        font-size: 30px;
        color:#FFFFFF;
        position:relative;
        margin-top:60%;
        right:300%;
    }

    .menu {
      position: relative;
      display: inline-block;
    }

    
        
</style>

<script>
import VueDatePicker1 from '@vuepic/vue-datepicker';
import VueDatePicker2 from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref} from 'vue';

export default {
  components: { VueDatePicker1 , VueDatePicker2},
  data() {
    return {
      date1: null,
      date2: null,
      counter: 0,

      category: [
        { id: 1, title: 'Pill' },
        { id: 2, title: 'Tablet' },
        { id: 3, title: 'Injection' },
        { id: 4, title: 'Drop' }
      ],
      selectedCategory: null,
      showCategory: false,

      selectedUnit: null,
      showUnit: false,


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
    handleItemClick(category) {
      this.selectedCategory = category;
      this.showCategory = false;
    },
    toggleOptions() {
      this.showCategory = !this.showCategory;
    }

    
    
  },
  mounted(){
            document.title = 'Sign Up | ArthriCare';
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