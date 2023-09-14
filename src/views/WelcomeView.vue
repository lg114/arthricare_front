<!--Welcome Page -->
<template>
  <div class = "container">
    <el-container class = "content-container">
      <el-header>
        <div class = "logo">
          <img src="@/assets/logo.png" alt="ArthriCare Logo" class="logoPic">
        </div>        
      </el-header>
      <el-main class = "welcome">
        <div class = "welcome-text">
          <h1>Welcome to<br>ArthriCare</h1>
        </div>        
      </el-main>
      <el-footer>
        <div class = "buttons">
          <router-link to = "/login">
            <el-button class = "login-button">LOG IN</el-button>
          </router-link>
          <router-link to = "/Signup">
            <el-button class = "signup-button">SIGN UP</el-button>
          </router-link>
        </div>        
      </el-footer>
    </el-container>
  </div>
</template>

<script>
    export default{
      //title
      mounted(){
          document.title = 'Welcome | ArthriCare';
      },
    };
</script>



<!-- the following is all css-->
<style src = "@/css/welcome.css" scoped></style>