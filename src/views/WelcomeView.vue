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
      <router-link to = "/login"><el-button class = "login-button">LOG IN</el-button></router-link>
      <router-link to = "/signup"><el-button class = "signup-button">SIGN UP</el-button></router-link>
    </div>
  </div>
</template>

<style scoped>
.container{
    display: grid;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background-color: #1890FF;
    overflow:hidden;
  }
  h1{
    text-align: left;
    margin-left: 20px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 45px;
    margin-bottom: 200px;
  }
  .logo{
    margin: 20px -20px;
  }
  img{
    width: 250px;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

.login-button,
.signup-button{
    width: 319px;
    height: 63px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-weight: 700;
}

.login-button,
.signup-button{
  background: #FFFFFF;
  color: #1890FF;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  transition: background-color 0.5s, color 0.5s;
}

.login-button:hover,
.signup-button:hover{
  background-color: #FFFFFF;
  color: #1890FF;
  transform: translateZ(10px);
}

.login-button::before,
.signup-button::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #FFFFFF;
  transition: width 0.3s;
  z-index: -1;
}

.login-button:hover,
.signup-button:hover{
  background-color: #FFFFFF;
  color: #1890FF;
  border-radius: 10px;
}

.login-button:hover::before,
.signup-button:hover::before{
  width: 100%;
  border-radius: 10px;
}
</style>

<script>
    export default{
    mounted(){
        document.title = 'Welcome | ArthriCare';
    },
    };
</script>
