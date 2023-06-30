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
        <input id="Add" type="text" placeholder="*Required Field" style = "width:150px"/><br>
        <p id = "label">MEDICATION NAME</p>
        <input id="MedName" type="text" placeholder="" />
        <p id = "label">ADD CATEGORY</p>

        <div class="menu">
          <div class="selected-option" @click="toggleOptions">
            {{ selectedCategory ? selectedCategory.title : 'Select Category' }}
          </div>
          <ul v-if="showCategory" class="options">
            <li v-for="Category in category" :key="Category.id" @click="handleItemClick(Category)">
              <i class="fas fa-circle"></i> {{ Category.title }}
            </li>
          </ul>
        </div>

        <p id = "label">HOW OFTEN ARE YOU TAKING THIS MEDICATION?*</p>
        <input id="input" type="text" placeholder="eg. Once a week" />
        <p id = "label">HOW MANY UNITS DO YOU TAKE EACH TIME?*</p>

        <div class="IncreaseButton" @click="increaseCounter">+</div>
        <div class = "number">{{ counter }}</div>
        <div class="DecreaseButton" @click="decreaseCounter">-</div>

        <div class="menu">
          <div ref="unitText" class="selected-option" @click="UnittoggleOptions">
            {{ selectedUnit ? selectedUnit.units : 'Select Unit' }}
          </div>
          <ul v-if="showUnit" class="options">
            <li v-for="Unit in unit" :key="Unit.id" @click="UnithandleItemClick(Unit)">
              <i class="fas fa-circle"></i> {{ Unit.units }}
            </li>
          </ul>
        </div>
        
        <p id = "label">WHEN DID YOU START TAKING THIS MEDICATION?</p>
        <div id = "date" >
          <VueDatePicker1 id="date1" v-model="date1"></VueDatePicker1>
        </div>

        <p id = "label" style="margin-top: 50px;">WHEN DID YOU STOP TAKING THIS MEDICATION?*</p>
        <div id = "date">
          <VueDatePicker2 id="date2" v-model="date2"></VueDatePicker2>
        </div>
        
        <div class = "note" style = "top:10%"> 
          Add a note
        </div>

        <div class = "note" style = "left:70% ;"> 
          Notification
        </div>

        <div class="Button" >
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
          font-size:35px;
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
        bottom:10%;
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
            left:13%;
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
        align-items: center;
        height: 100vh;
        background-color: #1890FF;
        overflow: auto;
        flex-direction: column;
        margin: 0 auto;
    }

    #container2{
        padding-left:2000px;
        padding-right:2000px;
        justify-content:bottom;
        align-items: center;
        background-color: rgb(253, 253, 253);
        position:relative;
        height:1100px;
        flex-direction: column;
        display: inline-block;
        border-radius:10px 10px 10px 10px;
        padding-bottom:100px;
        
    }

    #title{
      font-size: 40px;
      position: relative;
      color:#FFFFFF;
      margin:5px;
    }

    #label{
      font-style: normal;
      color:  #1890FF;
      margin-left:10px;
      font-size: 18px;
      margin-bottom:25px;
    }

    input{
      width: 440px;    
      height: 30px;    
      font-size: 20px;    
      background-color: white;
      margin-left:10px;
      margin-top:3px;
      border:none; 
      border-bottom: 3px solid #f0dddd;
      color: #008866;
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
        right:700%;
        bottom:120%;
        margin:0px;
    }

    .menu {
      position: relative;
      display: inline-block;
    }

    .selected-option {
      width: 200px;
      padding: 10px;
      background-color: #f4f4f4;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid white;
      color:#008866;
      font-size:17px;
      letter-spacing:2px;
    }

    .selected-option:hover{
      border: 1px solid #ccb5b5;
    }

    .options {
      position: absolute;
      top: 100%;
      left: 0;
      width: 220px;
      padding: 0;
      margin-top: 5px;
      list-style: none;
      background-color: #f4f4f4;
      border-radius: 5px;
      color:#008866;
      letter-spacing:2px;
    }

    .options li {
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      border: 1px solid white;
      border-radius:10px 10px 10px 10px;
      
    }

    .options li i {
      margin-right: 5px;
      border: 1px solid #ccb5b5;
      border-radius:10px 10px 10px 10px;
    }

    .options li:hover {
      background-color: #e0e0e0;
      color:#1890FF;
      
      font-weight:bold;
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
      counter: 0,

      category: [
        { id: 1, title: 'Pill' },
        { id: 2, title: 'Tablet' },
        { id: 3, title: 'Injection' },
        { id: 4, title: 'Drop' }
      ],
      unit: [
        { id: 1, units: 'Mg' },
        { id: 2, units: 'Bottle'}
      ],
      selectedCategory: null,
      showCategory: false,

      selectedUnit: null,
      showUnit: false,


    };
  },
  methods: {
    increaseCounter() {
      if(this.$refs.unitText.innerHTML === 'Mg'){
        this.counter+=10
      }else if(this.$refs.unitText.innerHTML === 'Bottle'){
        this.counter++;
      }
    },
    decreaseCounter() {
      if(this.counter == 0){
        this.counter += 0
      }else if(this.$refs.unitText.innerHTML === 'Mg'){
        this.counter-=10
      }else if(this.$refs.unitText.innerHTML === 'Bottle'){
        this.counter--;
      }
    },
    handleItemClick(category) {
      this.selectedCategory = category;
      this.showCategory = false;
    },
    toggleOptions() {
      this.showCategory = !this.showCategory;
    }, 
    UnithandleItemClick(unit) {
      this.counter = 0;
      this.selectedUnit = unit;
      this.showUnit = false;
    },
    UnittoggleOptions() {
      this.showUnit = !this.showUnit;
    }
    
  }
}


</script>
