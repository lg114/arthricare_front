<template>
    <el-scrollbar @scroll.passive="handleScroll">
      <div class="scrollbar-flex-content">
        <p v-for="(date, index) in dates" :key="index" class="scrollbar-demo-item">
          {{ getDayOfWeek(date) }}
          {{ getDateOnly(date) }}
        </p>
      </div>
    </el-scrollbar>
  </template>
  
  <script>
  import dayjs from 'dayjs';
  
  export default {
    data() {
      return {
        startDate: dayjs().subtract(25, 'day'), // 从25天前开始
        daysToShow: 50, // 显示50天
        screenWidth: window.innerWidth, // 获取屏幕宽度
        scrollLeft: 0, // 当前滚动位置
      };
    },
    computed: {
      endDate() {
        return this.startDate.add(this.daysToShow - 1, 'day');
      },
      dates() {
        const dates = [];
        for (let i = 0; i < this.daysToShow; i++) {
          dates.push(this.startDate.add(i, 'day'));
        }
        return dates;
      },
    },
    methods: {
        formatDate(date) {
            return date.format('MM/DD');
        },
        getDayOfWeek(date) {
            return date.format('ddd'); // 获取星期几的缩写，例如：Mon, Tue, ...
        },
        getDateOnly(date) {
            return date.format('D'); // 获取日期，不包含月份，例如：1, 2, ...
        },
        handleScroll(event) {
            this.scrollLeft = event.target.scrollLeft;
            const maxScrollLeft = this.daysToShow * 100 - this.screenWidth;
    
            if (this.scrollLeft === 0 && this.scrollLeft > this.screenWidth) {
            this.startDate = this.startDate.subtract(1, 'week');
            this.scrollLeft = maxScrollLeft;
            } else if (this.scrollLeft >= maxScrollLeft && this.scrollLeft < this.screenWidth) {
            this.startDate = this.startDate.add(1, 'week');
            this.scrollLeft = 0;
            }
        },
    },
  };
  </script>
  
  <style scoped>
  .scrollbar-flex-content {
    display: flex; /* 设置足够宽的容器以适应所有项目 */
  }
  
  .scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 10px;
    font-size: 14px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
  }
  </style>
  