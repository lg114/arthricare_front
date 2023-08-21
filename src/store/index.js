import {createStore} from "vuex";

export default createStore({
    state:{
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

    }
})