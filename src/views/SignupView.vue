<script>
import { reactive,  } from 'vue';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import router from '@/router';

export default {
  // Title
  mounted() {
    document.title = 'Sign Up | ArthriCare';
  },
  setup() {
    // Set up register data
    const registerForm = reactive({
      name: '',
      gender: '',
      email: '',
      password: '',
      weight: '',
      age: '', // corrected spelling
      weightUnit: true, // true for kg, false for lb
      height: '',
      heightUnit: true, // true for cm, false for ft
    });

    //const showError = ref(false);

    // Submit register form
    const submitRegisterForm = async () => {
      try {
        // Validate the form
        if (
          registerForm.email === '' ||
          registerForm.password === '' ||
          registerForm.gender === '' ||
          registerForm.name === '' ||
          registerForm.weight === '' ||
          registerForm.height === '' ||
          registerForm.age === ''
        ) {
          // If the validation failed
          ElMessage.error('Please fill up all the fields');
        } else {
          const response = await axios.post('http://localhost:8181/api/register', {
            name: registerForm.name,
            gender: registerForm.gender,
            email: registerForm.email,
            password: registerForm.password,
            weight: registerForm.weight,
            age: registerForm.age,
            height: registerForm.height,
          });

          if (response.status === 200) {
            console.log('Sign up successful');
            // Register successful, leave all blank
            ElMessage.success('Registration success');
            registerForm.email = '';
            registerForm.gender = '';
            registerForm.name = '';
            registerForm.password = '';
            registerForm.weight = '';
            registerForm.age = '';
            registerForm.weightUnit = '';
            registerForm.height = '';
            registerForm.heightUnit = '';
            router.push('/Login');
          } else {
            console.error('Registration failed!', response);
          }
        }
      } catch (error) {
        console.error('Registration failed!', error);
      }
    };

    return {
      registerForm,
      submitRegisterForm,
      axios,
    };
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
                                    <input id = "name" type="text" class = "input" placeholder="Please enter your full name" v-model="registerForm.name"/>
                                </div>
                                
                                <div class = "input-row">
                                    <b><label for = "age">Age:</label></b>
                                    <input name="age" id="age" class="input" placeholder="Please enter your age" v-model="registerForm.age"/>
                                </div>
                                
                                <div class = "input-row">
                                    <b><label for = "gender">Gender:</label></b>
                                    <select name="gender" id="gender" class = "row-input"  v-model="registerForm.gender">
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
                                        <input type="number" name="weight" id="weight" class="input" min="0" step="any" v-model="registerForm.weight" placeholder="Please enter your weight" style="width: 232px;"/>
                                        <el-switch v-model = "registerForm.weightUnit" inline-prompt active-text = "kg" size = "large" inactive-text="lb" width="60" class = "switchBtn"
                                        style="--el-switch-on-color: #85cc13; --el-switch-off-color: #ff4949;"/>
                                    </div>
                                </div>

                                <div style=" align-items: center; display: flex; flex-direction: column; margin-top: 10px;">
                                    <b><label for = "height">Height:</label></b>
                                    <div style="display: flex; align-items: center; margin-left: 15px;">
                                        <input type="number" name="height" id="height" class="input" min="0" step="any" v-model="registerForm.height" placeholder="Please enter your height" style="width: 232px;"/>
                                        <el-switch v-model = "registerForm.heightUnit" inline-prompt active-text = "cm" size = "large" inactive-text="feet" width="60" class = "switchBtn"
                                        style="--el-switch-on-color: #85cc13; --el-switch-off-color: #ff4949;"/>
                                    </div>
                                </div>

                                <div class = "input-row">
                                    <b><label for = "email">Email:</label></b>
                                    <input id = "email" type="email" class = "input" placeholder="Please enter your email" v-model="registerForm.email" required/>
                                </div>

                                <div class = "input-row">
                                    <b><label for = "password">Password:</label></b>
                                    <input id = "password" type="password" class = "input" placeholder="Please enter your password" v-model="registerForm.password" required/>
                                </div>                                
                            </form>
                    </div>
            </el-main>
            <el-footer>
                <div class="buttons">
                    <el-button class = "login-button" @click = "submitRegisterForm">SIGN UP</el-button> 
                </div>
            </el-footer>
        </el-container>
    </div>
</template>



<!-- the following is all css-->
<style src = "@/css/signup.css" scoped></style>