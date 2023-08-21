<script setup>
   //import {ArrowLeftBold} from '@element-plus/icons-vue';
   import {Operation} from '@element-plus/icons-vue';
   import {ArrowRightBold} from '@element-plus/icons-vue';
   import red from "@/assets/capsulesred.png";
   import yellow from "@/assets/capsulesyellow.png";
   import green from "@/assets/capsulesgreen.png";
   import blue from "@/assets/capsulesblue.png";
   import purple from "@/assets/capsulespurple.png";
   import orange from "@/assets/capsulesorange.png";
   import store from "@/store";
   import {   MedicationOutlined, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled } from '@vicons/material';
    import { Icon } from '@vicons/utils'
</script>

<template>
   <el-container class = "container">
   
    <div class = "container-flex">
      <router-link to = "/">
         <el-icon class = "OperaBtn"><Operation/></el-icon>
      </router-link>
      <!-- <Icon @click="drawer = true"><MoreHorizFilled /></Icon> -->
      <p id = "title">My Meds</p>
    </div>  

    <div id = container2>
       <!-- <button @click="addObjectToArray">Generate Object and Add to Array</button>
      <p id = "p1">Current Medicine</p> -->
     
     <div class = "container-block" style = "height:100% ;width:100%"> 

      <!-- <div class="medObject" >
        <div class = "container-flex" style = "height:100% ;width:100%">
          <el-icon to = "/AddMed-mobile" class="PlusBtn"><CirclePlus/></el-icon>
          <div class = "container-block" style = "height:100% ;width:100%"> 
            <p class="medName"> {{ $route.query.MedName}}</p>
            <p class="date" >Category: {{ $route.query.Category}}</p>
           <p>Input 1: {{ $route.query.Field}}</p> 
          </div>  
          <router-link to = "/EditMed-mobile" >
            <el-icon class="arrowBtn"><ArrowRightBold/></el-icon>
          </router-link>
      </div>  
      {{ store.state.test}}</p>
    </div> -->
    <div class = "zeroObjAlert" v-if="store.state.MedArray.length === 0">
        <p class="zeroObjAlertP">You haven't add any Medication</p>
      </div >
      
      <div class="medObject" v-for="(item, index) in store.state.MedArray" :key="index" >
        <div class = "container-flex" style = "height:100% ;width:100%">

          <img :src= imgArray[index] class = "medImg" alt="Image" id  = "medIcon"> 

          <div class = "container-block" style = "height:100% ;width:100%"> 
           <!--<  <p class="medName"> {{ index + 1}}</p> -->       
            <p class="medName"> {{ item.MedName}}</p>
            <p class="date" >Category: {{ item.Category}}</p>
            
           <!--<p>Input 1: {{ $route.query.Field}}</p> -->
          </div>  
          <!-- <p>{{ store.state.navigation}}</p> -->
          <router-link :to="{ path: '/EditMed', query: { Index: index } }">
            <el-icon class="arrowBtn"><ArrowRightBold/></el-icon>
          </router-link>
        </div>  
      </div>

      <el-footer class="footer">
                <router-link to = "/Home">
                <Icon class="footerBtn" id="home"><HomeRound /></Icon>                    
                </router-link>
                <Icon class="footerBtn" id="medication"><MedicationOutlined /></Icon>
                <router-link to = "/AddMed">
                    <Icon class="footerBtn" id="addMed"><AddCircleFilled /></Icon>
                </router-link>
                <router-link to = "/Rewards">
                <Icon class="footerBtn" id="rewards"><CardGiftcardOutlined /></Icon>
                </router-link>
                <router-link to = "/UserProfile">
                <Icon class="footerBtn" id="profile"><AccountCircleOutlined /></Icon>
                </router-link><br>
        </el-footer>

      </div>
  </div>
  

  </el-container> 
</template>


