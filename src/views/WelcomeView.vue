<!--Welcome Page -->
<template>
  <div class = "container">
    <el-container class = "content-container">
      <el-header>
        <div class = "logo">
          <img src="@/assets/icon.png" alt="ArthriCare Logo">
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
          <router-link to = "/Education">
            <el-button class = "signup-button">Education</el-button>
          </router-link>
          <router-link to = "/Assessment">
            <el-button class = "signup-button">Ass</el-button>
          </router-link>
          <router-link to = "/SelectAssessment">
            <el-button class = "signup-button">selectAss</el-button>
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
<style scoped>
  /* --------------------------------Base Layout-----------------------------------------------*/
  .container{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #1890FF;
      overflow: hidden;
      overflow-y: auto;
    }
    .content-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  /* --------------------------------Base Layout-----------------------------------------------*/

  /* -------------------------------- Content -------------------------------------------------*/
    .welcome-text{
      margin-left: -20px;
    }
    h1{
      color: #FFFFFF;
      font-weight: 600;
      font-size: 45px;
    }
    .logo{
      margin: -200px;
    }
    img{
      width: 250px;
    }
  /* -------------------------------- Content -------------------------------------------------*/
  
  /* -------------------------------- Buttons -------------------------------------------------*/
    .buttons{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 100px;
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
  /* -------------------------------- Buttons -------------------------------------------------*/

  /* -------------------------------- Small Screen -------------------------------------------*/
  @media screen and (max-width: 400px) {
    .logo{
      margin: -150px -200px;
    }
    .buttons{
      margin-top: 50px;
    }
  }
  /* -------------------------------- Small Screen -------------------------------------------*/
</style>