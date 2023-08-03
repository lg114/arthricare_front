<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import { ref } from 'vue';
    import {  Avatar, CaretRight, Message, MessageBox, Reading, WarningFilled, SwitchButton  } from '@element-plus/icons';
    import {  MoreHorizFilled, MedicationOutlined, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled } from '@vicons/material';
    import { Icon } from '@vicons/utils'
   //import {ArrowLeftBold} from '@element-plus/icons-vue';
   //import {CirclePlus} from '@element-plus/icons-vue';
   import {ArrowRightBold} from '@element-plus/icons-vue'
   import store from "@/store";
   import axios from 'axios';
</script>

<template>
  <div class="container">
  <el-container>
    <el-header class="header">
      <Icon class="more" @click="drawer = true"><MoreHorizFilled /></Icon>
      <b class="pageTitle">My Meds</b>
    </el-header>
  </el-container>

    <el-main class="main">
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
                <span id="homeText">Home</span>
                <span id="medText">My Meds</span>
                <span id="rewardsText">Rewards</span>
                <span id="profileText">Profile</span>
        </el-footer>
        <el-drawer style="background-color: #1890FF;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
                <div class = "sidebar">
                    <div>
                        <div class = "menu-item">
                                <el-upload action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
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
</template>


<style scoped>
/* Header */
.header{
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
    margin-right: 100px;
    
}
.more{
    position: absolute;
    left:5%;
    top:1.5%;
    font-size: 30px;
    color: white;
}
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

  /* Footer */
  .footer{
    background-color: white;
    position:fixed;
    bottom:0;
    height: 80px;
    width:100%;
    text-align: center;
    margin-left: 0;
    margin-right: 0;
    white-space: nowrap;
    box-shadow: inset 0 0 5px grey;
}
#addMed{
    color: #1890FF;
}
#medication{
    color: #1890FF;
}
.footerBtn{
    font-size: 45px;
    color: gray;
    height: 50px;
    width: 50px;
    padding-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
}
#homeText{
    position: relative;
    color: gray;
    right: 50px;
}
#medText{
    position: relative;
    color: #1890FF;
    right: 35px;
}
#rewardsText{
    position: relative;
    color:gray;
    left: 35px;
}
#profileText{
    position: relative;
    color: gray;
    left: 48px;
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
  /* Container & Main */
  .container{
    display: grid;
    flex-direction: column;
    place-items: center;
    height: 100vh;
    background-color: #1890FF;
    overflow-y: auto;
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
  .ExperiedContainer{
    margin-top: 3%;
    width: 100%;
  }

  .ExperiedMedication {
    text-align: center;
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
    margin: auto;
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
    color: #1890FF;
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
      width:100%;
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
      color: #1890FF;
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
      drawer: ref(false),
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
            }
  },
      
  mounted(){
          document.title = "User Profile | ArthriCare";
          this.clearMedArray();
          this.fetchData();
    }
      ,
        setup(){
          
        },
        components:{
          Icon,
            Avatar, 
            CaretRight, 
            Message, 
            MessageBox, 
            Reading, 
            WarningFilled, 
            SwitchButton, 
            MoreHorizFilled,
            MedicationOutlined, 
            CardGiftcardOutlined, 
            HomeRound, 
            AccountCircleOutlined,
            AddCircleFilled,
        }
      }
        
</script>

