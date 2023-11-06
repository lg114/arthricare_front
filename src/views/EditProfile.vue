<!--Edit Profile Page -->
<!-- Author: Tianyi Hu
Student number: 6774179
Date: 2023/10/20 -->

<script>
    import { reactive } from 'vue';
    import { ChevronLeft20Filled} from '@vicons/fluent'; //, MedicationOutlined, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled
    import { Icon } from '@vicons/utils';
    import { ElMessage } from 'element-plus';
    import axios from 'axios';
    import router from '@/router';
    import { mapGetters} from 'vuex';
    export default{
        mounted() {
                document.title = "Edit Profile | ArthriCare";
                this.initializeUserInfor();
        },
        data(){
            return{
            }
        },
        computed:{
            ...mapGetters('user', ['loggedInUser','avatarUrl']),

            userAvatarUrl() {
              // 如果 Vuex 中有 avatarUrl，则使用它，否则使用默认头像
              return this.avatarUrl || require('@/assets/default-avatar.png');
            }
        },
        methods:{
          initializeUserInfor(){
                console.log(this.loggedInUser);
                this.registerForm.name = this.loggedInUser.name;
                this.registerForm.gender = this.loggedInUser.age;
                this.registerForm.height = this.loggedInUser.height;
                this.registerForm.weight = this.loggedInUser.weight;
                this.registerForm.heightUnit = this.loggedInUser.heightUnit;
                this.registerForm.weightUnit = this.loggedInUser.weightUnit;
            },

            previewAvatar(event){
                const file = event.target.files[0];
                if(file){
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.avatarData = e.target.result;
                    };
                    reader.readAsDataURL(file);
                    this.saveAvatar(file);

                }
            },

            async saveAvatar(imageFile) {
                try {
                    const formData = new FormData();
                    formData.append('userId', this.loggedInUser.userId);
                    formData.append('image', imageFile);

                    console.log(formData);
                    // 等待 axios 请求完成
                    const response = await axios.post('http://localhost:8181/uploadImage/avatarImage', formData);

                    // 处理响应
                    if (response.data.success) {
                        console.log(`Image uploaded successfully.`);
                    } else {
                        console.log(`Image failed to upload.`);
                    }
                } catch (error) {
                    console.error('Error uploading images:', error);
                }
            },
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
                    <label class="avatarLabel">
                        <div class="avatar" style="display: flex;justify-content: center;">
                            <var-avatar :src="userAvatarUrl" :size="120" />
                        </div>
                        <input type="file" @change="previewAvatar" style="display: none">
                    </label>
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



<style src = "@/css/EditProfile.css" scoped>
.avatarLabel{
    cursor: pointer;
    display: block;
    width: 120px;
    height: 120px;
    position: relative;
}
.avatarLabel input[type="file"]{
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}
</style>