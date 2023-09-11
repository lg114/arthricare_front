// store/index.js
import {createStore} from "vuex";
import user from '@/store/modules/user.js';
import reminder from '@/store/modules/reminder.js'

const store = createStore({
  state: {
    ExperiedMedArray: [],
    unExperiedMedArray: [],
    homePage_ReminderArray: [],
  },
  mutations: {
    
  },
  actions: {

  },
  modules: {
    user,
    reminder,
  }
});

export default store;