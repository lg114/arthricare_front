// store/index.js
import {createStore} from "vuex";
import user from '@/store/modules/user.js';
import reminder from '@/store/modules/reminder.js'
import task from '@/store/modules/task.js'
export default createStore({
    state:{
        ExperiedMedArray: [],
        unExperiedMedArray: [],
        homePage_ReminderArray: [],
        navigation:false,
        MedArray: []
        
    },
    getters:{

    },
    mutations:{
      changeToFalse(state){
      state.navigation = false;
    },
    changeToTrue(state){
      state.navigation = true;
    },
    setArray(state, newArray) {
      state.MedArray = newArray;
    },
    },
    actions:{

    },
    modules:{
      user,
      reminder,
      task,
    }
})