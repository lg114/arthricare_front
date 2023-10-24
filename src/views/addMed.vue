<!--add medication Page-->
<!--
    Author: zhenxi zhang, jihao li
    Student number: 6062027
    Date: 2023/10/20  
-->
<script setup>
  // import {ArrowLeftBold} from '@element-plus/icons-vue';
  //import store from "@/store";
  // import {Plus,Minus} from '@element-plus/icons-vue';
  import '@varlet/ui/es/button/style/index';
  //import injection from "@/assets/injection.png";
  //import drop from "@/assets/drop.png";
  //import pill from "@/assets/pill.png";
  //import tablet from "@/assets/capsules.png";
  
</script>

<template>
   <el-container class = "container">
      
    <div class = "container-flex" style="height:100% ; width:50% ;">
        <!-- <router-link to = "/">
          <el-icon class = "backBtn"><ArrowLeftBolkBd/></el-icon>
        </router-link> -->
      <router-link to = "/MyMeds">
        <var-icon class="backBtn" name="chevron-left" :size="42" color="white"/>
      </router-link> 

        <p id= "title">Add Medication</p>
      </div>
      
     <div id = container2>

      <div class = "container3">
        <h1>MEDICATION DETAIL </h1>

        <p id = "label" >Medication Name *</p>

        <AutoComplete @med-selected="onMedSelected"></AutoComplete>


      <div class="container-flex" >
        <div class="container-block"  >
          <p id = "label" >Category *</p>
          <label for = "Category"></label>
          <SelectWithImage @category-selected = "onCategorySelected"></SelectWithImage>
        </div>

        <div class="container-block">
          <p id = "label">Dosage *</p>
          <el-input v-model="dosage" placeholder="Please Input" type = "number"/>
        </div>  
    
      </div>
        <p id = "label">Note (Optional)</p>
            <el-input v-model="note" placeholder="Please Input" />
      </div>   


      <div class = "container3">
        <h1>SET REMINDER</h1>
        <p id = "label" >Frequency *</p>
        <!-- <input ref="Frequency" id="input" type="text" placeholder="  " /> -->
        <var-select variant="outlined"  v-model="selectedFrequency" class = "frenquency-select">
          <var-option label="Daily medication" />
          <var-option label="Intermittent medication" />
          <var-option label="Only as needed" />
        </var-select>

        <div id="date">
            <DailyDatePicker v-if="selectedFrequency === 'Daily medication'"
              @update:start-date="handleStartDate"
              @update:end-date="handleEndDate"
              @update:duration = "handleduration">
            </DailyDatePicker>
            <IntermittentDatePicker v-else-if="selectedFrequency === 'Intermittent medication'"
              @update:start-date="handleStartDate"
              @update:end-date="handleEndDate"
              @update:duration = "handleduration">
              </IntermittentDatePicker>
        </div>

        <p id = "label" v-if="selectedFrequency !== 'Only as needed'">Time *</p>
        <TimePickerGroup 
          v-if="selectedFrequency !== 'Only as needed'"
          @update-time-pickers="handleTimePickersUpdate">
        </TimePickerGroup>
 
        <el-footer class >
            <div class="buttons" >
              <var-button 
                class = "login-button"
                type="success" 
                block 
                @click="saveMedData"
              >
                Save
              </var-button>
              
            </div>
         </el-footer> 
        <!-- <date-picker v-model:value = "selectedDate"></date-picker> -->
      </div>
    </div>
    </el-container>
</template>

<style lang = "css" scoped> 

.frenquency-select
{
   --field-decorator-outlined-normal-padding-top: 6px;
    --field-decorator-outlined-normal-padding-bottom: 6px;
    --field-decorator-outlined-normal-padding-right: 11px;
    --field-decorator-outlined-normal-padding-left: 11px;
    --field-decorator-blur-color:#555;
}
    .Frequency{
      width:107%;
    }

/* scoped src="@/style/addMed.css" */
    h1{
      color:#55BBC9;
      font-size:17px;
      font-family: Roboto;
    }
    .container3{
      border: 1px solid #eceff1;
      padding-left:5%;
      padding-right:5%;
      margin:5%;
      background-color: #ffffff;
      padding-bottom:5%;
    }
    .calculationPart{
      display:flex;
      width:40%;
      height:100%;
      margin-left:20%;
      border: 4px solid #1890FF;
      border-radius:10px 10px 10px 10px;
      margin:0;
      padding:0;
}
.buttons{
  height:30%;
  width:100%;
}

#textarea1{
  background-size: 100% 4rem;
  border: 1px solid  #DDDDDD;
  width: 96%;
  padding: 2% ;
  font-size:99%;
  color:black;
  font-family: arial;
  margin-top:3%;
  height:10px;
}

