<!--Welcome Page -->
<template>
  <div class = "container">
    <div class = "logo">
      <img src="@/assets/icon.png" alt="ArthriCare Logo">
    </div>
    <div class = "welcome-text">
      <h1>Welcome to<br>ArthriCare</h1>
    </div>
    <div class = "buttons">
      <el-button class = "login-button">LOG IN</el-button>
      <el-button class = "signup-button">LOG IN</el-button>
    </div>
  </div>
</template>


<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    background-color: #1890FF;
    overflow: hidden;
  }
  h1{
    color: #FFFFFF;
    font-weight: 600;
    font-size: 75px;
  }
  .logo{
    margin-bottom: 	20px
  }
  .buttons{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .login-button, .signup-button{
    width: 500px;
    height: 63px;
    margin-bottom: 10px;
    background: #FFFFFF;
    border-radius: 10px;
  }
  .login-button{
  margin-left: 10px;
}
</style>

<script>
export default{
  mounted(){
    document.title = 'Welcome | ArthriCare';
  },
};
</script>
