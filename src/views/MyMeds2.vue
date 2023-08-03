<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
   //import {ArrowLeftBold} from '@element-plus/icons-vue';
   import {Operation} from '@element-plus/icons-vue';
   //import {CirclePlus} from '@element-plus/icons-vue';
   import {ArrowRightBold} from '@element-plus/icons-vue'
   import store from "@/store";
   import { HomeFilled, Calendar, CirclePlusFilled, Sugar, Present} from '@element-plus/icons-vue';
   import axios from 'axios';
</script>

<template>
  <el-container style="height: 844px;width: 100%;">
    <el-header class="my-header">
      <div class="statue-bar"></div>

      <div class="TopBar">
        <div class="leading-icon">
          <router-link to = "/">
            <el-icon class = "OperaBtn"><Operation/></el-icon>
          </router-link>
        </div>
        <div class="headline">
          <p class="headline-text">My Meds</p>
        </div>
        <div class="leading-icon">
          <el-icon class = "OperaBtn"><Operation/></el-icon>
        </div>
      </div>
    </el-header>

    <el-main class="my-main">
      <div class="ExperiedContainer">
        <div class="ExperiedMedication">
          <p class="medication-word">Current Medication</p>
        </div>
        <div class = "zeroObjAlert" v-if="store.state.unExperiedMedArray.length === 0">
          <p class="zeroObjAlertP">You haven't add any Medication</p>
        </div >
        <div class="unExperiedmed" v-for="(item, index) in store.state.unExperiedMedArray" :key="index">
          <div class="container-flex">
            <div class="Drug_picture">
              <img src="@/assets/capsules_blue.png" alt="Icon" class="capsules_blue-img" />
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
              <router-link :to="{ path: '/EditMed-mobile', query: { Index: index } }" @click="handleArrowButtonClick('unExperiedMedArray', index)">
            <el-icon class="arrowBtn_icon"><ArrowRightBold/></el-icon>
          </router-link>
        </div>
          </div>
        </div>
      </div>
      <div class="ExperiedContainer">
        <div class="ExperiedMedication">
          <p class="medication-word">Past Medication</p>
        </div>
        <div class = "zeroObjAlert" v-if="store.state.ExperiedMedArray.length === 0">
          <p class="zeroObjAlertP">You haven't have any Medication Experied</p>
        </div >
        <div class="Experiedmed" v-for="(item, index) in store.state.ExperiedMedArray" :key="index">
          <div class="container-flex">
            <div class="Drug_picture">
              <img src="@/assets/capsules_blue.png" alt="Icon" class="capsules_blue-img" />
            </div>
            <div class="container-block">
              <div class="Drug_name">
                <p class="medName-font">{{ item.MedName }}</p>
              </div>
              <div class="Drug_data">
                <p class="medData-font">{{ item.date }}</p>
              </div>
            </div>
            <div>
              <div class="arrow_button">
                <router-link :to="{ path: '/EditMed-mobile', query: { Index: index } }" @click="handleArrowButtonClick('ExperiedMedArray', index)">
                  <el-icon class="arrowBtn_icon"><ArrowRightBold/></el-icon>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>


    <el-footer class="my-footer">
    <div class="bar-menu-container">
      <div class="BarMenu_Home">
        <router-link to="/Home">
          <el-icon><HomeFilled></HomeFilled></el-icon>
        </router-link>
      </div>
      <div class="BarMenu_Calender">
        <el-icon><Calendar></Calendar></el-icon>
      </div>
      <div class="BarMenu_Plus">
        <router-link to="/AddMed-mobile">
          <el-icon><CirclePlusFilled></CirclePlusFilled></el-icon>
        </router-link>
      </div>
      <div class="BarMenu_MyMeds">
        <el-icon><Sugar></Sugar></el-icon>
      </div>
      <div class="BarMenu_Rewards">
        <el-icon><Present></Present></el-icon>
      </div>
    </div>
  </el-footer>
  </el-container>
</template>


<style scoped>
  .my-header {
    height: 125px;
    width: 430px;
    background-color: #1890FF;
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

  .headline-text {
    font-family: "Myanmar Khyay", sans-serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
    width: 100%;
    color: #FFFFFF;
  }

  .my-footer {
    height: 78px;
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px 0px #0000000D inset;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bar-menu-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .BarMenu_Home,
  .BarMenu_Calender,
  .BarMenu_Plus,
  .BarMenu_MyMeds,
  .BarMenu_Rewards {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #0f0f0f;
  }

  .BarMenu_Home,
  .BarMenu_Calender,
  .BarMenu_MyMeds,
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
    width:50px;
    height:50px;
    font-size: 50px;
    position: relative;
  }

  .my-main{ 
    width: 430px;
    height: 100%;
    border: 2px solid #1b1919;
  }
  .ExperiedContainer{
    width: 100%;
  }

  .ExperiedMedication {
    width: 100%;
    height: 25px;
    top: 135px;
    left: 53px;
    display: flex;
    align-items: center;
    justify-content: left;
    border-bottom: 2px solid #ccc;
  }

  .medication-word {
    font-family: "Myanmar Khyay", sans-serif;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
  }

  .sidebar{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
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

    .container-flex{
      height: 70px;
      display:flex;
      align-items: center;
      border-bottom: 2px solid #ccc;
    }

    .container-block{
       width:100%;
       height:100%;
       position: relative;
       left: 20px;
       
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
      left: 10px;
      display:flex;
      align-items: center;
     
    }

    .medName-font{
      font-family: Myanmar Khyay;
      font-size: 15px;
      font-weight: bold;  
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
      display: flex;
      align-items: flex-end;
      
    }
    
    .Drug_data{
      width: 230px;
      height: 12px;
      position: relative;
      top:25px;
      left: 10px;
      display:flex;
      align-items: center;
     
    }

    .medData-font{
      font-family: Myanmar Khyay;
      font-size: 13px;
      font-weight: 400;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
    }
    
    .arrow_button{
      height: 100%;
      width: 30px;
      display:flex;
      align-items: center;
    }

    .arrowBtn_icon{
      font-size: 30px;
    }
     .medObject{
        border-bottom: 2px solid #DDDDDD;
        width:100%;
        height:14%;
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
const port = 8181;
const baseURL = `http://localhost:${port}`;


export default {

  computed:{
    name(){
      return store.state.navigation
    }
  },

  data() {
    return{
      MedicineArray: [],

      // MedName : this.$route.params.MedName,
      // Field : this.$route.params.Field,
      // Category : this.$route.params.Category
   
    };
},
  methods: {
  
    fetchData() {
      var loggedInUser = sessionStorage.getItem('loggedInUser');
      if (loggedInUser) {
        loggedInUser = JSON.parse(loggedInUser);
      } else {
        console.log("does not login in");
      }

      axios.get(`${baseURL}/medications/findMedicationByUserId/${loggedInUser.id}`)
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
  },
      
  mounted(){
          this.clearMedArray();
          this.fetchData();
    }
      ,
        setup(){
          
        },
      }
        
</script>