.row-input{
  color: black;
  background-color: white;
  border: 1px solid #ccdde9;
  width: 100.5%;
  height: 20%;
  border-radius: 5px;
  padding-left: 2%;
  outline: none;
  font-size:100%;
  position:relative;
  z-index: 1;
  padding-bottom:6px;
  padding-top:6px;
}
select{
  appearance: none;
}
.container-flex{
  display:flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  z-index: 1;
}

.container-block{
  display:inline-block;
  width:50%;
  
}

.BellBtn{
  font-size: 30px;
  color: #1890FF;
  position:relative;
  margin-left:60%;
  size:40%;
}

.note{
  position:relative;
  width:130px ; 
  height:30px;
  top:7%;
  left:2%;
  font-size:110%;
  border-radius:10px 10px 10px 10px;
  background-color:#56569D;
  text-align: center;
  color:white;
  cursor: pointer;
  
}
.note:hover{
  background-color: grey;
}

#date{
  margin-top: 2%; 
  width:100.5%; 
}
.number{
  display: block;
  float:center;
  background-color: rgb(253, 248, 248);
  bottom: 13%;
  width:1%;
  position:relative;
  font-size:200%;
  color:#0b437a;
  margin-left:12%;
  margin-right:5%;
  
}
.increaseButton{
  font-size:180%;
  margin-left:30%;
  color:#56569D;
  position:relative;
  top:4px;
  
}

.decreaseButton{
  font-size:180%;
  margin-right:10%;
  color:#9F9FC8;
  top:4px;
  position:relative;
}

.calculationPart{
  display:flex;
  width:40%;
  height:80%;
  border: 2px solid#9F9FC8;
  /* border: 2px solid #1890FF; */
  border-radius:10px;
  justify-content: center;
  padding-left:10%;
  padding-right:10%;
  margin-left:17%;
  margin-top:5%;
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
    background-color: #1890FF;
    border: none;
    font-size:130%;
    color: #ffffff;
    padding: 0px;
    width: 50%;
    text-align: center;
    transition-duration: 0.6s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    left:20%;
    border-radius:10px 10px 10px 10px; 
    height: 4%;
    margin-top:40px;
    line-height: -50px;
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
  overflow-y: auto;
  display: flex;
  align-items: center;
  height: 100%;
  width:100%;
  background-color:#006973;
  overflow: auto;
  flex-direction: column;
  margin: 0 ;
  }

#container2{
  overflow-y: auto;
  padding-left:auto;
  padding-right:auto;
  align-items: center;
  background-color: rgb(251, 251, 255);
  height:200%;
  width:100%;
  padding-bottom:100px;
  justify-content: center;
  align-items: center;
  display:inline-block;
  }

#title{
  font-size: 100%;
  position:relative;
  color:#FFFFFF;
  font-family: system-ui;
  top:13%;
  width:150%;
  padding-top:6.5%;
  }

#label{   
  width:95%;
  font-weight:600;
  font-size: 16px;
  color:  #01385C;
  text-align: left;
  margin-bottom:3px;
  margin-top:4%;
  font-family: Roboto;
  margin-left:8px;
  }

input{
  align-items: center;
  width:100%;    
  font-size:90%;   
  background-color: white;
  border:none; 
  border : 1px solid #ccdde9;
  color: black;
  padding:5%;
  border-radius: 5px;
  font-family: system-ui;
  box-sizing: border-box;
  } 

input[type="time"] {
  width:30%;
  height:50px;
  padding:2%;
  padding-left:3%;
  font-size:100%;
  size:5%;
  font-family:system-ui;
  padding-top:1%;
  margin-top:1.5%;
  position:relative;
  margin-right:2%;
  }

  input:focus
  { 
  outline-style: none;
  border-bottom: 1px solid #b5b7c2;
  }

  .backBtn{
    color:#FFFFFF;
    position:relative;
    right:150%;
    top:30%;
    }

.menu {
  display: inline-block;
  position:absolute;
  top:25%;
  right:40%;
  height:auto;
  width:50%;
  }

.selected-option {
  width: 120%;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid white;
  color:#008866;
  font-size:50%;
  letter-spacing:1px;
  position: relative;
  z-index: 3;
  }

.login-button{
  margin-top:5%;
  margin-left:2.5%;
  width: 95%;
  height: 350%;
  margin-bottom: 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size:17px;
  }

.login-button{
  color:white;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  background-color: transparent;
  background-color:#006973;
  border: 2px solid white;
  transition: background-color 0.5s, color 0.5s;
  }

option {
  padding-left: 20px;
  background-image: url("@/assets/capsulesblue.png");
  background-repeat: no-repeat;
  }

</style>

<style>
  .el-input__inner {
    padding: 6px 0px;
    font-family: Roboto;
    font-size: 16px;
    ;
  }
  .el-input
  {
    --el-input-height:37.6px;
    --el-input-border-color:#555;
  }

  .var-button__content
  {
    justify-content: center;
  }
</style>

