<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import store from "@/store";
  // import {Plus,Minus} from '@element-plus/icons-vue';
  import '@varlet/ui/es/button/style/index';
  import { ChevronLeft20Filled ,LineHorizontal320Filled} from '@vicons/fluent';
  import SideBarContent from '@/component/Sidebar.vue';
  import { ref } from 'vue';
</script>

<template>

   <el-container  class = "container">

      <!-- <router-link to = "/" v-if="this.MARS===false">
        <var-icon class="backBtn" name="chevron-left" :size="42" color="white"/>
      </router-link>  -->
      <div v-if="this.MARS==true || this.QuestionNumber > 10 || this.DASImg ===3 " >
        <ChevronLeft20Filled @click="disableASOption" class="backBtn"/>
        <!-- <var-icon @click="disableASOption" class="backBtn" name="chevron-left" :size="42" color="white"/> -->
      </div>
      <Icon v-if="this.MARS!=true && this.DAS !=true " class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
        <p id= "title">Assessment</p>

      <div id = container2>
          <div class="QuestionContainer" v-if="this.MARS==false && this.DAS==false && this.QuestionNumber <= 10">
            <div class="abackground">
          </div>
            <img src="@/assets/test.png" alt="Image" class="testImg">
            <p class="title1" >Select your assessment</p>
            <div ref="MARS" class="assessmentContainer" @click="selectMars">
              <p class="assessmentTitle" >MARS</p>
              <img src="@/assets/MARS.png" alt="Image" class="image">
            </div>

            <div ref="DAS-28" class="assessmentContainer" @click="selectDAS" style="margin-top:3vh;">
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

            <div class="container-flex">
              <transition name="slide" mode="out-in" >
                <input  :key="currentQuestion.id" type="radio" v-model="selectedOption" @click="increment('A')"  name= "option" id="Yes" value="Yes"/>
              </transition>
              <transition name="slide" mode="out-in" >
                <p :key="currentQuestion.id" for="Yes" class="label">Yes</p>
              </transition>
            </div>
           
            <br>
            <div class="container-flex">
              <transition name="slide" mode="out-in" >
                <input :key="currentQuestion.id" type="radio" v-model="selectedOption" @click="increment('B')" name= "option" id="No" value="No"/>
              </transition>
        
              <transition name="slide" mode="out-in" >
                <p :key="currentQuestion.id" class="label" for="No">No</p>
              </transition>
            </div>
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
            <p class="completedTitle2">Completion date :</p> 
            <p class="completedTitle3">{{this.selectedDate}}    {{this.selectedTime}}  </p>
          
            <br>
            <p class="completedTitle5">Yes:{{this.yesValue}}  No:{{this.noValue}}  </p> 
            <p v-if="noValue <= 4 " class="completedTitle4">Classification: not adherent</p> 
            <p v-if="noValue > 4 " class="completedTitle4">Classification: adherent</p> 
          </div>

          <button  v-if="this.MARS===true && this.QuestionNumber <= 10" class= "button" @click="nextQuestion">Next</button>
          <button  v-if="this.DAS===true && this.DASImg <=2 " class= "button" @click="changeDASImg">Next</button>
          <el-drawer style="background-color: #006973;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
            <!--Action是模拟接口，与后端连接时更换-->
                <div class = "sidebar">
                    <el-upload action="" :show-file-list="false">
                        <el-avatar :size="65">
                            <img :src="imgUrl" v-if="imgUrl" class="uploaded-avatar" />
                                <template v-else>
                                    <UserFilled class="defalut-avatar" />
                                </template>
                        </el-avatar>   
                    </el-upload> 
                </div>
            <SideBarContent :imgUrl="imgUrl" />    
        </el-drawer> 
      </div>
    </el-container>
</template>

<style lang = "css" src="@/css/Assessment.css" scoped>   

   


</style>

<script>

export default {
  components: {
    LineHorizontal320Filled
  },
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
      selectedDate: this.getCurrentDate(),
      selectedTime: this.getCurrentTime(),
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
      DASImg:1,
      yesValue:0,
      noValue:0,
      totalValue:0,
      drawer: ref(false),
    };
    
  },
  
  methods: {
    openDrawer() {
            this.drawer = true;
            },
    beforeDrawerClose(done) {
                done();
            },
    increment(button) {

      if (button === 'A') {
        this.yesValue += 1;
      } else if (button === 'B') {
        this.noValue += 1;
      }
      this.totalValue = this.yesValue + this.noValue;
    },

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
      this.yesValue = 0;
      this.noValue = 0;
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
    getCurrentDate() {
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 10);
      console.log(formattedTime);
      return formattedTime;
    },
    getCurrentTime() {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      console.log(formattedTime);
      return formattedTime;
    }
  
},
  mounted(){
            document.title = 'Add Medication'

        },
        setup(){
          
        }
}

</script>
