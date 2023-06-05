<!--Welcome Page -->
<script setup>
  import {ArrowLeftBold} from '@element-plus/icons-vue';
</script>
<template>
   <el-container class = "container">
      <p id = "title">My Meds</p>
      <router-link to = "/">
         <el-icon class = "backBtn"><ArrowLeftBold/></el-icon>
    </router-link>
      <div id = container2>
        <p id = "label" style = "font-size : 35px ; font-weight:500;" >Add Medication</p>
        <input id="input" type="text" placeholder="*Required field" v-model="email" style = "width:130px"/><br>
        <p id = "label">MEDICATION NAME</p>
        <input id="input" type="text" placeholder="" v-model="email"/>
        <p id = "label">ADD CATEGORY</p>
        <select style = "width:230px;height: 40px;">
          <option value="Pill">Pill</option>
          <option value="Tablet" >Tablet</option>
          <option value="Injection">Injection</option>
          <option value="Drop">Drop</option>
        </select>
        <p id = "label">HOW OFTEN ARE YOU TAKING THIS MEDICATION?*</p>
        <input id="input" type="text" placeholder="eg. Once a week" v-model="email"/>
        <p id = "label">HOW MANY UNITS DO YOU TAKE EACH TIME?*</p>

        <div class="IncreaseButton" @click="increaseCounter">+</div>
        <div class = "number">{{ counter }}</div>
        <div class="DecreaseButton" @click="decreaseCounter">-</div>
        
        <p id = "label">WHEN DID YOU START TAKING THIS MEDICATION?</p>
        <div id = "date" >
          <VueDatePicker1 id="date1" v-model="date1"></VueDatePicker1>
        </div>

        <p id = "label" style="margin-top: 50px;">WHEN DID YOU STOP TAKING THIS MEDICATION?*</p>
        <div id = "date">
          <VueDatePicker2 id="date2" v-model="date2"></VueDatePicker2>
        </div>
        
        <div class = "note">
          Add a note
        </div>
        <div class="Button">
           Next
        </div>

      </div>

    </el-container>
</template>

<style scoped>

        .note{
          position:relative;
          width:130px ; 
          height:30px;
          top:7%;
          left:5%;
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
          margin-left: 15px;
          margin-top: 10px; 
          width:450px ; 
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
          font-size:40px;
          text-align: center;
          margin:none;
          border: 4px solid #1890FF;
          border-radius:10px 10px 10px 10px;
          color:#1890FF;
          margin:auto;
          right:5%;
          bottom:5%;
          
          
        }
      .IncreaseButton {
        margin:auto;
        text-align: center;
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
        color: #a19191;
        margin:auto;
        right:25%;
        top:3%;

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
        right:28%;
        font-size: 30px;
        border-radius:10px 10px 10px 10px;
        border: 2.5px solid #a39e9e;
        bottom:9.5%;
      
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
            background-color: rgb(32, 93, 224);
            border: none;
            font-size: 35px;
            color: #ffffff;
            padding: 0px;
            width: 350px;
            text-align: center;
            transition-duration: 0.6s;
            text-decoration: none;
            overflow: hidden;
            cursor: pointer;
            top:6%;
            left:15%;
            border-radius:10px 10px 10px 10px; 
            height: 60px;
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
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #1890FF;
        overflow: auto;
    }

    #container2{
        display: flex;
        justify-content:bottom;
        align-items: center;
        background-color: rgb(253, 253, 253);
        bottom: 0;
        position:relative;
        overflow: auto;
        height:1100px;
        width: 500px;
        top:5%;
        padding:0px;
        flex-direction: column;
        display: inline-block;
        margin-right: 900px;
        border-radius:10px 10px 10px 10px;
        
    }

    #title{
      margin-left: auto;
      justify-content:top;
      font-size: 30px;
      position:relative;
      bottom:45%;
      left:12%;
      position: relative;
      color:#FFFFFF;
    }

    #label{
      font-style: normal;
      color:  #1890FF;
      margin-left:10px;
      font-size: 18px;
      margin-bottom:25px;
    }

    input{
      display: inline-block;    
      width: 440px;    
      height: 30px;    
      font-size: 20px;    
      background-color: white;
      margin-left:10px;
      margin-top:5px;
      border:none; 
      border-bottom: 3px solid #f0dddd;
      color: #008866;
    } 

    input:focus
    { 
      outline-style: none;
      border-bottom: 3px solid #c2b5b5;
    }

    select{
      border:0;
      margin-left:10px;
      border-bottom: 3px solid #c2b5b5;
      border-color:  grey;
      width: 200px;
      font-size: 20px;
      font-weight:bold;
     }

     
    select:focus{
      background-color: rgb(253, 248, 248);
      outline-style: none;
      font-size: 20px;
      font-weight:bold;
      border-bottom: 3px solid #ccb5b5;
      width:90px;
    }

    .backBtn{
        font-size: 30px;
        margin: -170px;
        margin-top: 20px;
        color:#FFFFFF;
        margin-bottom:1100px;
        margin-left:30px;

    }
    

</style>

<script>
import VueDatePicker1 from '@vuepic/vue-datepicker';
import VueDatePicker2 from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: { VueDatePicker1 , VueDatePicker2},
  data() {
    return {
      date1: null,
      date2: null,
      counter: 0
    };
  },
  methods: {
    increaseCounter() {
      this.counter++;
    },
    decreaseCounter() {
      this.counter--;
    },
  },
}

</script>
