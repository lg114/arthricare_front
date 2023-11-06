<!--   
    Author: Lin Gan
    Student number: 6502933
    Date: 2023/10/20
    Description:
    The component utilizes the vue-hash-calendar component to display a horizontal calendar with specific features and functionalities.
    The themeColor is used to define the color scheme for the calendar component. It is set based on the mounted lifecycle hook, utilizing the ref function from Vue.
    The selectedDate variable is used to store the currently selected date in the calendar.
    The handleChange method is triggered when a date is selected in the calendar. It parses the selected date, formats it into a standard format, and emits an event called 'date-selected' with the parsed date as its payload.
    The parsing of the selected date involves separating the date and time parts, extracting the necessary components (month, day, year, time, meridiem), and converting the time to a 24-hour format if it is in PM.
    The formatted date is logged to the console, and the parsed date is emitted using the this.$emit method.
-->
<template>
    <vue-hash-calendar class = "calendar" lang="EN" show-arrow :scroll-change-date="true" :show-week-view="true" :show-today-button="true" picker-type="date" :theme-color="themeColor" format="MM DD,YY at hh:mm F" @change="handleChange">
        <template v-slot:week="scope">
            <div class = "week">
                <span style="font-weight: bold;">{{ `${scope?.week}` }}</span>
            </div>
        </template>
        <template v-slot:day="scope">
            <div class = "date">
                <span style="font-weight: bold;">{{ scope?.date?.day }}</span>
            </div>
        </template>
        <template #arrow="scope">
            <div class = "arrow">
                {{ scope?.isShowWeek ? '&darr;' : '&uarr;' }}
            </div>
        </template>
    </vue-hash-calendar>
</template>

<script>
  import { ref } from 'vue';
  import moment from 'moment';

  export default {
      name: 'HorizontalCalendar',
      components: {},

      mounted() {
          this.themeColor = ref({
              'main-color': '#006973',
              'main-font-color': '#006973',
              'bg-color': 'white',
          });
      },

      data() {
          return {
              themeColor: null,
              selectedDate: null,
          };
      },

      methods: {
        handleChange(selectedDate) {
            this.selectedDate = selectedDate;

            if (this.selectedDate !== null && this.selectedDate !== undefined) {
                const [datePart, timePart] = this.selectedDate.split(' at ');
                const [month, day, year] = datePart.split(' ');
                const [time, meridiem] = timePart.split(' ');

                let hour, minute;
                [hour, minute] = time.split(':');

                if (meridiem === 'pm') {
                    hour = parseInt(hour, 10) + 12;
                }

                const parsedDate = new Date(`${year}-${month} ${day} ${hour}:${minute}`);
                const formattedDate = moment(parsedDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

                if (!isNaN(parsedDate)) {
                    console.log('Selected date:', formattedDate);
                    this.$emit('date-selected', parsedDate);
                    console.log(parsedDate);
                } else {
                    console.error('Invalid date:', parsedDate);
                }
            }
        },
      },
  };
</script>

<style scoped>
  .calendar{
    font-size: 4vw;
    font-weight: bold;
  }
  .week{
    font-size: 4vw;
  }
  .date{
        font-size: 4vw;
    }
.arrow{
    color: #006973;
}
</style>
