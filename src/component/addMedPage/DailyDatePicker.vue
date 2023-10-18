<template>
    <p id="label">Start Time *</p>
    <VueDatePicker v-model="StartDate" :enable-time-picker="false" auto-apply partial-flow :flow="['calendar']" :format="formatStartDate" ref="StartTimeDatePicker">
      <template #clear-icon="{  }">
         <img class="input-slot-image"/>
      </template>
    </VueDatePicker>
    <p id="label">End Time *</p>
    <VueDatePicker v-model="EndDate" :enable-time-picker="false" range fixed-start :clearable="false" :format="formatEndDate" @update:model-value="handleDate" ref="EndTimeDatePicker">
      <template #left-sidebar="props" >
        <button class="custom-button" @click="addDaysToCurrentDate(props,1)">+ 1 Day</button>
        <button class="custom-button" @click="addDaysToCurrentDate(props,3)">+ 3 Days</button>
        <button class="custom-button" @click="addWeeksToCurrentDate(props,1)">+ 1 Week</button>
        <button class="custom-button" @click="addWeeksToCurrentDate(props,2)">+ 2 Weeks</button>
        <button class="custom-button" @click="addMonthsToCurrentDate(props,1)">+ 1 Month</button>
        <button class="custom-button" @click="addMonthsToCurrentDate(props,6)">+ 6 Months</button>
        <button class="custom-button" @click="addYearsToCurrentDate(props,1)">+ 1 Year</button>
        <button class="custom-button" @click="addYearsToCurrentDate(props,2)">+ 2 Years</button>
        <button class="custom-ClearButton" @click="clearCalendar(props)">Clear</button>
      </template>
      <template #action-preview="{ value }">
          {{ getDate(value) }}
      </template>
    </VueDatePicker>
</template>

<script setup>
import { ref, watch} from 'vue';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


const StartDate = ref();
const EndDate = ref();
const StartTimeDatePicker = ref();
const EndTimeDatePicker = ref();
const formattedOutput = ref();

watch(StartDate, (newStartDate) => {
  if(newStartDate !== null) {
    EndDate.value = [newStartDate, ];
  }
  StartTimeDatePicker.value.closeMenu();
});

const addDaysToCurrentDate = (props,daysToAdd) => {

  if(props.modelValue.value[1])
  {
    props.modelValue.value[1] = addDays(props.modelValue.value[1], daysToAdd)
  }
  else
  {
    props.modelValue.value[1] = addDays(props.modelValue.value[0], daysToAdd)
  }

}
const addWeeksToCurrentDate = (props,daysToAdd) => {
  if(props.modelValue.value[1])
  {
    props.modelValue.value[1] = addWeeks(props.modelValue.value[1], daysToAdd)
  }
  else
  {
    props.modelValue.value[1] = addWeeks(props.modelValue.value[0], daysToAdd);
  }

}
const addMonthsToCurrentDate = (props,daysToAdd) => {
  if(props.modelValue.value[1])
  {
    props.modelValue.value[1] = addMonths(props.modelValue.value[1], daysToAdd)
  }
  else
  {
    props.modelValue.value[1] = addMonths(props.modelValue.value[0], daysToAdd);
  }

}
const addYearsToCurrentDate = (props,daysToAdd) => {
  if(props.modelValue.value[1])
  {
    props.modelValue.value[1] = addYears(props.modelValue.value[1], daysToAdd)
  }
  else
  {
    props.modelValue.value[1] = addYears(props.modelValue.value[0], daysToAdd);
  }

}

const clearCalendar = (props) => {

    if(EndDate.value[1])
    {
      EndDate.value[1] = null;
    }else
    {
      props.modelValue.value[1] = props.modelValue.value[0]
    }
};

const getDate = (SelectedDate) => {

    if (Array.isArray(SelectedDate) && SelectedDate.length > 1) {
      const date1 = new Date(SelectedDate[0]);
      const date2 = new Date(SelectedDate[1]);
      if(date2 > new Date('1970-01-01'))
      {
          const diffInMilliseconds = date2 - date1;
          const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

          
          const day1 = date1.getDate();
          const month1 = date1.getMonth() + 1;
          const year1 = date1.getFullYear();
          const day2 = date2.getDate();
          const month2 = date2.getMonth() + 1;
          const year2 = date2.getFullYear();

          
          if(diffInDays == 0)
          {
            formattedOutput.value = `${day1}/${month1}/${year1} - `;
            return formattedOutput;
          }

          const dateOutput = `${day1}/${month1}/${year1} - ${day2}/${month2}/${year2}`;
          
          if (diffInDays < 7) {
              formattedOutput.value = dateOutput+`, ${Math.abs(diffInDays)} day(s)`;
          } else if (diffInDays < 30) {
              const weeks = Math.round(diffInDays / 7);
              formattedOutput.value = dateOutput+`, ${weeks} week(s)`;
          } else if (diffInDays < 365) {
              const months = Math.round(diffInDays / 30);
              formattedOutput.value = dateOutput+`, ${months} month(s)`;
          } else {
              const years = Math.round(diffInDays / 365);
              formattedOutput.value = dateOutput+`, ${years} year(s)`;
          } 
      }
      else
      {
        const day1 = date1.getDate();
        const month1 = date1.getMonth() + 1;
        const year1 = date1.getFullYear();
        formattedOutput.value = `${day1}/${month1}/${year1} - `
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

const handleDate = (modelDate) => {

  const diffInMilliseconds = modelDate[1] - modelDate[0];
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if(diffInDays == 0)
  {
    EndDate.value[1] = null;
  }
  
}


</script>

<style scoped>

.custom-button {
    background: none;
    border: none;
    color: #212121;
    font-size: var(--dp-font-size);
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
  font-size: 85%;
  color:  #787885;
  text-align: left;
  margin-bottom:0%;
  margin-top:4%;
  margin-bottom: 1%;
  font-family: system-ui;
  margin-left:8px;
}

</style>

<style>
  .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
    padding-right: 0px;
  }
</style>

