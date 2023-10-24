//  Author: Lin Gan
//  Student number: 6502933
//  Date: 2023/10/20 
//  Description:
//  The state object maintains the state of the drug reminders, the selected date, and the selected medication.
//  The mutations object includes mutation functions for setting reminders, adding a new reminder, editing an existing reminder, setting the selected date, and setting the selected medication.
//  The getters object defines a getter function to retrieve the reminders and the logged-in user's information from the state.
//  The actions object contains asynchronous actions for fetching reminders from the backend based on the selected date and taking medication, which involves updating the takeMedTime and setting the medication as taken.
//  The actions use Axios to make HTTP requests to the backend API for fetching and updating reminders.
//  Error handling is implemented using try-catch blocks, with appropriate error messages logged to the console.
//  Snackbar components are used to display success and error messages to the user.
//  The module is configured as namespaced, ensuring it can be registered under a specific namespace in the Vuex store.

import axios from 'axios';
import { Snackbar } from '@varlet/ui';

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
                Snackbar.success('Take medicine successfully');
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
