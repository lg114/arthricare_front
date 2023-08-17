<template>
    <vue-hash-calendar class = "calendar" lang="EN" :scroll-change-date="true" :show-week-view="true" :show-today-button="true" picker-type="date"  :show-arrow="true" :theme-color="themeColor" format="MM DD,YY at hh:mm F" @change="handleChange">
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
              'main-color': '#1890ff',
              'main-font-color': '#1890ff',
              'bg-color': 'white',
              // 'disabled-font-color': 'yellow'
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
                    console.error('Invalid date:', this.selectedDate);
                }
            }
        },
      },
  };
</script>

<style scoped>
  .calendar{
    font-weight: bold;
  }
</style>
