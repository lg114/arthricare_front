<!--intermitten date picker component-->
<!--
    Author: zhenxi zhang
    Student number: 6062027
    Date: 2023/10/20  
-->
<template>
  <p id="label">Start Time *</p>
  <VueDatePicker v-model="StartDate" :enable-time-picker="false" auto-apply partial-flow :flow="['calendar']" 
  :format="formatStartDate" ref="StartTimeDatePicker" disabled>
    <template #clear-icon="{  }">
       <img class="input-slot-image"/>
    </template>
  </VueDatePicker>
  <p id="label">End Time *</p>
  <VueDatePicker v-model="EndDate" :enable-time-picker="false" multi-dates :clearable="false" :format="formatEndDate" @closed="alertFn" ref="EndTimeDatePicker"
  :allowed-dates="allowedDates" :disabled="shouldBeDisabled">
    <template #left-sidebar="props" >
      <div class="interval-label">Interval Days:</div>
      <button class="custom-button-disable" disabled>+ 1 Day</button>
       <button class="custom-button-disable" disabled>+ 3 Days</button>
      <button class="custom-button-disable" disabled>+ 1 Week</button>
      <button class="custom-button-disable" disabled>+ 1 Month</button>
      <div class="interval-label">Eat Times:</div>
      <button class="custom-button" @click="repeat(props,1)">+ 1 Times</button>
      <button class="custom-button" @click="repeat(props,2)">+ 2 Times</button>
      <button class="custom-button" @click="repeat(props,4)">+ 4 Times</button>
      <button class="custom-ClearButton" @click="clearCalendar(props)">Clear</button>
    </template>
    <template #action-preview="{ value }">
        {{ getDate(value) }}
    </template>
  </VueDatePicker>
</template>

<script setup>
import { ref, watch,computed,defineProps,defineExpose} from 'vue';
import { addDays,} from 'date-fns';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  StartDateFromParent: {
    type: Number,
    default: 0
  },
  EndDateFromParent: {
    type: Array,
    default: () => [new Date()]
  },
  Duration: {
    type: String,
    default: "defalut value"
  },
});

const StartDate = ref(new Date(props.StartDateFromParent));
const EndDate = ref(props.EndDateFromParent);
const StartTimeDatePicker = ref();
const EndTimeDatePicker = ref();
const formattedOutput = ref(props.Duration);
const IntervalDays = ref(0);
const RepeatTimes = ref(0);
const perferUnit = ref("days");


function fetchData()
{
    return EndDate.value;
}
function fetchDurationData(){return formattedOutput.value}
defineExpose({ fetchData,fetchDurationData });

watch(() => props.StartDateFromParent, (newValue) => {
  console.log("StartDate watch: "+newValue);
  StartDate.value = new Date(newValue);
}, { deep: true });

watch(() => props.EndDateFromParent, (newValue) => {
  console.log("EndDate watch: "+newValue);
  EndDate.value = newValue;
}, { deep: true });

watch(() => props.Duration, (newValue) => {
    console.log("Duration watch: " + newValue);
    formattedOutput.value = newValue;
    perferUnit.value = checkPeriodType(newValue);
    EndTimeDatePicker.value.openMenu();
    
    setTimeout(() => {
        EndTimeDatePicker.value.closeMenu();
    }, 50); // 100 milliseconds = 0.1 seconds
}, { deep: true });


function checkPeriodType(duration) {
  if (duration.includes('day')) {
      return 'days';
    } else if (duration.includes('week')) {
      return 'weeks';
    } else if (duration.includes('month')) {
      return 'months';
    } 
  }

const repeat = (props,repeatTime) => {
if(IntervalDays.value!=0)
{
  for (let i = 0; i < repeatTime; i++) {
    const arrayLength = props.modelValue.value.length;
    const lastElement = props.modelValue.value[arrayLength - 1];
    props.modelValue.value.push(addDays(lastElement,IntervalDays.value))
  }
  RepeatTimes.value += repeatTime;
}
}

const clearCalendar = (props) => {

EndDate.value.splice(1);
props.modelValue.value.splice(1);
IntervalDays.value = 0;
RepeatTimes.value = 0;
formattedOutput.value = "";

};

