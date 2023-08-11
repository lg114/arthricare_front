import {createStore} from "vuex";
import user from '@/store/modules/user.js';
import reminder from '@/store/modules/reminder.js'

const store = createStore({
  state: {
    ExperiedMedArray: [],
    unExperiedMedArray: [],
    homePage_ReminderArray: []
  },
  mutations: {
    // 这里可以定义 mutations 来修改这两个数组的值，例如添加、删除等操作
  },
  modules: {
    user,
    reminder,
  }
});

export default store;