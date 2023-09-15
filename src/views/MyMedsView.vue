<script setup>
   //import {ArrowLeftBold} from '@element-plus/icons-vue';
   import {ArrowRightBold} from '@element-plus/icons-vue';
   import red from "@/assets/capsulesred.png";
   import yellow from "@/assets/capsulesyellow.png";
   import green from "@/assets/capsulesgreen.png";
   import blue from "@/assets/capsulesblue.png";
   import purple from "@/assets/capsulespurple.png";
   import orange from "@/assets/capsulesorange.png";
   import store from "@/store";
   import { ref } from 'vue';
  import { LineHorizontal320Filled, Home20Regular, BriefcaseMedical20Filled, Gift20Regular, PeopleCommunity20Regular, Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent';
  import SideBarContent from '@/component/Sidebar.vue';
    import { Icon } from '@vicons/utils';
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
    <div class="ExperiedContainer">
        <div class="ExperiedMedication">
          <p class="medication-word">Current Medication</p>
        </div>
        <div class = "zeroObjAlert" v-if="store.state.unExperiedMedArray.length === 0">
          <p class="zeroObjAlertP">You haven't added any medication</p>
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
          <p class="zeroObjAlertP">You don't have any past medication</p>
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

<style src = "@/css/mymeds.css" scoped></style>
<style src = "@/css/mymeds2.css" scoped></style>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
const port = 8181;
const baseURL = `http://localhost:${port}`;


export default {

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
      imgArray:[blue ,yellow,red
      ,green,purple,orange]
      // MedName : this.$route.params.MedName,
      // Field : this.$route.params.Field,
      // Category : this.$route.params.Category
   
    };
},
  methods: {
  
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
          this.fetchData();
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