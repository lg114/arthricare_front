<template>
  <div class="horizontal-calendar">
      <div class="buttons">
          <button :style="{ backgroundColor: backBtnColor }" @click="goBackOneWeek">&#8249;</button>
          <div class="button-space">
              {{ getMonthDisplay }}
          </div>
          <button :style="{ backgroundColor: forwardBtnColor }" @click="goForwardOneWeek">&#8250;</button>
      </div>
      <div class="dates">
          <div v-for="(date, index) in weekDates" :key="index" @click="selectDate(index)">
              <div class="weekday" :class="{ 'selected-date': index === selectedDateIndex }">
                  {{ date.format('ddd') }}<br />
                  {{ date.format('D') }}
              </div>
          </div>
      </div>
      <el-divider><div v-if = "isDateBeforeToday" @click="goToToday" style ="color: #1890ff; font-weight: bold;">Today&gt;&gt;</div></el-divider>
      <div class="selected-date-display">
          {{ selectedDateDisplay }}
      </div>
      <el-divider><div v-if = "isDateAfterToday" @click="goToToday" style ="color: #1890ff; font-weight: bold;">&lt;&lt;Today</div></el-divider>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  
  export default {
      name: 'HorizontalCalendar',
      data() {
      return {
          currentDate: dayjs(),
          // 初始值为-1，表示没有选中日期
          selectedDateIndex: -1,
          backBtnColor: '#1890ff',
          forwardBtnColor: '#1890ff',
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
          selectedDateDisplay() {
            if (this.selectedDateIndex !== -1) {
                const selectedDate = this.weekDates[this.selectedDateIndex];
                const today = dayjs().startOf('day');
                const yesterday = dayjs().subtract(1, 'day').startOf('day');
                const tomorrow = dayjs().add(1, 'day').startOf('day');

                if (selectedDate.isSame(today, 'day')) {
                    return 'Today, ' + selectedDate.format('MMM D');
                } else if (selectedDate.isSame(tomorrow, 'day')) {
                    return 'Tomorrow, ' + selectedDate.format('MMM D');
                } else if (selectedDate.isSame(yesterday, 'day')) {
                    return 'Yesterday, ' + selectedDate.format('MMM D');
                } else {
                    return selectedDate.format('ddd, MMM D');
                }
            }
            return '';
          },
          isDateBeforeToday() {
          if (this.selectedDateIndex !== -1) {
              const selectedDate = this.weekDates[this.selectedDateIndex].startOf('day');
              const today = dayjs().startOf('day');
              return selectedDate.isBefore(today);
          }
          return false;
          },
          isDateAfterToday() {
              if (this.selectedDateIndex !== -1) {
                  const selectedDate = this.weekDates[this.selectedDateIndex].startOf('day');
                  const today = dayjs().startOf('day');
                  return selectedDate.isAfter(today);
              }
              return false;
          },
      },
      methods: {
          goForwardOneWeek() {
              this.currentDate = this.currentDate.add(1, 'week');
              this.selectedDateIndex = this.getIndexOfCurrentDate();
              this.emitSelectedDate();
              this.forwardBtnColor = '#d3d3d3';
              setTimeout(() => {
                this.forwardBtnColor = '#1890ff';
              }, 1000);
          },
          goBackOneWeek() {
              this.currentDate = this.currentDate.subtract(1, 'week');
              this.selectedDateIndex = this.getIndexOfCurrentDate();
              this.emitSelectedDate();
              this.backBtnColor = '#d3d3d3';
              setTimeout(() => {
                this.backBtnColor = '#1890ff';
              }, 1000);
          },
          selectDate(index) {
              this.selectedDateIndex = index;
              this.emitSelectedDate();
          },
          emitSelectedDate() {
              if (this.selectedDateIndex !== -1) {
              const selectedDate = this.weekDates[this.selectedDateIndex];
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
          goToToday() {
            this.currentDate = dayjs();
            this.selectedDateIndex = this.getIndexOfCurrentDate();
            this.emitSelectedDate();
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
      padding-top: 15px;
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
      margin-top: 10px;
      box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2);
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
      box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2);
      transition: background-color 0.5s, transform 0.5s;
  }
  .selected-date-display {
      grid-column: 2 / span 2;
      font-weight: bold;
      text-align: center;
      color: #1890ff;
  }
</style>
