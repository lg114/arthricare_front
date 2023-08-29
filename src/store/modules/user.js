// store/user.js
import axios from 'axios';
import router from '@/router';
import { Snackbar } from '@varlet/ui';

const state = {
  loggedInUser: null,
};

const mutations = {
  setLoggedInUser(state, user) {
    state.loggedInUser = user;
  },
  clearLoggedInUser(state) {
    state.loggedInUser = null;
    console.log(state.loggedInUser);
  },
};

const getters = {
    isLoggedIn: (state) => state.loggedInUser !== null,
    loggedInUser: (state) => state.loggedInUser,
};

const actions = {

    //email validation
    isValidEmail(email){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailRegex.test(email);
    },
    async loginUser({ commit }, { email, password }) {
        try {
            if( email === '' || password === ''){
                Snackbar.error('Email or Password is not valid');
            }else{
                if (!actions.isValidEmail(email)){
                    Snackbar.error('Invalid email format');
                    return;
                }

                const response = await axios.post('http://localhost:8181/api/login', {
                    email: email,
                    password: password,
                });
                const user = response.data; //user information
                commit('setLoggedInUser', user); //set user information
                router.push('/Home');
                Snackbar.success('Login successful!');
            }
        } catch (error) {
            console.error('Login failed!', error);
            Snackbar.error('Login failed');
        }
    },
    async registerUser({ commit }, userData) {
        try {
            if(userData.email === '' || userData.password === ''){
                Snackbar.error('Email and Password are required!');
            }else{
                if (!actions.isValidEmail(userData.email)){
                    Snackbar.error('Invalid email format');
                    return;
                }
                const response = await axios.post('http://localhost:8181/api/register', userData);
                if (response.status === 200) {
                    console.log('Sign up successful');
                    Snackbar.success('Registration successful!');
                    router.push('/Login');    
                    commit('clearLoggedInUser');
                    return true;
                } else {
                    console.error('Registration failed!', response);
                    return false;
                }
            }
        } catch (error) {
            Snackbar.error("This email might be exist!");
            console.error('Registration failed!', error);
            return false;
        }
    },
    async resetPassword(context, { email, newPassword }) {
        try {
            if( email === '' || newPassword === ''){
                Snackbar.error('Email and New password are required!');
            }else{
                if (!actions.isValidEmail(email)){
                    Snackbar.error('Invalid email format');
                    return;
                }
                const response = await axios.put('http://localhost:8181/api/updatePasswordbyemail', {
                    email: email,
                    password: newPassword,
                });
                console.log(response.data);
                console.log('Password reset successful');
                Snackbar.success('Reset password successful!');
                router.push('/');
                context.commit('clearLoggedInUser');
                return true;
            }
        } catch (error) {
            console.error('Password reset failed!', error);
            return false;
        }
    },
    async logout({ commit }){
        await commit('clearLoggedInUser');
        await router.push('/');
        Snackbar.success('Logged out successfully');
    }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
