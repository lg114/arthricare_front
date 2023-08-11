<!--Login Page -->
<script>
  import { ArrowLeftBold } from '@element-plus/icons-vue';
  import { ref } from 'vue';
  import store from '@/store';

  export default {
    setup(){
      const email = ref('');
      const password = ref('');

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
      }
    },
    //title
    mounted() {
      document.title = 'Login | ArthriCare';
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
            <input class="input" id = "email" type="email" placeholder="Please enter your email" v-model="email"/><br>
            <b><label>Password</label></b>
            <input class="input" id = "password" type="password" placeholder="Please enter your passoword" v-model="password"/>
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
          <el-button class = "login-button" @click = "handleLogin">LOG IN</el-button>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>



<!-- the following is all css-->
<style src = "@/css/login.css" scoped></style>