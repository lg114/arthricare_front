<!--Welcome Page -->
<template>
  <el-container class = "container">
      <el-header>
          <div class="header-left">
              <p>ArthriCare</p>
          </div>
      </el-header>
      <el-main>
          <div class = "popping-text">
              <h2>Your Pathway to <br> Joint Wellness</h2>
          </div>
          <transition appear name = "slide-down">
              <div class = "bottom">
                  <p>Get started</p>
                  <div class = "buttons">
                      <router-link to = "/Login">
                          <var-button color="#55BDCA" text-color="#F5F4F3" elevation = 0><b>Log in</b></var-button>                            
                      </router-link>
                      <router-link  to = "/Signup">
                          <var-button color="#55BDCA" text-color="#F5F4F3" elevation = 0><b>Sign up</b></var-button>
                      </router-link>
                  </div>
                  <div class = "name">
                      <span>© 2023 ArthriCare</span>
                  </div>
                  <div class = "divider-example-vertical-container">
                      <span>Terms of use</span>
                      <var-divider vertical />
                      <span>Privacy policy</span>
                  </div>
              </div>
          </transition>
      </el-main>
  </el-container>
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