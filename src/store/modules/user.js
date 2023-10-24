// store/user.js
import axios from 'axios';
import router from '@/router';
import { ElMessage } from 'element-plus';

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
                ElMessage.error('Email or Password is not valid');
            }else{
                if (!actions.isValidEmail(email)){
                    ElMessage.error('Invalid email format');
                    return;
                }

                const response = await axios.post('http://localhost:8181/api/login', {
                    email: email,
                    password: password,
                });
                const user = response.data; //user information
                commit('setLoggedInUser', user); //set user information
                router.push('/Home');
                ElMessage.success('Login successful!');
            }
        } catch (error) {
            console.error('Login failed!', error);
            ElMessage.error('Login failed');
        }
    },
    async registerUser({ commit }, userData) {
        try {
            if(userData.email === '' || userData.password === ''){
                ElMessage.error('Email and Password are required!');
            }else{
                if (!actions.isValidEmail(userData.email)){
                    ElMessage.error('Invalid email format');
                    return;
                }
                const response = await axios.post('http://localhost:8181/api/register', userData);
                if (response.status === 200) {
                    console.log('Sign up successful');
                    ElMessage.success('Registration successful!');
                    router.push('/Login');    
                    commit('clearLoggedInUser');
                    return true;
                } else {
                    console.error('Registration failed!', response);
                    return false;
                }
            }
        } catch (error) {
            ElMessage.error("This email might be exist!");
            console.error('Registration failed!', error);
            return false;
        }
    },
    async resetPassword(commit, { email, newPassword }) {
        try {
            if( email === '' || newPassword === ''){
                ElMessage.error('Email and New password are required!');
            }else{
                if (!actions.isValidEmail(email)){
                    ElMessage.error('Invalid email format');
                    return;
                }
                const response = await axios.put('http://localhost:8181/api/updatePasswordbyemail', {
                    email: email,
                    password: newPassword,
                });
                console.log(response.data);
                console.log('Password reset successful');
                ElMessage.success('Reset password successful!');
                router.push('/');
                commit('clearLoggedInUser');
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
        ElMessage.success('Logged out successfully');
    }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};