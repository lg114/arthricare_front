<script>
  import { ref } from 'vue';
  import { ArrowLeftBold } from '@element-plus/icons-vue';
  import store from '@/store';

  export default {
    // Title
    mounted() {
      document.title = 'Sign Up | ArthriCare';
    },
    setup() {
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const age = ref('');
      const gender = ref('');
      const weight = ref('');
      const height = ref('');
      const weightUnit = ref(true);
      const heightUnit = ref(true);

      const handleSignup = async () => {
        try{
          await store.dispatch('user/registerUser', {
            email: email.value,
            password: password.value,
            name: name.value,
            age: age.value,
            gender: gender.value,
            weight: weight.value,
            height: height.value,
            weightUnit: weightUnit.value,
            heightUnit: heightUnit.value,
          });
          
        }catch(error){
          console.log('Sign up',error)
        }
      };

      return{
        name,
        email,
        password,
        age,
        gender,
        weight,
        height,
        weightUnit,
        heightUnit,
        handleSignup,
      }
    },

    components: {
      ArrowLeftBold,
    },
  };
</script>

<template>
    <div class = "container">
        <el-container class = "content-container">
            <el-main style = "height: 100%; width: 100%;">
                    <div class = "input-container">
                        <router-link to = "/">
                            <el-icon class = "backBtn"><ArrowLeftBold /></el-icon>
                        </router-link>
                            <h2>Sign Up</h2>
                            <form>
                                <div class = "input-row">
                                    <b><label for = "name">Name:</label></b>
                                    <input id = "name" type="text" class = "input" placeholder="Please enter your full name" v-model="name"/>
                                </div>
                                
                                <div class = "input-row">
                                    <b><label for = "age">Age:</label></b>
                                    <input name="age" id="age" class="input" placeholder="Please enter your age" v-model="age"/>
                                </div>
                                
                                <div class = "input-row">
                                    <b><label for = "gender">Gender:</label></b>
                                    <select name="gender" id="gender" class = "row-input"  v-model="gender">
                                        <option value="" disabled selected>Please enter your gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value=" Prefer not to tell "> Prefer not to tell </option>
                                        <option value="Non-binary">Non-binary</option>
                                        <option value="Transgender"> Transgender</option>
                                    </select>
                                </div>
                                
                                <div style=" align-items: center; display: flex; flex-direction: column;">
                                    <b><label for = "weight">Weight:</label></b>
                                    <div style="display: flex; align-items: center; margin-left: 15px;">
                                        <input type="number" name="weight" id="weight" class="input" min="0" step="any" v-model="weight" placeholder="Please enter your weight" style="width: 232px;"/>
                                        <el-switch v-model = "weightUnit" inline-prompt active-text = "kg" size = "large" inactive-text="lb" width="60" class = "switchBtn"
                                        style="--el-switch-on-color: #85cc13; --el-switch-off-color: #ff4949;"/>
                                    </div>
                                </div>

                                <div style=" align-items: center; display: flex; flex-direction: column; margin-top: 10px;">
                                    <b><label for = "height">Height:</label></b>
                                    <div style="display: flex; align-items: center; margin-left: 15px;">
                                        <input type="number" name="height" id="height" class="input" min="0" step="any" v-model="height" placeholder="Please enter your height" style="width: 232px;"/>
                                        <el-switch v-model = "heightUnit" inline-prompt active-text = "cm" size = "large" inactive-text="feet" width="60" class = "switchBtn"
                                        style="--el-switch-on-color: #85cc13; --el-switch-off-color: #ff4949;"/>
                                    </div>
                                </div>

                                <div class = "input-row">
                                    <b><label for = "email">Email:</label></b>
                                    <input id = "email" type="email" class = "input" placeholder="Please enter your email" v-model="email"/>
                                </div>

                                <div class = "input-row">
                                    <b><label for = "password">Password:</label></b>
                                    <input id = "password" type="password" class = "input" placeholder="Please enter your password" v-model="password"/>
                                </div>                                
                            </form>
                    </div>
            </el-main>
            <el-footer>
                <div class="buttons">
                    <el-button class = "login-button" @click = "handleSignup">SIGN UP</el-button> 
                </div>
            </el-footer>
        </el-container>
    </div>
</template>



<!-- the following is all css-->
<style src = "@/css/signup.css" scoped></style>