<script setup>
   //import {ArrowLeftBold} from '@element-plus/icons-vue';
   import { ref} from 'vue';
   import { UserFilled, Avatar, CaretRight, Message, MessageBox, Reading, WarningFilled, SwitchButton, } from '@element-plus/icons-vue';
   import {CirclePlus} from '@element-plus/icons-vue';
   import {ArrowRightBold} from '@element-plus/icons-vue'
   import store from "@/store";
   import { HomeRound, MedicationOutlined, AddCircleFilled, CardGiftcardOutlined, AccountCircleOutlined, MoreHorizFilled} from '@vicons/material';
    import { Icon } from '@vicons/utils'
</script>

<template>
   <el-container class = "container">
   
    <div class = "container-flex">
      <Icon class="more" @click="drawer = true"><MoreHorizFilled /></Icon>
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
          <el-icon class="PlusBtn"><CirclePlus/></el-icon>
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
                </router-link>
        </el-footer>
        <el-drawer style="background-color: #1890FF;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
                <div class = "sidebar">
                    <div>
                        <div class = "menu-item">
                                <!--Action是模拟接口，与后端连接时更换-->
                                <el-upload action="" :show-file-list="false">
                                    <el-avatar :size="65">
                                        <img :src="imgUrl" v-if="imgUrl" class="uploaded-avatar" />
                                        <template v-else>
                                            <UserFilled class="defalut-avatar" />
                                        </template>
                                    </el-avatar>
                                </el-upload>                                
                                <div class = "menu-item">
                                    <div class = "menu-button" @click = "goToUserProfile">
                                        <el-icon class="menu-icon"><Avatar/></el-icon>
                                        <p>My Profile</p>
                                        <el-icon class="menu-icon"><CaretRight /></el-icon>
                                    </div>
                                    <div class = "menu-button">
                                        <el-icon class="menu-icon1"><Message /></el-icon>
                                        <p>Message</p>
                                        <el-icon class="menu-icon"><CaretRight /></el-icon>
                                    </div>
                                    <div class = "menu-button">
                                        <el-icon class="menu-icon2"><MessageBox /></el-icon>
                                        <p>Community</p>
                                        <el-icon class="menu-icon"><CaretRight /></el-icon>
                                    </div>
                                    <div class = "menu-button">
                                        <el-icon class="menu-icon1"><Reading /></el-icon>
                                        <p>Education</p>
                                        <el-icon class="menu-icon"><CaretRight /></el-icon>
                                    </div>
                                    <div class = "menu-button3">
                                        <el-icon class="menu-icon3"><WarningFilled /></el-icon>
                                        <p>About</p>
                                    </div>
                                    <div class = "menu-button">
                                        <el-icon class="menu-icon3"><SwitchButton /></el-icon>
                                        <p>Log Out</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </el-drawer>
      </div>
  </div>
  

  </el-container> 
</template>


<style scoped>
    .footerBtn{
    font-size: 45px;
    color: gray;
    height: 50px;
    width: 50px;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
    #addMed{
        color: #1890FF;
    }
    
    #medication{
        color: #1890FF;
    }
    .footer{
    background-color: white;
    position:fixed;
    bottom:0;
    height: 60px;
    width:100%;
    text-align: center;
    margin-left: 0;
    margin-right: 0;
    white-space: nowrap;
    box-shadow: inset 0 0 5px grey;
}
.sidebar{
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 20px;
    }
    .uploaded-avatar {
        width: 100%;
        height: 100%;
    }
    .defalut-avatar{
        width: 70%;
        height: 80%;
    }
    .menu-item{
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #ffffff;
    }
    .menu-icon{
        color: #ffffff;
        font-size: 20px;
    }
    .menu-icon1{
        color: #ffffff;
        font-size: 25px;
        margin-right: 15px;
    }
    .menu-icon2{
        color: #ffffff;
        font-size: 25px;
        margin-right: 5px;
    }
    .menu-icon3{
        color: #ffffff;
        font-size: 25px;
        margin-right: 1px;
    }
    .menu-button{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        cursor: pointer;
    }
    .menu-button3{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 130px;
        cursor: pointer;
    }
    .menu-button3 p{
        font-size: 20px;
        font-weight: 550;
        margin: 20px 35px;
    }
    .menu-button p{
        font-size: 20px;
        font-weight: 550;
        margin: 30px 30px;
    }
    
    .zeroObjAlert{
      width:90%;
      height:20%;
      background-color:#f4f4f4;
      border-radius: 5px;
      align-items: center;
      margin-left:5%;
      text-align: center;
      border-bottom: 3px solid #DDDDDD;
    }

    .zeroObjAlertP{
      color:#1890FF;
      position: relative;
      top:20%;
      font-size:200%;
    }
    .container{
      overflow-y: auto;
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
      position: relative;
      color:#FFFFFF;
      margin:5px;
      right:9%;
      top:30%;
    }

    .container-flex{
       display:flex;
    }

    .container-block{
       width:100%;
       height:100%;
    }

    .more{
    position: absolute;
    left:20px;
    top:10px;
    font-size: 30px;
    color: white;
}

    .PlusBtn{
        font-size: 45px;
        color: red;
        display:relative;
        margin-top:7%;
        margin-left:10%;
      }

      .arrowBtn{
        font-size: 180%;
        color: grey;
        display:relative;
        margin-top:120%;
        right:90%;
     
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
        height:14%;
     }

     .medName{
        color : Black;
        margin-left:6%;      
        margin-right:6%;   
        display:relative;
        margin-top:10%;
        letter-spacing:1px;
        font-size:15px;
        width:90%;
     
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

  components:{
            UserFilled,
            Avatar,
            CaretRight,
            Message,
            MessageBox,
            Reading,
            WarningFilled,
            SwitchButton,
            HomeRound, 
            MedicationOutlined, 
            AddCircleFilled, 
            CardGiftcardOutlined, 
            AccountCircleOutlined,
            MoreHorizFilled,
            Icon,
    },

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
      drawer: ref(false),
      // MedName : this.$route.params.MedName,
      // Field : this.$route.params.Field,
      // Category : this.$route.params.Category
   
    };
},
  methods: {
    openDrawer(){
            this.drawer = true;
            },
            beforeDrawerClose(done){
                done();
            },
            goToUserProfile(){
                this.$router.push('/MyMeds');
            },
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
    document.title = "My Meds | ArthriCare";
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