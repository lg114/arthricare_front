<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import store from "@/store";
  // import {Plus,Minus} from '@element-plus/icons-vue';
  import '@varlet/ui/es/button/style/index';
  
</script>

<template>

   <el-container  class = "container">

      <router-link to = "/home" v-if="this.MARS===false">
        <var-icon class="backBtn" name="chevron-left" :size="42" color="white"/>
      </router-link>
      <div v-if="this.MARS==true" >
        <var-icon @click="disableASOption" class="backBtn" name="chevron-left" :size="42" color="white"/>
      </div>
      <p id= "title">Assessment</p>

      <div id = container2>
         

          <div class="QuestionContainer" v-if="this.MARS==false && this.DAS==false && this.QuestionNumber <= 10">
            <p class="title1" >Select your assessment</p>

            <div ref="MARS" class="assessmentContainer" @click="selectMars">
              <p class="assessmentTitle" >MARS</p>
              <img src="@/assets/MARS.png" alt="Image" class="image">
            </div>

            <div ref="DAS-28" class="assessmentContainer" @click="selectDAS">
              <p class="assessmentTitle" >DAS-28</p>
              <img src="@/assets/DAS-28.png" alt="Image" class="image">
            </div>
          </div>

           <!-- MARS questions -->
          <div class="QuestionContainer" v-if="this.MARS===true && this.QuestionNumber <= 10">
            <!-- <p style="margin-top:25%" class="searchItem">Health</p>
            <p class="searchItem">Medication</p>
            <p class="searchItem">Suppport</p>
            <p class="searchItem">Procedure</p> -->

            <transition name="slide" mode="out-in" >
              <h1 :key="currentQuestion.id" >Q{{this.QuestionNumber}}</h1>
            </transition>
            <transition name="slide" mode="out-in" >
              <p :key="currentQuestion.id" class="questionText" >{{ currentQuestion.text }}</p>
            </transition>

            <input type="radio" v-model="selectedOption" name= "option" id="Yes" value="Yes"/>
            <label for="Yes">Yes</label>
            <br>
            <input type="radio" v-model="selectedOption" name= "option" id="No" value="No"/>
            <label for="No">No</label>
          </div>

          <!-- DAS-28 questions -->
          <div class="QuestionContainer" v-if="this.DAS == true && this.DASImg!=3 ">
      
            <img v-if="this.DASImg == 1" src="@/assets/DAS2.png" alt="Image" class="DasImg">

            <div v-if="this.DASImg == 2">
              <img src="@/assets/DAS4.png" alt="Image" class="DasImg">
            </div>

          </div>

          
          <div class="QuestionContainer" v-if="this.QuestionNumber > 10 || this.DASImg ===3 ">
            <var-icon class= "circleIcon" name="check-circle-outline" />
            <h1 class="completedTitle">Assessment completed</h1> 
          </div>

          <button  v-if="this.MARS===true && this.QuestionNumber <= 10" class= "button" @click="nextQuestion">Next</button>
          <button  v-if="this.DAS===true && this.DASImg <=2 " class= "button" @click="changeDASImg">Next</button>
      </div>
    </el-container>
</template>

<style lang = "css" scoped>   

        .DasImg{
          height:60vh;
          width:80vw;
          position:absolute;
          left:0;
          right:0;
          margin:auto;
          border-radius: 10px;
        }
      .title1{

        font-size:140%;
        color:#006973;
        font-weight: bold;
        font-family: system-ui;
        height:12vh;
        width:80vw;
        position:relative;
        left:0;
        right:0;
        top:5vh;
        margin:auto;
        text-align: center;
        margin-bottom:15%;
      }
    .completedTitle{
      color:#006973;
      font-size:150%;
      font-family: system-ui;
      position:absolute;
      left:0;
      right:0;
      margin:auto;
      text-align: center;
      top:30vh;
      
    }
    .circleIcon{
      color:#006973;
      font-size:20vh;
      position:absolute;
      left:0;
      right:0;
    }
    .backBtn{
      position:absolute;
      left:6%;
      top:2.8%;
    }
    .image{
      position:relative;
      height:10vh;
      left:9vw;
      top:12%;
    }
    .assessmentTitle{
       position:relative;
        font-size:140%;
        color:#006973;
        font-weight: bold;
        font-family: system-ui;
        height:12vh;
        padding-left:7vw;
        padding-right:5%;
        top:20%;
        width:25vw;
    }
  .assessmentContainer{
    width:70vw;
    height: 14vh;
    border-radius: 10px;
    border: 2px solid #006973;
    margin:auto;
    margin-bottom:2vh;
    position:relative;
    display:flex;
    top:5%;
  }

  .assessmentContainer:hover{
   background:#CFEEF5;
  }


  label{
    position:relative;
    font-size:140%;
    color:#006973;
    font-weight: bold;
    position:relative;
    bottom:0.6%;
    }
  .button{
      background: #FFFFFF;
      color: white;
      position: absolute;
      display: inline-block;
      padding: 1%;
      background-color: transparent;
      border: 2px solid white;
      transition: background-color 0.5s, color 0.5s;
      width: 80vw;
      height:6.4vh;
      border-radius: 10px;
      font-weight: 700;
      font-size: 120%;
      margin:auto;
      left:0;
      right:0;
      top:75vh;
    }
    .questionText{
        position:relative;
        font-size:140%;
        color:#006973;
        font-weight: bold;
        font-family: system-ui;
        height:12vh;
        width:80vw;
        left:0;
        right:0;
        margin:auto;
        padding-left:8%;
        padding-right:8%;
        word-break: break-all;
        margin-bottom:10%;
    }
    .QuestionContainer{
      height:60vh;
      width:89vw;
      background: white;
      border-radius:15px 15px 15px 15px;
      position: relative;
      margin:0 auto;
      justify-content: center;
      top:8vh;
      padding-top: 5%;
    }

     .slide-enter-active, .slide-leave-active {
      transition: transform 0.7s ease-in-out, opacity 0.7s ease-in-out;
    }
    .slide-enter, .slide-leave-to {
      transform: translateX(100%);
      opacity: 0;
    } 

    #input1{
      width:8vh;
      position:relative;
      top:5.2vh;
      background:#006973;
      border:none;
      color:white;
      font-family: system-ui;
      font-weight: bold;

    }
    
  .searchItem{
    text-align: center;
    padding:0;
    margin-top:14%;
    color:white;
    font-size:130%;
    font-family: system-ui;
  }
 
