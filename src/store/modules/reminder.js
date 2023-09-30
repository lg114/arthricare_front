import axios from 'axios';

const state = {
    reminders : [], //the state of the drug reminder
    selectedDate: null, //the selected date
    currentMedication: null, //the current medication
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
    },
    //set current medication
    SET_CURRENT_MEDICATION(state,medication){
        state.currentMedication = medication;
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
                const userId = getters.loggedInUser.userId;
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
                        dosageUnit: reminder.dosageUnit,
                        category: reminder.category,
                        takeMedTime: reminder.takeMedTime
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
    },
    takeMedicationNow({ commit, state}){
        if(state.currentMedication){
            const currentDate = new Date();
            console.log('Current date:', currentDate);

            commit('SET_CURRENT_MEDICATION', state.currentMedication);
            console.log('Current medication:', state.currentMedication);

            const data = {
                reminderId: state.currentMedication.reminderId,
                takenMedTime: currentDate,
            };
            axios.post('http://localhost:8181/reminders/takeMedication', data)
            .then(response => {
              // 在请求成功后执行的操作
              console.log('Medication taken successfully:', response.data);
    
              // 这里你可以更新界面或执行其他操作
            })
            .catch(error => {
              // 在请求失败时执行的操作
              console.error('Error taking medication:', error);
    
              // 这里你可以处理错误情况，例如显示错误消息给用户
            });
        }
    }
    // async addReminder({commit, getters}, reminder){
    //     try{
    //         if(getters.loggedInUser){
    //             const userId = getters.loggedInUser.userId;
    //             const data = {
    //                 userId: userId,
    //                 medicationName: medication.name
    //             };
    //         }else{
    //             throw new Error('User not logged in');
    //         }
    //     }catch(error){
    //         console.error('Error adding reminder to backend:', error);
    //         throw error;
    //     }
    // }

};

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}