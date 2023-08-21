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
<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color:#55BDCA;
    overflow: hidden;
}
.content-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    width: 100%;
}
/* -------------------------------- Base Layout -----------------------------------------------*/

/* -------------------------------- Back Button -----------------------------------------------*/
.backBtn{
    margin: -170px;
    font-size: 30px;
    color:#ffffff;
    position: sticky;
    top: 30px;
}
.switchBtn{
    margin-left: 10px;
}
/* -------------------------------- Back Button -----------------------------------------------*/

/* -------------------------------- Component -------------------------------------------------*/
.input-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:#FFFFFF;
    margin-bottom: 100px;
    text-align: left;
}
.input{
    color: white;
    background-color: #55BDCA;
    border: 2px solid white;
    width: 300px;
    height: 40px;
    border-radius: 10px;
    margin-top: 10px;
    padding-left: 10px;
    outline: none;
}
.label-container{
    margin-right: 10px;
}
.input-row{
    display: flex;
    flex-direction: column;
    align-items: center;
    outline: none;
    text-align: left;
    justify-content: center;
    margin: 8px;
}
.row-input{
    color: white;
    background-color: #55BDCA;
    border: 2px solid white;
    width: 317px;
    height: 45px;
    border-radius: 10px;
    margin: 3.5px;
    padding-left: 10px;
    outline: none;
}
/* -------------------------------- Component -------------------------------------------------*/

/* -------------------------------- Small Screen -------------------------------------------*/
@media screen and (max-width: 400px) {
    .container{
        overflow-y: auto;
    }
    .input-row{
        width: 100%;
    }
    
    .input{
        width: 300px;
        height: 25px;
    }
    .row-input{
        width: 318px;
        height: 32px;
    }
    
    .backBtn{
        font-size: 30px;
        margin: -170px;
        margin-top: 150px;
        color:#ffffff;
    }

    .buttons{
        bottom: 10px;
        left: 50%;
        margin-left: 8px;
        transform: translateX(-50%);
    }
    .login-button{
        width: 100%;
        height: 63px;
    }
    .login-button::before{
        width: 2px;
    }
}
/* -------------------------------- Small Screen -------------------------------------------*/
/* placeholder */
::placeholder{
    color: #FFFFFF;
}
/* -------------------------------- Buttons -------------------------------------------------*/
.buttons{
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.login-button{
    width: 319px;
    height: 63px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-weight: 700;
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

.login-button:hover{
    background-color: #FFFFFF;
    color: #1890FF;
    transform: translateZ(10px);
}

.login-button::before{
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

.login-button:hover{
    background-color: #FFFFFF;
    color: #1890FF;
    border-radius: 10px;
}

.login-button:hover::before{
    width: 100%;
    border-radius: 10px;
}
</style>