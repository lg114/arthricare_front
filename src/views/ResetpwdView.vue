<!--Resetpassword Page -->
<!--
    Author: Lin Gan
    Student number: 6502933
    Date: 2023/10/20  
-->
<script>
    import { ref } from 'vue';
    import store from '@/store';

    export default{
        //title
        mounted(){
            document.title = 'Reset Password | ArthriCare';
        },

        setup(){
            //reset pwd data
            const email = ref('');
            const newPassword = ref('');
            const showPassword = ref(false);

            //submit reset password form
            const handleReset = async () => {
                try{
                    await store.dispatch('user/resetPassword', {
                        email: email.value,
                        newPassword: newPassword.value,
                    });
                }catch(error){
                    console.error("Reset failed!", error);
                }
            }
            return{
                email,
                newPassword,
                handleReset,
                showPassword,
            };
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
              <h4>Reset your password</h4>
              <var-input class="input" variant="outlined" id = "email" type="email" placeholder="Email" v-model="email"
              :rules="[
                    (v) => !!v || 'Email is required',
                    (v) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || 'E-mail must be valid'
                ]"
              /><br>
              <var-input class="input" variant="outlined" id = "password" :type="showPassword ? 'text' : 'password'" placeholder="New passoword" v-model="newPassword">
                <template #append-icon>
                  <span @click="showPassword = !showPassword" style="font-size: 15px;">{{ showPassword ? 'Hide' : 'Show' }}</span>
                </template>
              </var-input>
            </form>
          </div>
          <div id="mid">
            <b>Already have an account? </b>
            <router-link to = "/login"><b style = "color:#006973; text-decoration: none;">Log in</b></router-link>
            <var-divider description="Or" style="height: 2px; color:#006973"/>
            <b>Don't have an account? </b>
            <router-link to = "/Signup"><b style = "color:#006973;">Click here</b></router-link>
          </div>
        </el-main>
        <el-footer class = "footer">
          <div class="buttons">
            <el-button class = "login-button" @click = "handleReset">Continue</el-button>
          </div>
          <div>
            <span>© 2023 ArthriCare</span>
          </div>
        </el-footer>
      </el-container>
    </div>
  </template>


<!-- the following is all css-->
<style src = "@/css/resetpwd.css" scoped></style>