const getDate = (SelectedDate) => {
if(formattedOutput.value&&IntervalDays.value==0&&RepeatTimes.value==0)
{
  const numbers = formattedOutput.value.match(/\d+/g).map(Number);
  RepeatTimes.value = numbers[1]-2;
  perferUnit.value = checkPeriodType(formattedOutput.value);
  if(perferUnit.value == "weeks")
  {
    IntervalDays.value = numbers[0]*7;
  }else if(perferUnit.value == "months")
  {
    IntervalDays.value = numbers[0]*30;
  }
  else
  {
    IntervalDays.value = numbers[0]*1;
  }
  return formattedOutput.value;
}

if (Array.isArray(SelectedDate) && SelectedDate.length >= 2)  
{
if(perferUnit.value == "weeks")
{
  const weeks = Math.round(IntervalDays.value / 7);
  formattedOutput.value = `Every ${weeks} week(s) eat once, eat ${RepeatTimes.value+2} times `
}else if(perferUnit.value == "months")
{
  const months = Math.round(IntervalDays.value / 30);
  formattedOutput.value = `Every ${months} month(s) eat once, eat ${RepeatTimes.value+2} times `
}else
{
    formattedOutput.value = `Every ${IntervalDays.value} day(s) eat once, eat ${RepeatTimes.value+2} times `
}
}
  return formattedOutput;
  
};

const formatEndDate = () => {

  if(EndDate.value[0]&&!EndDate.value[1])
  {
      const day1 = EndDate.value[0].getDate();
      const month1 = EndDate.value[0].getMonth() + 1;
      const year1 = EndDate.value[0].getFullYear();
      return `${day1}/${month1}/${year1} -  `;
  }
  else
  {
    console.log(formattedOutput.value);
      perferUnit.value = checkPeriodType(formattedOutput.value);
      return formattedOutput.value;
  }

};

const formatStartDate = () => {

  if(StartDate.value)
  {
      const day1 = StartDate.value.getDate();
      const month1 = StartDate.value.getMonth() + 1;
      const year1 = StartDate.value.getFullYear();
      return `${day1}/${month1}/${year1}`;
  }
  else
  {
     return "";
  }

};

const shouldBeDisabled = computed(() => StartDate.value == null);

const alertFn = () => {
if(!EndDate.value.includes(null)&&EndDate.value.length>=2)
{
  console.log();
}else{
  IntervalDays.value = 0;
  RepeatTimes.value = 0;
  formattedOutput.value = "";
}

}

const allowedDates = computed(() => {
  return [
    StartDate.value
  ];
});


</script>

<style scoped>
.custom-button-disable {
  background: none;
  border: none;
  color: #A9A9A9;
  font-size: var(--dp-font-size);
  font-family:var(--dp-font-family);
  cursor: pointer;
  outline: none;
  text-align: left !important; /* Force left-alignment */
  padding: 5px 0;
  margin-left: 0; /* Ensure no margin is moving the text */
  
  display: inline-block; /* Treat inline elements like block */
  width: 100%; /* Optional: Use if you want to ensure full width */
  min-width: 85px;
  display: block;
}

.custom-button {
  background: none;
  border: none;
  color: #212121;
  font-size: var(--dp-font-size);
  font-family:var(--dp-font-family);
  cursor: pointer;
  outline: none;
  text-align: left !important; /* Force left-alignment */
  padding: 5px 0;
  margin-left: 0; /* Ensure no margin is moving the text */
  
  display: inline-block; /* Treat inline elements like block */
  width: 100%; /* Optional: Use if you want to ensure full width */
  min-width: 85px;
  display: block;
}
.custom-button:hover {
   background-color: #E5E5E5;
}

.interval-label
{
font-weight: bold;
color: #212121;
text-align: left !important;
white-space: nowrap;
font-size: var(--dp-font-size);
font-family:var(--dp-font-family);
}

.custom-ClearButton
{
  background: #1976d2;
  border: none;
  color: #fff;
  font-size: var(--dp-font-size);
  border-radius: var(--dp-border-radius);
  cursor: pointer;
  outline: none;
  text-align: center !important; /* Force left-alignment */
  padding: 5px 0;
  margin-top: 15px; /* Ensure no margin is moving the text */
  display: inline-block; /* Treat inline elements like block */
  width: 100%; /* Optional: Use if you want to ensure full width */
  min-width: 85px;
  display: block;
}

#label{   
width:95%;
font-weight:600;
font-size: 16px;
color:  #01385C;
text-align: left;
margin-bottom:0%;
margin-top:4%;
margin-bottom: 3px;
font-family: Roboto;
margin-left:8px;
}

</style>

<style>
.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
  padding-right: 0px;
}

.dp__theme_light
{
  --dp-border-color:#555;
}
</style>



