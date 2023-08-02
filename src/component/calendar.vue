<template>
    <div class="horizontal-calendar">
      <button @click="goBackOneWeek">&#8249;</button>
      <div v-for="(date, index) in weekDates" :key="index" @click="selectDate(date)">
        <div class="weekday">
            {{ date.format('ddd') }}<br>
            {{ date.format('M/D') }}
        </div>
            
      </div>
      <button @click="goForwardOneWeek">&#8250;</button>
    </div>
  </template>
  
  <script>
    import dayjs from 'dayjs';
    
    export default{
            name: "HorizontalCalendar",
            data(){
                return{
                    currentDate: dayjs(),
                };
        },
        computed:{
            weekDates(){
                const startOfWeek = this.currentDate.startOf('week');
                const dates = [];
                for (let i = 0; i < 7; i++){
                    dates.push(startOfWeek.add(i, 'day'));
                }
                return dates;
            },
        },
        methods:{
            goBackOneWeek(){
                this.currentDate = this.currentDate.subtract(1, 'week');
            },
            goForwardOneWeek(){
                this.currentDate = this.currentDate.add(1, 'week');
            },
            selectDate(date){
                const year = date.year();
                const month = date.month() + 1; // dayjs的月份是从0开始计数的，所以要加1
                const day = date.date();
                
                this.$emit('date-selected', { year, month, day });
            },
        },
    };
    </script>
    
    <style>
        .horizontal-calendar{
            display: flex;
            justify-content: center;
            align-items: center;
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
        
        .horizontal-calendar div{
            margin-top: 5px;
        }
        .weekday{
            width: 40px;
            text-align: center;
            margin: 1px;
            color: #1890FF;
            border-radius: 10px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            padding: -1px;
        }
        .weekday.selected{
            background-color: #f0f0f0;
        }
        .weekday:hover {
            background-color: lightgray;
            border-radius: 5px;
        }
  </style>
  