<script>
import DailyDatePicker from "@/component/addMedPage/DailyDatePicker.vue";
import TimePickerGroup from "@/component/addMedPage/TimePickerGroup.vue";
import IntermittentDatePicker from "@/component/addMedPage/IntermittentDatePicker.vue";
import SelectWithImage from "@/component/addMedPage/SelectWithImage.vue";
import AutoComplete from "@/component/addMedPage/AutoComplete.vue";
import axios from 'axios';
import { mapGetters } from 'vuex';
import { ref } from 'vue'
import { format } from 'date-fns';
import { Snackbar } from '@varlet/ui'
import { StyleProvider } from '@varlet/ui'



const dosage = ref();
const note = ref("");
const selectedFrequency = ref("Daily medication");
const medName = ref();
const category = ref("Pill");
const TimeData = ref([new Date().setHours(8, 0, 0, 0)]);
const StartDate = ref();
const EndDate = ref([]);
const EndDateSingle = ref();
const duration = ref();

const largeSnackBar = {
  '--snackbar-width': '512px'
}

export default {
  components: {DailyDatePicker,IntermittentDatePicker,
               TimePickerGroup,SelectWithImage,AutoComplete},
  computed: {
    ...mapGetters('user', ['loggedInUser']),
    changeToTrue() {
      return this.$store.changeToTrue;
    },
    
  },
  
  methods: {

    createSnackbar(type) {
      Snackbar[type]("Medication save")
      if (type === 'loading') {
        setTimeout(() => {
          Snackbar.success("加载成功")
        }, 2000)
      }
    },
    formatDate(dateString) {
      return format(new Date(dateString), "yyyy-MM-dd"); 
    },

    formatTime(dateString) {
      return format(new Date(dateString), 'HH:mm'); 
    },

    onMedSelected(selectedValue) {
      medName.value = selectedValue;

    },

    onCategorySelected(selectedValue) {
      category.value = selectedValue;

    },

    handleTimePickersUpdate(newTimePickers) {
      TimeData.value = newTimePickers;
    },

    handleStartDate(newStartDate) {
      StartDate.value = newStartDate; // 或其他你想做的操作
    },
    handleEndDate(newEndDate) {
      EndDate.value = newEndDate; // 或其他你想做的操作
    },
    handleduration(newDuration){
      duration.value = newDuration;
    },

    getEndDate()
    {
        if(selectedFrequency.value == "Daily medication"||selectedFrequency.value == "Intermittent medication")
        {
            EndDateSingle.value = EndDate.value[EndDate.value.length-1];
        }
    },

    formatArray()
    {
      EndDate.value = EndDate.value.map(date => this.formatDate(date));
      TimeData.value = TimeData.value.map(date => this.formatTime(date));
    },

    checkBeforeSave()
    {
      StyleProvider(largeSnackBar)
      if(medName.value == null)
      {
        Snackbar['warning']("The medication name has not been entered.")
        return false;
      }
      else if(dosage.value == null||dosage.value=="")
      {
        Snackbar['warning']("The medication dosage has not been entered.")
        return false;
      }
      else if(StartDate.value == null)
      {
        Snackbar['warning']("The start date for taking the medication has not been selected.")
        return false;
      }
      else if(EndDate.value.length <= 1)
      {
        Snackbar['warning']("The end date for taking the medication has not been selected.")
        return false;
      }
      else if(TimeData.value.includes(null)||TimeData.value.length==0)
      {
        console.log(TimeData.value.includes(null));
        console.log(TimeData.value);
        Snackbar['warning']("The time for taking the medication has not been setted.")
        return false;
      }

      return true;
    },
    // New function for medicineData
    saveMedData() {

      if(this.checkBeforeSave()&&selectedFrequency.value!="Only as needed")
      {
        this.getEndDate();
        this.formatArray();
        const dataObject = {
          userId: this.loggedInUser.userId,
          medicationName: medName.value,
          medicationCategory: category.value,
          frequency: selectedFrequency.value,
          dosageUnit: dosage.value,
          startDate: this.formatDate(StartDate.value),
          endDate: this.formatDate(EndDateSingle.value),
          note: note.value,
          duration:duration.value,
          reminderDate: JSON.stringify(EndDate.value),
          reminderTimes: JSON.stringify(TimeData.value),
        };

        console.log(dataObject)
        
        const backendurl = 'http://localhost:8181/medications/create';
        
        axios
          .post(backendurl, dataObject)
          .then((response) => {
            console.log('Data sent successfully', response);
            this.$router.push({path: '/Home'})
            Snackbar['success']("Medication save")
          })
          .catch((error) => {
            console.log('Data sending failed', error);
            Snackbar['error']("Medication save fail")
          });
          }

  }, //


},

  mounted(){
            document.title = 'Add Medication | ArthriCare';
           // this.selectValue();

                console.log(this.loggedInUser.userId);
        },
        setup(){
        
        }
}

</script>
