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
      <el-button class = "signup-button">SIGN UP</el-button>
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
    margin-left: 35px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 40px;
    margin-bottom: 200px;
  }
  .logo{
    margin-left: -20px;
    margin-bottom: 	20px;
  }
  img{
    width: 250px;
  }
  .buttons{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .login-button, .signup-button{
    width: 319px;
    height: 63px;
    margin-bottom: 10px;
    border-radius: 10px;

  }
  .login-button{
  margin-left: 10px;
  background: #FFFFFF;
  color:#1890FF;
  }
  .signup-button{
  margin-left: 10px;
  background: #1890FF;
  color:#FFFFFF;
  border: 3px solid #FFFFFF;
  }
</style>

<script>
export default{
  mounted(){
    document.title = 'Welcome | ArthriCare';
  },
};
</script>