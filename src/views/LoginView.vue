<!--Login Page -->
<!--
    Author: Lin Gan
    Student number: 6502933
    Date: 2023/10/20
    Description: The script section imports the necessary modules and initializes the reactive variables for email, password, and showPassword, which manages the visibility of the password field. 
    It also includes the handleLogin method responsible for attempting the user login by dispatching the user/loginUser action from the store.
    In the template section, a form for user login is defined, including input fields for email and password. 
    It also provides validation rules for the email field, ensuring that it is not empty and follows a valid email format. The password field has an option to toggle between displaying or hiding the password.
    The template also contains a link to the signup page for users who do not have an account and a link for password reset.
    Additionally, a login button is provided to initiate the login process.
-->
<script>
  import { ref } from 'vue';
  import store from '@/store';

  export default {
    setup(){
      const email = ref('');
      const password = ref('');
      const showPassword = ref(false);

      const handleLogin = async () => {
        try{
          await store.dispatch('user/loginUser', {
            email: email.value,
            password: password.value,
          });
        }catch(error){
          console.log('Login failed', error);
        }
      };

      return{
        email,
        password,
        handleLogin,
        showPassword,
      }
    },
    //title
    mounted() {
      document.title = 'Login | ArthriCare';
    },
  };
</script>
<template>
  <div class="container" >
    <el-container class = "content-container">
      <el-main style = "height: 500px">
        <div>
          <form class="input-container">
            <h2>Welcome back</h2>
            <h4>Login to your account</h4>
            <var-input class="input" variant="outlined" id = "email" type="email" placeholder="Email" v-model="email"
            :rules="[
                    (v) => !!v || 'Email is required',
                    (v) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || 'E-mail must be valid'
            ]"
            /><br>
            <var-input class="input" variant="outlined" id = "password" :type="showPassword ? 'text' : 'password'" placeholder="Passoword" v-model="password">
              <template #append-icon>
                <span @click="showPassword = !showPassword" style="font-size: 15px;">{{ showPassword ? 'Hide' : 'Show' }}</span>
              </template>
            </var-input>
          </form>
        </div>
        <div id="mid">
          <b>Don't have an account? </b>
          <router-link to = "/Signup"><b style = "color:#006973; text-decoration: none;">Sign up</b></router-link>
          <var-divider description="Or" style="height: 2px; color:#006973"/>
          <b>Forget your password? </b>
          <router-link to = "/Resetpassword"><b style = "color:#006973;">Click here</b></router-link>
        </div>
      </el-main>
      <el-footer class = "footer">
        <div class="buttons">
          <el-button class = "login-button" @click = "handleLogin">Log in</el-button>
        </div>
        <div>
          <span>© 2023 ArthriCare</span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>



<!-- the following is all css-->
<style src = "@/css/login.css" scoped></style>
