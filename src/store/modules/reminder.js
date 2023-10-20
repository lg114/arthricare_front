//  Author: Lin Gan
//  Student number: 6502933
//  Date: 2023/10/20 

import axios from 'axios';

const state = {
    reminders : null, //the state of the drug reminder
    selectedDate: null, //the selected date
    selectedMedication: null
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
    //set selected medication
    SET_SELECTED_MEDICATION(state, medication) {
        state.selectedMedication = medication;
    },
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

                response.data.forEach(reminder => {
                    const timeWithoutSeconds = reminder.reminderTime.slice(0, -3);

                    reminders.push({
                        id: reminder.reminderId,
                        name: reminder.medicationName,
                        time: timeWithoutSeconds,
                        category: reminder.category,
                        dosageUnit: reminder.dosageUnit,
                        alreadyTakeMedication: reminder.alreadyTakeMedication,
                        takeMedTime: reminder.takeMedTime,
                        note: reminder.note,
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
    async takeMedication({ commit, state}, { date }) {
        try {
            if (state.selectedMedication) {
                const medication = state.selectedMedication;

                const data = {
                    reminderId: medication.id,
                    takeMedTime: date
                }
                console.log(data);
                const response = await axios.post('http://localhost:8181/reminders/takeMedication', data);
                console.log('Medication taken successfully:', response.data);

                commit('EDIT_REMINDER', {
                    index: state.reminders.findIndex(r => r.id === medication.id),
                    updatedReminder: medication
                });

                commit('SET_SELECTED_MEDICATION', null);
            } else {
                console.log('No medication selected');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },
};

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