/* scoped src="@/style/addMed.css" */
    h1{
      color:#c6d0d1;
      font-size:190%;
      font-family: system-ui;
      margin-left:5%;
    }

.container-flex{
  display:flex;
  height:15vh;
  z-index: 1;
}

.container-block{
  align-items: center;
  width:100%;
}

.container{
  display: flex;
  align-items: center;
  height:100vh;
  width:100%;
  background-color:#006973;
  flex-direction: column;
  }

#container2{
  padding-left:auto;
  padding-right:auto;
  align-items: center;
  justify-content: center;
  align-items: center;
  background-color: #006973;
  height:90%;
  width:100%;
  position:relative;
  top:10%;
  }

#title{
  font-size: 130%;
  position:absolute;
  color:#FFFFFF;
  font-family: system-ui;
  left:0;
  right:0;
  width:30%;
  margin:auto;
  top:1%;

  padding-top:6.5%;
  }

#label{   
  width:100%;
  font-weight:600;
  font-size: 100%;
  color:  #006973;
  padding:2%;
  text-align: left;
  font-family: system-ui;
  background-color:#F7F0F0;
  border-radius:0px 0px 15px 15px;
  box-shadow: 1px 2px 9px 1px #ccdde9; 
  z-index: 3;
  position:absolute;
  bottom:0;
}

input{
  align-items: center;
  width:35vh;    
  height:5vh;
  font-size:100%;   
  margin-left:6%;
  margin-top:15%;
  background-color: white;
  border:none; 
  border : 1px solid #ccdde9;
  color: #006973;
  padding:5%;
  border-radius: 5px;
  font-family: system-ui;
  box-sizing: border-box;
  border-radius:10px 10px 10px 10px;
  } 

  input[type="radio"]{
    height:3vh;
    width:20vw;
    margin:0;
    padding:0;
    margin-top:2vh;
    margin-left:5%;
    margin-bottom:5% ;
  }

  input:focus{ 
    outline-style: none;
    border-bottom: 1px solid #b5b7c2;
    }


</style>

<script>

export default {
  components: {},
  computed: {
    changeToTrue() {
      return this.$store.state.changeToTrue;
      
      
    },
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    
  },
  data() {
    return {
      transitionName: 'slide-left',
      questions: [
        { id: 1, text: "Do you ever forget to take your medicine?" },
        { id: 2, text: "Are you careless at times about taking your medicine?" },
        { id: 3, text: "When you feel better, do you sometimes stop taking your medicine?"},
        { id: 4, text: "Sometimes if you feel worse when you take the medicine,do you stop taking it?" },
        { id: 5, text: "I take my medication only when I am sick." },
        { id: 6, text: "It is unnatural for my mind and body to be controlled by medication." },
        { id: 7, text: "My thoughts are clearer on medication." },
        { id: 8, text: "By staying on medication, I can prevent getting sick." },
        { id: 9, text: "I feel weird, like a 'zombie', on medication." },
        { id: 10, text: "Medication makes me feel tired and sluggish." },
      ],
      currentQuestionIndex: 0,
      QuestionNumber:1,
      selectedOption: null,
      MARS: false,
      DAS: false,
      DASImg:1

      
    };
    
  },
  
  methods: {
    resetNumber(){
      this.QuestionNumber=1;
      this.DASImg=1;
    },
    selectMars(){
      this.MARS = true;
    },
    selectDAS(){
      this.DAS = true;
    },
    disableASOption(){
      this.MARS = false;
      this.DAS = false;
      this.resetNumber();
    },
    con(){
      console.log(this.$store.state.changeToTrue);
      store.commit("changeToTrue");
    },
    changeDASImg(){
      this.DASImg = this.DASImg + 1;
    },
    nextQuestion() {
      if(this.QuestionNumber > 10){
        console.log(this.QuestionNumber)
      }else{
        setTimeout(() => {
        this.selectedOption = null;
        this.QuestionNumber = this.QuestionNumber + 1;
      }, 700); 
      console.log(this.QuestionNumber);
      this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length;
      }
    },
  
},
  mounted(){
            document.title = 'Add Medication'

        },
        setup(){
          
        }
}

</script>
