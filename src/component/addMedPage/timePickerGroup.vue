<!-- TimePickerGroup.vue -->
<template>
    <div class="time-picker-wrapper">
        <el-time-picker 
            v-for="(time, index) in timePickers"
            :key="index"
            v-model="timePickers[index]" 
            format="HH:mm"
            style="width: 32%;"
            :clearable="false">
        </el-time-picker>
      
        <!-- 当是最后一个 timePicker 时显示加号 -->
    </div>
    <div class = "plus-and-mins-controller">
        <var-icon 
            @click="addTimePicker" 
            class="add-icon"
            name="plus-circle-outline">
        </var-icon>
        <var-icon 
            @click="removeTimePicker" 
            class="add-icon"
            name="minus-circle-outline">
        </var-icon>
    </div>

</template>


  
  <script>
  import { ElTimePicker,} from 'element-plus';
  export default {
    components: {
      'el-time-picker': ElTimePicker,
    },
    data() {
      return {
        timePickers: [null]
      };
    },
    methods: {
      addTimePicker() {
        this.timePickers.push(null);
      },
      removeTimePicker() {
        this.timePickers.pop();
      }
    }
  }
  </script>
  
  <style scoped>
    .time-picker-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 10px;
        gap: 6px;
        
    }


    .add-icon {
        cursor: pointer;
        font-size: 21px;
    }

    .plus-and-mins-controller
    {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap :6px;
    }
  </style>
  