<style scoped>
    img{
      width: 12%;
      height:12%;
      margin-top:10px;
      margin-right:15px;

    }
    .footerBtn{
        font-size: 45px;
        color: #ffffff;
        height: 50px;
        width: 50px;
        padding-top: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }
   .footer{
        background-color: #55BBC9;
        position:fixed;
        bottom:0;
        height: 60px;
        width:100%;
        text-align: center;
    }
        .sidebar{
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 20px;
    }
    
    .zeroObjAlert{
      width:100%;
      height:100%;
      margin-left:5%;
      background-color: white;
   
    }

    .zeroObjAlertP{
      color:#55BBC9;
      position: relative;
      top:20%;
      font-size:200%;
      height:1000%;
      text-align: center;
      right:5%;

    }
    .container{
      overflow-y: auto;
        display: flex;
        align-items: center;
        height:100%;
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
        background-color: white;
        height:100%;
        width:100%;
        justify-content: center;
        align-items: center;
        display:inline-block;
    }

    #title{
      font-size: 130%;
      position: relative;
      color:#FFFFFF;
      right:15%;
      margin-top:30%;
    }

    .container-flex{
       display:flex;
    }

    .container-block{
       width:100%;
       height:100%;
       
    }

    .OperaBtn{
        font-size: 20px;
        color:#FFFFFF;
        position:relative;
        margin-top:170%;
        right:440%;
    }

    .PlusBtn{
        font-size: 45px;
        color: red;
        display:relative;
        margin-top:4%;
        margin-left:10%;
      }

      .arrowBtn{
        font-size: 180%;
        color: grey;
        display:relative;
        margin-top:100%;
        right:90%;
        bottom:17%;
     
      }

      #medIcon{
        position:relative;
        margin-left:10%;
      }

     #p1{
        font-size:101%;
        margin-top:0;
        margin-bottom:0;
        display:relative;
        border-bottom: 1px solid #a39e9e;
        padding:3%;
        padding-left:9%;
        font-weight:bold;
        font-family: custom;
     } 

     .medObject{
        border-bottom: 2px solid #DDDDDD;
        width:100%;
        height:11%;
        padding:3%;
     }

     .medName{
        color : Black;
        margin-left:6%;      
        margin-right:6%;   
        display:relative;
        margin-top:5%;
        letter-spacing:1px;
        font-size:15px;
        width:40%;
     
     }

     .date{
        color : #a39e9e;
        font-size:3px;
        margin-left:6%;       
        display:relative;
        padding:0;
        letter-spacing:0.5px;
     }
        
</style>

<script>


export default {

  computed:{
    name(){
      return store.state.navigation
    }
  },
beforeCreate(){
            console.log('beforeCreate')
        },
  created() {

  },

  data() {
    return{
      MedicineArray: [],
      imgArray:[red ,yellow,purple
      ,green,blue,orange]
      // MedName : this.$route.params.MedName,
      // Field : this.$route.params.Field,
      // Category : this.$route.params.Category
   
    };
},
  methods: {

    formattedDate(Date) {

      const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(Date).toLocaleDateString('en-US', dateOptions);
    },

    addObjectToArray() {
          // const queryObject = this.$route.query;
          // // const dataObject = {};
          // // for (const key in queryObject) {
          // //   dataObject[key] = queryObject[key];
          // // }
          
          // // // Add the object to the array
          // this.MedicineArray.push(queryObject);
          // const data = JSON.parse(jsonString);
          // const objectFromString = JSON.parse('{' + data.StringObject.replace(/&/g, ',').replace(/=/g, ':') + '}');
     
          // console.log(queryObject);
          // console.log(this.$route.query.queryObject);
          // console.log('Start');
          // console.log(this.MedicineArray[0]);
          const dataObject = {
            MedName:  this.$route.query.MedName,
            Category:  this.$route.query.Category,
            Frequency: this.$route.query.Frequency,
            Unit: this.$route.query.Unit,
            StartDate:  this.$route.query.StartDate ,
            EndDate:  this.$route.query.EndDate,
            Note:  this.$route.query.Note,
            timeInput1: this.$route.query.timeInput1,
            timeInput2: this.$route.query.timeInput2,
            timeInput3: this.$route.query.timeInput3,
          };   
          if(dataObject.MedName!=="" && dataObject.MedName!== undefined){
            console.log("FUnctino CALLED")
            this.MedicineArray.push(dataObject);
            store.state.MedArray.push(dataObject);
            sessionStorage.setItem('MedArray', JSON.stringify(this.MedicineArray));
          }else{
            console.log("error")
          }
            console.log(this.MedicineArray);
            console.log(this.MedicineArray.length);
            console.log(store.state.MedArray.timeInput1);
            console.log("End");

        },

        loadStorage(){
          const savedArrayData = sessionStorage.getItem('MedArray');
          if (savedArrayData) {
           this.MedicineArray = JSON.parse(savedArrayData);
          }
        },
  },
      
  mounted(){
        if(store.state.navigation){
          this.loadStorage();
          this.addObjectToArray();
          store.commit('changeToFalse');
          //store.commit("setArray", JSON.parse(sessionStorage.getItem('MedArray')));
         // console.log(store.state.MedArray[0].Field + "ffffffffffffff")
        }else{
          //store.commit("setArray", JSON.parse(sessionStorage.getItem('MedArray')));
          console.log("error mounted")
          
      }
    }
       ,
        setup(){
          
        },
      }
        
</script>



