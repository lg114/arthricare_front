<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
<<<<<<< Updated upstream
  import { ref } from 'vue';
  import {  MoreHorizFilled, MedicationOutlined, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled } from '@vicons/material';
  import { Icon } from '@vicons/utils';
  //import {ArrowLeftBold} from '@element-plus/icons-vue';
  //import {CirclePlus} from '@element-plus/icons-vue';
  import {ArrowRightBold} from '@element-plus/icons-vue';
  import { mapGetters } from 'vuex';
  import store from "@/store";
  import axios from 'axios';
  import red from "@/assets/capsulesred.png";
  import yellow from "@/assets/capsulesyellow.png";
  import green from "@/assets/capsulesgreen.png";
  import blue from "@/assets/capsulesblue.png";
  import purple from "@/assets/capsulespurple.png";
  import orange from "@/assets/capsulesorange.png";
=======
   //import {ArrowLeftBold} from '@element-plus/icons-vue';
  //  import {ArrowRightBold} from '@element-plus/icons-vue';
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
    import { Icon } from '@vicons/utils';
    import { AlertCircle, Logout } from '@vicons/tabler';
    import { UserProfileAlt } from '@vicons/carbon';
    import { CastForEducationFilled } from '@vicons/material';
    import { ChevronRight20Filled } from '@vicons/fluent'
    const active = ref(1);
>>>>>>> Stashed changes
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
              <img :src= imgArray[index] alt="Icon" class="capsules_blue-img" /> 
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
              <img :src= imgArray[index] alt="Icon" class="capsules_blue-img" /> 
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
                <router-link :to="{ path: '/EditMed', query: { Index: index } }" @click="handleArrowButtonClick('ExperiedMedArray', index)">
                  <el-icon class="arrowBtn_icon"><ArrowRightBold/></el-icon>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
<<<<<<< Updated upstream
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
  </div>
</template>

=======
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
    <!-- Side barDrawer -->
    <el-drawer v-model="drawer" direction="ltr" size="70%" :show-close="false" style = " background-color: #006973;">
        <template #header>
            <div class = "topping">
                <var-avatar :size = "100" bordered bordered-color="#FFFFFF" lazy error = "https://img.icons8.com/fluency-systems-regular/48/user--v1.png"/>
            </div>
        </template>
        <div class = "middle">
            <div class = "icon-text-container" @click = "goToUserProfile">
                <div class="icon-container">
                    <Icon><UserProfileAlt/></Icon>
                </div>
                <p>My profile</p>
            </div>
            <div class = "icon-text-container">
                <div class="icon-container">
                    <Icon><CastForEducationFilled/></Icon>
                </div>
                <p>Education</p>
            </div>
        </div>
        <template #footer>
            <div class = "bottom">
                <div class = "icon-text-container">
                    <div class="icon-container">
                        <Icon><AlertCircle/></Icon>
                    </div>
                    <p>About</p>
                </div>
                <div class = "icon-text-container" @click = "logout">
                    <div class="icon-container">
                        <Icon><Logout/></Icon>
                    </div>
                    <p>Log out</p>
                </div>
            </div>
        </template>
    </el-drawer>
</div> 
</template>
<style src = "@/css/sidebar.css" scoped></style>
<style  scoped>
>>>>>>> Stashed changes

<style src = "@/css/mymeds.css" scoped></style>


<script>
const port = 8181;
const baseURL = `http://localhost:${port}`;


export default {

  computed:{
    name(){
      return store.state.navigation
    },
    //get user information from store
    ...mapGetters('user', ['isLoggedIn', 'loggedInUser']),
  },

  data() {
    return{
      MedicineArray: [],
      drawer: ref(false),
      imgArray:[blue ,yellow,red
      ,green,purple,orange]
      // MedName : this.$route.params.MedName,
      // Field : this.$route.params.Field,
      // Category : this.$route.params.Category
   
    };
},
  methods: {
  
    fetchData() {
      var loggedInUser = this.loggedInUser;
      if (loggedInUser) {
        console.log (loggedInUser.id);
      } else {
        console.log ('error, user not loggedin');
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
    async logout(){
     this.$store.dispatch('user/logout');
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
          document.title = "MyMeds | ArthriCare";
          this.clearMedArray();
          this.fetchData();
    }
      ,
        setup(){
          
        },
        components:{
          Icon,
<<<<<<< Updated upstream
          MoreHorizFilled,
          MedicationOutlined, 
          CardGiftcardOutlined, 
          HomeRound, 
          AccountCircleOutlined,
          AddCircleFilled,
=======
          LineHorizontal320Filled,
          Pill28Filled, ChannelAdd20Regular,
          Home20Regular, 
          BriefcaseMedical20Filled, 
          Gift20Regular, 
          PeopleCommunity20Regular,
          UserProfileAlt,
          CastForEducationFilled,
          AlertCircle,
          Logout,
>>>>>>> Stashed changes
        }
      }
        
</script>