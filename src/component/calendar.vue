<template>
    <vue-hash-calendar lang="EN" :scroll-change-date="true" :show-week-view="true" :show-today-button="true" picker-type="date"  :show-arrow="true" :theme-color="themeColor" format="MM DD,YY at hh:mm F" @change="handleChange">
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
              // 'main-color': 'red',
              // 'bg-color': 'grey',
              // 'main-font-color': 'blue',
              // 'vice-font-color': 'green',
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

  .horizontal-calendar {
      /* background-color: #F7F7F7; */
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 1fr auto auto 1fr;
      align-items: center;
      gap: 5px;
  }

  .buttons {
      grid-column: 1 / span 4;
      display: flex;
      justify-content: space-around;
      margin-left: 25px;
      margin-right: 25px;
  }

  .button-space {
      grid-column: 2 / span 2;
      text-align: center;
      color: #1890ff;
      font-weight: bold;
      padding-top: 10px;
      width: 255px;
  }

  .dates {
      grid-column: 1 / span 4;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px;
  }

  .horizontal-calendar button {
      cursor: pointer;
      width: 30px;
      height: 35px;
      font-size: 20px;
      color: #ffffff;
      background-color: #1890ff;
      border: 0ch;
      border-radius: 10px;
      margin-top: 5px;
      transition: background-color 0.5s, transform 0.5s;
  }

  .weekday {
      width: 40px;
      height: 40px;
      text-align: center;
      margin: 1px;
      color: #1890ff;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      padding: -1px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }

  .selected-date {
      background-color: #1890ff;
      color: white;
      border-radius: 10px;
      transition: background-color 0.5s, transform 0.5s;
  }
  .selected-date-display {
      grid-column: 2 / span 2;
      font-weight: bold;
      text-align: center;
      color: #1890ff;
      margin-top: -15px ;
  }
  .el-divider {
    margin-top: 10px;
    border-top: 1.5px solid lightgrey;
  }
</style>
