<template>
  <div class="horizontal-calendar">
    <div class = "buttons">
      <button @click="goBackOneWeek">&#8249;</button>
      <div class="button-space">
        {{ getMonthDisplay }}
      </div>
      <button @click="goForwardOneWeek">&#8250;</button>
    </div>
    <div class = "dates">
      <div v-for="(date, index) in weekDates" :key="index" @click="selectDate(index)">
          <div class="weekday" :class="{ 'selected-date': index === selectedDateIndex }">
            {{ date.format('ddd') }}<br>
            {{ date.format('D') }}
          </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import dayjs from 'dayjs';

  export default {
    name: "HorizontalCalendar",
    data() {
      return {
        currentDate: dayjs(),
        // 初始值为-1，表示没有选中日期
        selectedDateIndex: -1,
      };
    },
    created() {
      // 初始化 selectedDateIndex 为当前日期的索引
      this.selectedDateIndex = this.getIndexOfCurrentDate();
    },
    computed: {
      weekDates() {
        const startOfWeek = this.currentDate.startOf('week');
        const dates = [];
        for (let i = 0; i < 7; i++) {
          dates.push(startOfWeek.add(i, 'day'));
        }
        return dates;
      },
      // 获取两个月份的交界处的显示信息
      getMonthDisplay() {
        const startOfWeek = this.currentDate.startOf('week');
        const endOfWeek = this.currentDate.endOf('week');

        if (startOfWeek.month() === endOfWeek.month()) {
          return startOfWeek.format('MMMM YYYY');
        } else {
          return `${startOfWeek.format('MMMM')} - ${endOfWeek.format('MMMM YYYY')}`;
        }
      },
    },
    methods: {
      goBackOneWeek() {
        this.currentDate = this.currentDate.subtract(1, 'week');
        this.selectedDateIndex = this.getIndexOfCurrentDate();
        this.selectedDateIndex = -1;
        this.emitSelectedDate();
      },
      goForwardOneWeek() {
        this.currentDate = this.currentDate.add(1, 'week');
        this.selectedDateIndex = this.getIndexOfCurrentDate();
        this.selectedDateIndex = -1;
        this.emitSelectedDate();
      },
      selectDate(index) {
        this.selectedDateIndex = index;
        this.emitSelectedDate();
      },
      emitSelectedDate() {
        if (this.selectedDateIndex !== -1) {
          const selectedDate = this.currentDate.startOf('week').add(this.selectedDateIndex, 'day');
          this.$emit('date-selected', selectedDate.toDate());
        }
      },
      getIndexOfCurrentDate() {
        // 获取当前日期的年月日
        const currentYear = this.currentDate.year();
        const currentMonth = this.currentDate.month();
        const currentDay = this.currentDate.date();
  
        // 在当前周内查找当前日期的索引
        for (let i = 0; i < 7; i++) {
          const date = this.currentDate.startOf('week').add(i, 'day');
          if (date.year() === currentYear && date.month() === currentMonth && date.date() === currentDay) {
            return i;
          }
        }
        // 如果没有找到当前日期，返回默认值-1
        return -1;
      },
    },
  };
</script>
    
<style scoped>
    .horizontal-calendar{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }
    .buttons{
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-left: 20px;
      margin-right: 20px;
    }
    .button-space {
      width: 225px;
      text-align: center;
      color: #1890FF;
      font-weight: bold;
      padding-top: 15px;
    }
    .dates {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px;
    }
    .horizontal-calendar button{
        cursor: pointer;
        width: 30px;
        height: 35px;
        font-size: 20px;
        color: #ffffff;
        background-color: #1890FF;
        border: 0ch;
        border-radius: 10px;
        margin-top: 10px;
    }
    .horizontal-calendar button:hover{
        background-color: lightgray;
    }
    .weekday{
        width: 40px;
        height: 40px;
        text-align: center;
        margin: 1px;
        color: #1890FF;
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
    .selected-date{
        background-color: #1890FF;
        color: white;
        border-radius: 10px;
    }
</style>
  