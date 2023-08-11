import axios from 'axios';

const state = {
    reminders : null, //the state of the drug reminder
    selectedDate: null //the selected date
};

const mutations = {
    //set reminders
    SET_REMINDERS(state, newReminder){
        state.reminders = newReminder;
    },
    //add reminder
    ADD_REMINDER(state, newReminder){
        state.reminders.push(newReminder);
    },
    //edit reminder
    EDIT_REMINDER(state, {index, updatedReminder}){
        state.reminders[index] = updatedReminder;
    },
    //set selected date
    SET_SELECTED_DATE(state,selectedDate){
        state.selectedDate = selectedDate;
    }
};

const getters = {
    reminders: state => state.reminders,
    loggedInUser: (state, getters, rootState) => {
        return rootState.user.loggedInUser;
      },
};

const actions = {
    async fetchRemindersFromBackend({ commit, getters}, selectedDate){
        try{
            if(getters.loggedInUser){
                const userId = getters.loggedInUser.id;
                const data = {
                    userId: userId,
                    chooseDate: selectedDate
                };
                const response = await axios.post('http://localhost:8181/medications/findMedicationByUserIdAndDate', data);
                
                let reminders = [];
                let idCounter = 1;

                response.data.forEach(reminder => {
                    const timeWithoutSeconds = reminder.reminderTime.slice(0, -3);
                    reminders.push({
                        id: idCounter++,
                        name: reminder.medicationName,
                        time: timeWithoutSeconds,
                        date: ""
                    });
                });
                console.log('Fetched reminders:', reminders); 
                commit('SET_REMINDERS', reminders);

                return reminders;
            }else{
                throw new Error('User not logged in');
            }
        }catch(error){
            console.error('Error fetching reminders from backend:', error);
            throw error;
        }
    }
};

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}