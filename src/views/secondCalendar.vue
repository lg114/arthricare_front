<template>
    <el-scrollbar @scroll.passive="handleScroll" :style="{ scrollLeft: scrollLeft + 'px' }">
        <div class="scrollbar-flex-content">
            <p v-for="(date, index) in dates" :key="index" class="scrollbar-demo-item">
                {{ getDayOfWeek(date) }}<br />
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
            startDate: dayjs().startOf('week'), // 从本周周日开始
            daysToShow: 21, // 显示21天，即三周的数据
            screenWidth: window.innerWidth, // 获取屏幕宽度
            scrollLeft: 0, // 当前滚动位置
            scrollStep: 100, // 每次滑动的步长
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
            return date.format('ddd');
        },
        getDateOnly(date) {
            return date.format('D');
        },
        handleScroll(event) {
            const maxScrollLeft = (this.daysToShow / 7) * 100 - this.screenWidth;

            if (event.target.scrollLeft === 0 && this.scrollLeft > this.screenWidth) {
                this.startDate = this.startDate.subtract(1, 'week');
                this.scrollLeft = maxScrollLeft;
            } else if (event.target.scrollLeft >= maxScrollLeft && this.scrollLeft < this.screenWidth) {
                this.startDate = this.startDate.add(1, 'week');
                this.scrollLeft = 0;
            } else {
                this.scrollLeft = event.target.scrollLeft;
            }
        },
    },
};
</script>

<style scoped>
.scrollbar-flex-content {
    display: flex;
    border-top: 2px solid #1890ff;
    border-bottom: 2px solid #1890ff;
    gap: 5px;
    padding: 5px;
    width: calc(40px * 21);
}

.scrollbar-demo-item {
    width: 40px;
    height: 40px;
    text-align: center;
    margin: 1px;
    color: #1890ff;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
