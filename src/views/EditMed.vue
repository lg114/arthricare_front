<!--Welcome Page -->
<script setup>
  import {ArrowLeftBold} from '@element-plus/icons-vue';
  import {Bell} from '@element-plus/icons-vue';
  
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

        <div class = "container-flex" style = "margin-left: 42% ; margin-bottom:1%">
          <div class="IncreaseButton" @click="increaseCounter">+</div>
          <div class = "number">{{ counter }}</div>
          <div class="DecreaseButton" @click="decreaseCounter">-</div>
        </div>
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
        
      <div >
        
        <div >
          <p id = "label" style = "margin-top:60px">ADD A NOTIFICATION ? (optional)</p>
          <textarea id = "textarea1" name = "Notification" column="20" row="20"></textarea>
        </div>
      </div>  

      <div class = "container-flex" style="margin-top:2%">

        <div class = "note">Reminder
          </div>   
        <router-link to = "/">
          <el-icon class="BellBtn"><Bell/></el-icon>
        </router-link>

      </div>  

        <div class="Button" >
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
          width: 24%;
          line-height: 3rem;
          font-size:20px;
          color:#1890FF;
          font-weight:bold;
          margin-left:42%;
        }

      .container-flex{
          display:flex;
          
        }
        .note{
          position:relative;
          width:130px; 
          height:30px;
          font-size:20px;
          border-radius:10px 10px 10px 10px;
          background-color: #1890FF;
          text-align: center;
          color:white;
          cursor: pointer;
          margin-left: 42%;
         
          padding:0;
        }
        .note:hover{
          background-color: grey;
        }

        #date{
          margin-left: 42%;
          margin-top: 10px; 
          width:450px ; 
          height:10px;
        }
        .number{
          margin-left:6%;
          margin-right:6%;
          display: block;
          float:center;
          padding: 10px;
          background-color: rgb(253, 248, 248);
          width:50px;
          height:50px;
          position:relative;
          font-size:35px;
          text-align: center;
          border: 4px solid #1890FF;
          border-radius:10px 10px 10px 10px;
          color:#1890FF;
   
        }

      .IncreaseButton {
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
  
      }

      .DecreaseButton {
        color: #a19191;
        text-align: center;
        float:right;
        display: block;
        cursor: pointer;
        padding: 10px;
        background-color: rgb(253, 248, 248);
        width:40px;
        position:relative;
        font-size: 30px;
        border-radius:10px 10px 10px 10px;
        border: 2.5px solid #a39e9e;
        margin-bottom: 10px;
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
            width: 13%;
            text-align: center;
            transition-duration: 0.6s;
            text-decoration: none;
            overflow: hidden;
            cursor: pointer;
            border-radius:10px 10px 10px 10px; 
            height: 60px;
            margin-top:1%;
            line-height: -50px;
            margin-left: 46%;
      
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
        justify-content:bottom;
        align-items: center;
        background-color: rgb(253, 253, 253);
        position:relative;
        flex-direction: column;
        display: inline-block;
        border-radius:10px 10px 10px 10px;
        padding-left:auto;
        padding-right:auto;
        align-items: center;
        margin-top:1%;
        background-color: rgb(253, 253, 253);
        height:200%;
        width:100%;
        
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
      margin-left:42%;
      font-size: 18px;
      margin-bottom:1.8%;
      width:50%;
      font-weight:bold;
    }

    input{
      width: 440px;    
      height: 30px;    
      font-size: 20px;    
      background-color: white;
      margin-left:42%;
      margin-top:0.5%;
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
        margin-top:60%;
        right:300%
    }

    .BellBtn{
        font-size: 30px;
        color: grey;
        position:relative;
        margin-left:5%;
        size:40%;
    }

    .menu {
      position: relative;
      display: inline-block;
      margin-left: 42%;
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
        { id: 1, units: 'Tablet' },
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


