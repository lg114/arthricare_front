<!--Login Page -->
<script>
  import { ArrowLeftBold } from '@element-plus/icons-vue';
  import { reactive } from 'vue';
  import router from '@/router';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';

  export default {
    //title
    mounted() {
      document.title = 'Login | ArthriCare';
    },
    setup() {
      //setup login data
      const loginForm = reactive({
        email: '',
        password: '',
      });

      //default show error message
      
      //submit login form
      const submitLoginForm = async () => {
        const email = loginForm.email;
        const password = loginForm.password;
        try {
          //validate the form
          if (loginForm.email === '' || loginForm.password === '') {
            ElMessage.error('Email or Password is not valid');
          }else{
            const response = await axios.post('http://localhost:8181/api/login', {
            email: email,
            password: password,
            });
            console.log(response.data); // Login successful message
            sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
            router.push('/Home'); //jump to home page
          }
        } catch (error) {
          console.error('Login failed!', error);
        }
      };
      return {
        loginForm,
        submitLoginForm,
        axios,
      };
    },
    components: {
      ArrowLeftBold,
    },
  };
</script>
<template>
  <div class="container" >
    <el-container class = "content-container">
      <el-header>
        <router-link to = "/">
          <el-icon class = "backBtn"><ArrowLeftBold /></el-icon>
        </router-link>
      </el-header>
      <el-main style = "height: 500px">
        <div>
          <form class="input-container">
            <h2>Welcome Back</h2>
            <p>Login to your account</p>
            <b><label>Email Address</label></b>
            <input class="input" id = "email" type="email" placeholder="Please enter your email" v-model="loginForm.email"/><br>
            <b><label>Password</label></b>
            <input class="input" id = "password" type="password" placeholder="Please enter your passowrd" v-model="loginForm.password"/>
          </form>
        </div>
        <div id="mid">
          Don't have an account?
          <router-link to = "/Signup">Sign Up</router-link>
          <hr>
          Forget your password? 
          <router-link to = "/Resetpassword">Click Here</router-link>
        </div>
      </el-main>
      <el-footer>
        <div class="buttons">
          <el-button class = "login-button" @click = "submitLoginForm">LOG IN</el-button>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>



<!-- the following is all css-->
<style src = "@/css/login.css" scoped></style>