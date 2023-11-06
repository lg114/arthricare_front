<!--time picker group component-->
<!--
    Author: zhenxi zhang
    Student number: 6062027
    Date: 2023/10/20  
-->
<template>
    <div class="time-picker-wrapper">
        <el-time-picker 
          v-for="(time, index) in timePickers"
          :key="index"
          v-model="timePickers[index]" 
          format="HH:mm"
          style="width: 32%;height: 37.6px;"
          :clearable="false"
          @change=" handleFirstTimeChange(index)">
      </el-time-picker>
      
    </div>
    <div style = "margin-top: 8%; margin-bottom: 3px;margin-left: 8px; font-weight: 600;color: #01385C;" >Time Interval</div>
    <div class = "plus-and-mins-controller">
      <div class = "time-gap">
        <el-input
          v-model="timeGap"
          type="number"
          class="input-with-select"
          style="width: 160px"
        >
          <template #append>
            <el-select v-model="timeUnit" style="width: 110px">
              <el-option label="Minutes" value="Minutes" />
              <el-option label="Hours" value="Hours" />
            </el-select>
          </template>
        </el-input>
      </div>
      <div class = "plus-and-mins-button">
        <var-icon 
            @click="addTimePicker" 
            class="add-icon"
            name="plus-circle-outline">
        </var-icon>
        <var-icon 
            @click="removeTimePicker" 
            class="add-icon"
            name="minus-circle-outline">
        </var-icon>
      </div>
    </div>

</template>


  
<script setup>
import { ElTimePicker } from 'element-plus';
import { StyleProvider } from '@varlet/ui';
import { ref, watch, onMounted,defineProps, defineExpose} from 'vue';


const timeUnit = ref("Hours");
const timePickers = ref(props.TimeArrayFromParent);
const timeGap = ref(null);

const props = defineProps({
  TimeArrayFromParent: {
    type: Array,
    default: () => []
  }
});

function fetchData()
{
    return timePickers.value;
}
defineExpose({ fetchData });

watch(() => props.TimeArrayFromParent, (newValue) => {
  console.log("TimeArray watch: "+newValue);
  console.log("timePicker watch: "+timePickers.value)
  if(newValue)
  {
    console.log("TimeArray watch: "+newValue);
    //timePickers.value = newValue
  }

}, { deep: true });

watch([timeGap,timeUnit], () => {
  updateTimeArray();
}, { deep: true });


function addTimePicker() {
  timePickers.value.push(null);
  updateTimeArray();
}

function removeTimePicker() {
  if (timePickers.value.length > 1) {
    timePickers.value.pop();
  }
}

const smallInput = {
  '--field-decorator-outlined-normal-padding-top': '6px',
  '--field-decorator-outlined-normal-padding-bottom': '6px',
  '--field-decorator-outlined-normal-padding-left': '11px',
  '--field-decorator-outlined-normal-padding-right': '11px',
  "--field-decorator-blur-color":"#555",
};

function setSmallInput() {
  StyleProvider(smallInput);
}

function updateTimeArray() {
  let multiplier;
  let inputValueValid = false;
    
    switch(timeUnit.value) {
        case 'Minutes':
            multiplier = 60 * 1000; // milliseconds in a minute
            if(timeGap.value >= 0 && timeGap.value <= 60)
            {
              inputValueValid = true
            }
            else{inputValueValid = false}
            break;
        case 'Hours':
        default:
            multiplier = 60 * 60 * 1000; // milliseconds in an hour
            if(timeGap.value >= 0 && timeGap.value <= 12)
            {
              inputValueValid = true
            }
            else{inputValueValid = false}
            break;
    }
    if(inputValueValid)
    {
      let startDate = new Date(timePickers.value[0]);
      let tomorrowStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);  // 明天开始的时间

      for (let i = 1; i < timePickers.value.length; i++) {
          let newTime = new Date(startDate.getTime() + timeGap.value * i * multiplier);

          if (newTime < tomorrowStart) {
              timePickers.value[i] = newTime;
          } else {
            timePickers.value.splice(i);
            break;
          }
      }
    }

}

function handleFirstTimeChange(index)
{
  if(index == 0)
  {
    updateTimeArray();
  }
}


onMounted(() => {
  setSmallInput();
});
</script>

  
  
  <style scoped>

    ::v-deep .el-input__inner {
        text-align: center;
    }
  
    .time-picker-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 10px;
        gap: 6px;
        
    }

    .add-icon {
        cursor: pointer;
        font-size: 30px;
    }

    .plus-and-mins-controller
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap :6px;

    }
    .time-gap
    {
      display: flex;
      align-items: center;
      gap:5px;
    }

    .plus-and-mins-button
    {
      display: flex;
      align-items: center;
      gap: 8px;
    }

  </style>
  