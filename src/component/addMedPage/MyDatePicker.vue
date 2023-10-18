<!-- MyDatePicker.vue -->
<template>
    <VueDatePicker 
        v-model="date" 
        range 
        :enable-time-picker="false" 
        ref="dp" 
        :format="format"
    >
        <template #action-preview="{ value }">
            {{ getDate(value) }}
        </template>
    </VueDatePicker>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
const dp = ref();
const diffInDays = ref(0);

const getDate = (dateVal) => {
    if (Array.isArray(dateVal) && dateVal.length > 1) {
        const date1 = new Date(dateVal[0]);
        const date2 = new Date(dateVal[1]);
        const diffInMilliseconds = date2 - date1;
        diffInDays.value = diffInMilliseconds / (1000 * 60 * 60 * 24);
        return `Selected ${Math.abs(diffInDays.value) + 1} days`;
    } else {
        console.error('dateVal is not an array or is empty:', dateVal);
        return ``;
    }
};

const format = (date) => {

    if(date.length>1)
    {
        const day1 = date[0].getDate();
        const month1 = date[0].getMonth() + 1;
        const year1 = date[0].getFullYear();
        const day2 = date[1].getDate();
        const month2 = date[1].getMonth() + 1;
        const year2 = date[1].getFullYear();

        return `${day1}/${month1}/${year1} - ${day2}/${month2}/${year2}, ${Math.abs(diffInDays.value) + 1} days`;
    }

};
</script>

<style>
.dp__theme_light {
    --dp-hover-color: rgb(25 118 210 / 8%)
}
</style>
