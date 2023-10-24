<!--Edit Profile Page -->
<!-- Author: Tianyi Hu
Student number: 6774179
Date: 2023/10/20 -->

<script>
    import { reactive } from 'vue';
    import { ChevronLeft20Filled } from '@vicons/fluent'; //, MedicationOutlined, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled
    import { Icon } from '@vicons/utils';
    import { ElMessage } from 'element-plus';
    import axios from 'axios';
    import router from '@/router';
    
    export default{
        mounted() {
                document.title = "Edit Profile | ArthriCare";
        },
        methods:{
            //Router
            // goToEditProfile(){
            //     this.$router.push('/EditProfile');
            // }
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
            Icon,
            ChevronLeft20Filled, 
        }
    };
</script>

<template>
    <div class="container">
            <el-header class="header">
                <router-link to="/UserProfile">
                <Icon class="back"><ChevronLeft20Filled /></Icon>
                </router-link>
                <b class="pageTitle">Edit Profile</b>
            </el-header>
            <el-main class="main">
                <form>
                    <div class = "input-row">
                        <b><label for = "name">Name:</label></b>
                        <input id = "name" type="text" class = "input" placeholder="Please update your full name" v-model="registerForm.name"/>
                    </div>
                                
                    <div class = "input-row">
                        <b><label for = "age">Age:</label></b>
                        <input name="age" id="age" class="input" placeholder="Please update your age" v-model="registerForm.age"/>
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
                            <div style="display: flex; align-items: center;">
                                <input type="number" name="weight" id="weight" class="input" min="0" step="any" v-model="registerForm.weight" placeholder="Please enter your weight" style="width: 232px;"/>
                                <el-switch v-model = "registerForm.weightUnit" inline-prompt active-text = "kg" size = "large" inactive-text="lb" width="60" class = "switchBtn"
                                style="--el-switch-on-color: #55BDCA; --el-switch-off-color: #F27B42;"/>
                            </div>
                        </div>

                        <div style=" align-items: center; display: flex; flex-direction: column; margin-top: 10px;">
                            <b><label for = "height">Height:</label></b>
                            <div style="display: flex; align-items: center;">
                                <input type="number" name="height" id="height" class="input" min="0" step="any" v-model="registerForm.height" placeholder="Please enter your height" style="width: 232px;"/>
                                <el-switch v-model = "registerForm.heightUnit" inline-prompt active-text = "cm" size = "large" inactive-text="feet" width="60" class = "switchBtn"
                                style="--el-switch-on-color: #55BDCA; --el-switch-off-color: #F27B42;"/>
                            </div>
                        </div>
                </form><br>
                <div>
                    <div >
                    <var-button block color="#006973" text-color="#CFEEF5" class="buttons" @click = "submitRegisterForm">SAVE</var-button>
                </div>
                <var-divider />
                <div>
                    <!-- Delete account function needs to be added in backend 后端需要添加删除账号功能 -->
                    <var-button block color="#FF5449" text-color="#FFFFFF" class="buttons" @click="show = true">DELETE ACCOUNT</var-button>
                    
                </div>
            </div>
        </el-main>
    </div>
</template>



<style src = "@/css/EditProfile.css" scoped></style>