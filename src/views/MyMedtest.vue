<script setup>
   //import {ArrowLeftBold} from '@element-plus/icons-vue';
   //import {ArrowRightBold} from '@element-plus/icons-vue';
   import red from "@/assets/capsulesred.png";
   import yellow from "@/assets/capsulesyellow.png";
   import green from "@/assets/capsulesgreen.png";
   import blue from "@/assets/capsulesblue.png";
   import purple from "@/assets/capsulespurple.png";
   import orange from "@/assets/capsulesorange.png";
   import bottle from "@/assets/pills-bottle.png";
   import tablet from "@/assets/capsules.png";
   import injection from "@/assets/injection.png";
   import drop from "@/assets/drop.png";
   import store from "@/store";
   import { ref } from 'vue';
  import { LineHorizontal320Filled, Home20Regular, BriefcaseMedical20Filled, Gift20Regular, PeopleCommunity20Regular, Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent';
  import SideBarContent from '@/component/Sidebar.vue';
    import { Icon } from '@vicons/utils';
    import { ChevronRight20Filled} from '@vicons/fluent';
    import { Error,TrashCan,Edit} from '@vicons/carbon';

    const active = ref(1);
</script>

<template>
  <div class="container">
  
   <div class = "container-flex">
        <Icon class = "OperaBtn" @click="drawer = true"><LineHorizontal320Filled/></Icon>
     <!-- <Icon @click="drawer = true"><MoreHorizFilled /></Icon> -->
     <p id = "title">My Meds</p>
   </div> 
  
   <div id = container2>
    <div class="ExpiredContainer">
        <div class="ExpiredMedication">
          <p class="medication-word">Current Medication</p>
        </div>
        
        <div class = "zeroObjAlert" v-if="store.state.unExperiedMedArray.length === 0">
          <img src="@/assets/notification-bell.png" alt="Image" class="testImg">
          <p class="zeroObjAlertP">You haven't added any medication</p>
        </div >
        
        <div class="unExperiedmed" v-for="(item, index) in store.state.unExperiedMedArray" :key="index" data-type="0">
          
          <div class="medObject" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="oneself">
           <div class="container-flex">
            <div class="imgSpace">
            <div class="Drug_picture">
              <img :src= imgArray[0] v-if="item.Category=='Pill'" alt="Icon" class="capsules_blue-img" /> 
              <img :src= imgArray[1] v-if="item.Category=='Tablet'" alt="Icon" class="capsules_blue-img" /> 
              <img :src= imgArray[2] v-if="item.Category=='Injection'" alt="Icon" class="capsules_blue-img" /> 
              <img :src= imgArray[3] v-if="item.Category=='Drop'" alt="Icon" class="capsules_blue-img" /> 
            </div>

           </div>
            <div class="container-block">
              <div class="Drug_name">
                <p class="medName-font">{{ item.MedName }}</p>
              </div>
              <div class="Drug_data">
                <p class="medData-font">{{ item.date }}</p>
              </div>
            </div>
            <div class="arrow_button">
              <router-link :to="{ path: '/EditMed', query: { Index: index } }" @click="handleArrowButtonClick('unExperiedMedArray', index)">
                <ChevronRight20Filled @click="disableASOption"  class="arrowBtn_icon"/>
              </router-link>
            </div>
           
          </div>
          <div class="removeBtn" @click="unExpiredRemove" :data-index="index">
            <Edit @click="disableASOption"  class="cross"/>
            <p class="removeP">Edit</p>
          </div>
          <div class="removeBtn2" @click="stopMed(index)" :data-index="index">
            <TrashCan @click="disableASOption"  class="cross"/>
            <p class="removeP">Stop</p>
          </div>
          <div class="removeBtn3" @click="unExpiredRemove" :data-index="index">
            <Error @click="disableASOption"  class="cross"/>
            <p class="removeP">Delete</p>
          </div>
         </div> 
        </div>

      </div>
      <div class="ExpiredContainer">
        <div class="ExpiredMedication">
          <p class="medication-word">Past Medication</p>
        </div>
        <div class = "zeroObjAlert" v-if="store.state.ExperiedMedArray.length === 0">
          <img src="@/assets/folder1.png" alt="Image" class="testImg">
          <p class="zeroObjAlertP">You don't have any past medication</p>
        </div >

        <div class="Experiedmed" v-for="(item, index) in store.state.ExperiedMedArray" :key="index" data-type="0">
          <div class="medObject" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="oneself" >
            <div class="container-flex">
            <div class="imgSpace">
            <div class="Drug_picture">
              <img :src= imgArray[0] v-if="item.Category=='Pill'" alt="Icon" class="capsules_blue-img" /> 
              <img :src= imgArray[1] v-if="item.Category=='Tablet'" alt="Icon" class="capsules_blue-img" /> 
              <img :src= imgArray[2] v-if="item.Category=='Injection'" alt="Icon" class="capsules_blue-img" /> 
              <img :src= imgArray[3] v-if="item.Category=='Drop'" alt="Icon" class="capsules_blue-img" /> 
            </div>
          </div>
            <div class="container-block">
              <div class="Drug_name">
                <p class="medName-font">{{ item.MedName }}</p>
              </div>
              <div class="Drug_data">
                <p class="medData-font">{{ item.date }}</p>
              </div>
              <ChevronLeft20Filled @click="disableASOption" class="arrowBtn_icon"/>
            </div>
            
            <div class="arrow_button">
              <router-link :to="{ path: '/EditMed', query: { Index: index } }" @click="handleArrowButtonClick('ExperiedMedArray', index)">
                <ChevronRight20Filled @click="disableASOption" class="arrowBtn_icon"/>
              </router-link>
            </div>
            </div>
            <div class="removeBtn" @click="ExpiredRemove" :data-index="index">
              <Edit @click="disableASOption"  class="cross"/>
              <p class="removeP">Edit</p>
            </div>
            <div class="removeBtn2" @click="ExpiredRemove" :data-index="index">
              <Error @click="disableASOption"  class="cross"/>
              <p class="removeP">Stop</p>
            </div>
            <div class="removeBtn3" @click="ExpiredRemove" :data-index="index">
              <TrashCan @click="disableASOption"  class="cross"/>
              <p class="removeP">Delete</p>
           </div>
          </div>
       
        </div>
     
      </div>
 </div>
 <var-bottom-navigation
           class="footer"
           v-model:active="active"
           border="true"
           safe-area="true"
           :fab-props="{color:'#55BDCA'}"
       >
           <var-link href="/#/Home" underline="none">
           <var-bottom-navigation-item class="bottomButton" name="homeButton">
               <Icon  style="font-size: 38px;"><Home20Regular /></Icon><br>
               <span>Home</span>
           </var-bottom-navigation-item>
           </var-link>
           <var-link href="/#/MyMeds" underline="none">
           <var-bottom-navigation-item class="bottomButton" name="medsButton">
               <Icon style="font-size: 38px; color:#55BDCA"><BriefcaseMedical20Filled /></Icon><br>
               <span style="color:#55BDCA">My Meds</span>
           </var-bottom-navigation-item>
           </var-link>
           <var-link href="/#/Rewards" underline="none">
           <var-bottom-navigation-item class="bottomButton" name="rewardsButton">
               <Icon style="font-size: 38px;"><Gift20Regular /></Icon><br>
               <span>Rewards</span>
           </var-bottom-navigation-item>
           </var-link>
           <var-link href="/#/Community" underline="none">
           <var-bottom-navigation-item class="bottomButton" name="profileButton">
               <Icon style="font-size: 38px;"><PeopleCommunity20Regular /></Icon><br>
               <span>Community</span>
           </var-bottom-navigation-item>    
           </var-link>
       </var-bottom-navigation>
                       <!-- Fab button -->
                       <var-fab v-model:active="showAction" style="margin-bottom: 100px;" color="#006973" inactive-icon-size="26px" active-icon-size="30px" elevation="5">
           <var-button class="action" round color="#F27B42" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
             <var-link href="/#/AddPost" text-color="white" text-size="25px">
               <Icon><ChannelAdd20Regular /></Icon>
           </var-link>
           </var-button>
           <var-button class="action" round color="#55BDCA" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
               <var-link href="/#/AddMed" text-color="white" text-size="25px">
                   <Icon><Pill28Filled /></Icon>
               </var-link>
           </var-button>
       </var-fab>

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
</template>

<style  scoped>

.testImg{
   height:13vh;
   width:13vh;
   position:absolute;
   left:0;
   right:0;
   margin:auto;
  }
  .cross{
    height:3.1vh;
    font-size:3vh;
    position:relative;
    bottom:0.5vh;
    margin-top:4vh;
  }

  img{
      width: 12%;
      height:12%;
      margin-top:10px;
      margin-right:15px;
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
    text-decoration: none;
}
    
    .container{
      overflow-y: auto;
        display: flex;
        align-items: center;
        height:100%;
        width:100%;
        background-color:#006973;
        overflow: auto;
        flex-direction: column;
        margin: 0 ;
        overflow-x: hidden;
    }

    #container2{
        padding-left:auto;
        padding-right:auto;
        align-items: center;
        background-color: white;
        height:100vh;
        width:100vw;
        justify-content: center;
        align-items: center;
        display:inline-block;
        margin-bottom:5vh;
        position:relative;
        overflow: hidden;
    }

    #title{
      font-size: 130%;
      position: relative;
      color:#FFFFFF;
      left: 33%;
    }

    .container-flex{
       display:flex;
    }

    .OperaBtn{
        font-size: 20px;
        color:#FFFFFF;
        position:relative;
        left:5%;
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
     .bottomButton{
      width: 90px;
      padding:20px;
      position:relative;
      right:20%;
  } 

.footer{
    display: inline;
    position: fixed;
    text-align: center;
    bottom: 0;
    height:80px;
    --bottom-navigation-item-font-size: 13px;
    --bottom-navigation-item-active-color: #55BDCA;
    white-space: nowrap;
}  

/* MyMeds Page Css */
/* Header */
.pageTitle{
    position:relative;
    left: 40%;
    font-size: 20px;
    white-space: nowrap;
}
  .TopBar{
    width: 366px;
    height: 55px;
    top: 50px;
    left: 40px;
    padding: 8px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .statue-bar {
    width: 375px;
    height: 40px;
    left: 28px;
  }
  .leading-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    gap: 10px;
    font-size: 48px;
  }
  .headline {
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .BarMenu_Rewards {
    width: 80px;
    height: 54px;
    font-size: 54px;
  }
  .BarMenu_Plus {
    width: 54px;
    height: 54px;
    font-size: 50px;
  }
  .BarMenu_Plus el-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .capsules_blue-img {
    width:4.5vh;
    height:4.5vh;
    position: relative;
    right:24%;
    bottom:13%;
  }
  /* Container & Main */
  .container{
    display: grid;
    flex-direction: column;
    place-items: center;
    height: 100vh;
    background-color: #006973;
    overflow-y: auto;
    width:100vw;
}
.main{
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    height: 100vh;
    background-color:white;
    width: 100%;
    padding-top: 0%;
    padding-left: 0%;
    padding-right: 0%;
    padding-bottom: 80px;
}
  .my-main{ 
    width: 430px;
    height: 100%;
    border: 2px solid #1b1919;
  }
  .ExpiredContainer{
    margin-top: 3%;
    width: 101%;
    overflow-y: auto;
    overflow: hidden;
  }
  .ExpiredMedication {
    text-align: left;
    width: 96vw;
    height: 3.5vh;
    display: flex;
    align-items: center;
    justify-content: left;
    position:relative;
    top:0.5vh;
    padding-bottom: 10px;
    background: rgb(248, 246, 246);
    border-radius: 8px;
    left:2vw;
    margin-bottom:1vh;
  }
  .medication-word {
    padding:3%;
    padding-top:5%;
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    color: #006973;
    font-family: system-ui;
    font-weight: 500;
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
    text-decoration: none;
}
.zeroObjAlert{
    width:95%;
    height:20vh;
    background-color:white;
    border-radius: 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-left:2.0%;
}
.zeroObjAlertP{
    color:#AAB8B9;
    position: relative;
    top:14vh;
    font-size:100%;
}

.container-flex{
    height: 70px;
    width:100%;
    display:flex;
    align-items: center;
   
}
.container-block{
    width:60%;
    height:100%;
    position: relative;
    left: 10vw;
    bottom:0.6vh;
}
.Drug_picture{
    width:50px;
    height:50px;
    font-size: 50px;
    position: relative;
    left: 20px;
}
.Drug_name
{
    width:220px;
    height:25px;
    position: relative;
    top:18px;
    left: 20px;
    display:flex;
    align-items: center;
    
}

.medName-font{
    font-family: Myanmar Khyay;
    font-size: 120%;
    font-weight: bold;  
    line-height: 28px;
    text-align: left;
    display: flex;
    align-items: flex-end;
    font-family: system-ui;
    color:#006973;
}

.Drug_data{
    width: 230px;
    height: 12px;
    position: relative;
    top:25px;
    left: 20px;
    display:flex;
    align-items: center;
}
.medData-font{
    font-family: Myanmar Khyay;
    font-size: 90%;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom:1vw;
    font-family:system-ui;
    color: #8fa9ac;
    width:100%
}
.arrowBtn_icon{
    height:30px;
    color: #006973;
    position:relative;
    left:14vw;
    top:1vw;
}

.imgSpace{
    height:6vh;
    width:6vh;
    background:#e9eeee;
    position:relative;
    border-radius: 8px;
    left:5vw;
}
.medObject{
        width:95vw;
        height:9vh;
        padding:3%;
        border-bottom: 0.3vh solid #f5f0f0;

     }

    /* delete button*/

  .unExperiedmed,.Experiedmed{
    transition: all 0.2s;
  }

  .unExperiedmed[data-type="0"] {
    transform: translate3d(0, 0, 0);
  }

  .Experiedmed[data-type="0"] {
    transform: translate3d(0, 0, 0);
  }

  /* =1显示 */
  .unExperiedmed[data-type="1"] {
    transform: translate3d(-51vw, 0, 0);
  }

  .Experiedmed[data-type="1"] {
    transform: translate3d(-51vw, 0, 0);
  }
  .removeBtn {
    width: 17vw;
    height:12.3vh;
    background: #bdb3b3;
    font-size: 50%;
    color: #fff;
    text-align: center;
    position: absolute;
    bottom:0;
    right: -17vw;
    text-align: center;
    z-index:1;

  }
  .removeBtn2 {
    width: 17vw;
    height:12.3vh;
    background: #92908e;
    font-size: 50%;
    color: #fff;
    text-align: center;
    position: absolute;
    bottom:0;
    right: -34vw;
    text-align: center;
  }

  .removeBtn3 {
    width: 17vw;
    height:12.3vh;
    background: #e47b19;
    font-size: 50%;
    color: #fff;
    text-align: center;
    position: absolute;
    bottom:0;
    right: -51vw;
    text-align: center;
  }

  .removeP{
    position: relative;
    bottom:1.3vh;
    right: 0vw;
    font-size:1.5vh;
    color:white;
    z-index:2;
  }
</style>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
const port = 8181;
const baseURL = `http://localhost:${port}`;

export default {
  name: "TheIndex",
  computed:{
    ...mapGetters('user', ['loggedInUser']),
    name(){
      return store.state.navigation
    }
  },

  data() {
    return{
      MedicineArray: [],
      drawer: ref(false),
      showAction: ref(false),
      imgArray:[bottle,tablet,injection,drop ,yellow,red,green,purple,orange,blue],
      isDragging: false,
      showDiv: false,
      startX: 0, 
        endX: 0, 
 
    };
  },
  methods: {
    stopMed(number){
      let unExperiedmed = store.state.unExperiedMedArray[number];
      store.state.unExperiedMedArray.splice(number, 1);
      store.state.ExperiedMedArray.push(unExperiedmed);  
      this.restSlide();
      console.log("done")
    },
    oneself() {
        if (this.checkSlide()) {
          this.restSlide();
        } else {
          console.log("FFF");
        }
      },
      
      touchStart(e) {
        this.startX = e.touches[0].clientX;
      },
      
      touchEnd(e) {
        let parentElement = e.currentTarget.parentElement; 
        this.endX = e.changedTouches[0].clientX;
        if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        
        if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
          this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.endX = 0;
      },
      
      checkSlide() {
        let listItems = document.querySelectorAll(".Experiedmed");
  
        for (let i = 0; i < listItems.length; i++) {
          if (listItems[i].dataset.type == 1) {
            return true;
          }
        }
        return false;
      },
    
     
      restSlide() {
        let listItems = document.querySelectorAll(".unExperiedmed");
       
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].dataset.type = 0;
        }
      },
     
      unExpiredRemove(e) {
        let index = e.currentTarget.dataset.index;
        this.restSlide();
        store.state.unExperiedMedArray.splice(index, 1);
      },

      ExpiredRemove(e) {
        let index = e.currentTarget.dataset.index;
        this.restSlide();
        store.state.ExperiedMedArray.splice(index, 1);
      },
    
///////////////////////////////////////////
    changeShow(){
      this.showDiv =! this.showDiv;
      console.log(this.showDiv)
    },

    fetchData() {
      axios.get(`${baseURL}/medications/findMedicationByUserId/${this.loggedInUser.userId}`)
        .then(response => response.data)
        .then(medications => {
          const medicationPromises = medications.map(medication => {
            return axios.get(`${baseURL}/medications/checkMedicationExpiration/${medication.medicationId}`)
              .then(response => response.data)
              .then(isExpired => {

                if (isExpired) {
                  this.displayExpiredMedication(medication); // 使用箭头函数来保持正确的上下文
                } else {
                  this.displayNonExpiredMedication(medication); // 使用箭头函数来保持正确的上下文
                }
              })
              .catch(error => {
                console.log('Error checking medication expiration:', error);
              });
          });

          return Promise.all(medicationPromises);
        })
        .catch(error => {
          console.log('Error fetching user information:', error);
        });
    },

    displayExpiredMedication(medication) {
      axios.get('http://localhost:8181/reminders/checkMedicationTakeTimes/' + medication.medicationId)
        .then(response => {
          if (response.status === 200) {
            return response.data; // Use response.data instead of response.text()
          } else if (response.status === 404) {
            return "Reminder have not been created yet";
          } else {
            return "An error occurred";
          }
        })
        .then(test => {
          const dataObject = {
            medicationId:medication.medicationId,
            MedName:medication.medicationName,
            date:test,
          };
          store.state.ExperiedMedArray.push(dataObject);
        })
        .catch(error => {
          console.log('Error fetching next reminder time:', error);
          //medicationElement.textContent += ', Error fetching next reminder time.';
        });
      },

      displayNonExpiredMedication(medication) {
      axios.get('http://localhost:8181/reminders/findNextReminderTime/' + medication.medicationId)
        .then(response => {
          if (response.status === 200) {
            return response.data; // Use response.data instead of response.text()
          } else if (response.status === 404) {
            return "Reminder have not been created yet";
          } else {
            return "An error occurred";
          }
        })
        .then(nextReminder => {
          const dataObject = {
            medicationId:medication.medicationId,
            MedName:medication.medicationName,
            date:nextReminder,
          };
          store.state.unExperiedMedArray.push(dataObject);
        })
        .catch(error => {
          console.log('Error fetching next reminder time:', error);
        });
    },

    clearMedArray()
    {
      store.state.ExperiedMedArray = []
      store.state.unExperiedMedArray = []
    },

    handleArrowButtonClick(arrayName, index) {
      // arrayName表示点击的是哪个数组，index表示点击的是数组中的第几个药物项
      var medicationId;
      if (arrayName === 'unExperiedMedArray') {
        medicationId = store.state.unExperiedMedArray[index].medicationId;
        console.log('点击了未过期药物数组中的第' + (index + 1) + '项');
      } else if (arrayName === 'ExperiedMedArray') {
        medicationId = store.state.ExperiedMedArray[index].medicationId;
        console.log('国企药物'+medicationId);
      }
      sessionStorage.setItem('medicationId', medicationId);
    },
    //Drawer
    openDrawer() {
            this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
    //Router
    goToUserProfile(){
                this.$router.push('/MyMeds');
            },
            toggleAction(){
                this.showAction.value = !this.showAction.value
            }
  },
      
  mounted(){
          document.title = "User Profile | ArthriCare";
          this.clearMedArray();

          const unExpiredMedicationTestData = {            
            medicationId:2,
            Category:"Tablet",
            MedName:"Tamitami nmnni",
            date:"Today 10:00"}
         const unExpiredMedicationTestData2 = {            
            medicationId:3,
            Category:"Pill",
            MedName:"aoehfoaehfoaehf",
            date:"Today 10:00"}
            const unExpiredMedicationTestData3 = {            
            medicationId:4,
            Category:"Injection",
            MedName:"Potion",
            date:"Today 10:00"}

             const unExpiredMedicationTestData4 = {            
             medicationId:4,
             Category:"Drop",
             MedName:"Drop",
             date:"Today 10:00"}

          const expiredMedicationTestData = {            
            medicationId:1,
            Category:"Pill",
            MedName:"Aspirin1",
            date:"4/4"}

           const expiredMedicationTestData2= {            
            medicationId:1,
            Category:"Pill",
            MedName:"Aspirin2",
            date:"6/4"}
            
          console.log(expiredMedicationTestData);
          console.log(unExpiredMedicationTestData);
          store.state.unExperiedMedArray.push(unExpiredMedicationTestData);
          store.state.unExperiedMedArray.push(unExpiredMedicationTestData2);
          store.state.unExperiedMedArray.push(unExpiredMedicationTestData3);
          store.state.unExperiedMedArray.push(unExpiredMedicationTestData4);
          store.state.ExperiedMedArray.push(expiredMedicationTestData);
          store.state.ExperiedMedArray.push(expiredMedicationTestData2);
          
          
          //this.fetchData();
    }
,
        setup(){
          const active= ref(1);

          return {active}
        },
        components:{
          Icon,
          LineHorizontal320Filled,
          Pill28Filled, ChannelAdd20Regular,
          Home20Regular, 
          BriefcaseMedical20Filled, 
          Gift20Regular, 
          PeopleCommunity20Regular,
          SideBarContent
        }
      }
        
</script>