<!--Signup Page -->
<script>
    import { reactive} from 'vue';
    import { ArrowLeftBold } from '@element-plus/icons-vue';
    import { ElMessage } from 'element-plus';

    export default{
        //title
        mounted(){
            document.title = 'Sign Up | ArthriCare';
        },
        setup(){
            //set up register data
            const registerForm = reactive({
                name: '',
                gender: '',
                email: '',
                password: '',
                weight: '',
                age: '',
            });

            //submit register form
            const submitRegisterForm = () => {
                try{
                    //validate the form
                    if(registerForm.email === '' || registerForm.password === ''){
                        //if the validation failed
                        ElMessage.error('Please enter a valid email address or password');
                    }else{
                        //data need to send
                        //const dataToSend = {
                            //name: registerForm.name,
                            //gender: registerForm.gender,
                            //email: registerForm.email,
                            //password: registerForm.password,
                            //weight: registerForm.weight,
                            //age: registerForm.age,
                        //};

                        //send requeset
                        //axios.post('api/signup', dataToSend)
                            //.then(response => {
                                console.log('Sign up successful');
                                //register successful, leave all blank
                                ElMessage.success('Registration success');
                                registerForm.email = '';
                                registerForm.gender = '';
                                registerForm.name = '';
                                registerForm.password = '';
                                registerForm.weight = '';
                                registerForm.age = '';
                            //.catch(error => {
                                //console.error('Sign up failed', error);
                                //ElMessage.error("Invalid email or password");
                            //});
                    }
                }catch(error){
                    console.error("Registration failed!", error);
                }
            };

            //age selection
            const generateAgeOptions = (start, end) => {
                const options = [];
                for (let i = start; i <= end; i++) {
                    options.push(i.toString());
                }
                return options;
            };

            //weight selection
            const generateWeightOptions = (start, end) => {
                const options = [];
                for (let i = start; i <= end; i++) {
                    options.push(i.toString());
                }
                return options;
            };

            return {
            registerForm,
            submitRegisterForm,
            ageOptions: generateAgeOptions(10, 100),
            weightOptions: generateWeightOptions(35, 200),
            };
        },

        components:{
            ArrowLeftBold,
        }
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
                                    <input id = "age" type = "number" class = "input" />
                                </div>
                                
                                <div class = "input-row">
                                    <b><label for = "gender">Gender:</label></b>
                                    <select name="gender" id="gender" class = "row-input" v-model="registerForm.gender">
                                        <option value="" disabled selected>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value=" Prefer not to tell "> Prefer not to tell </option>
                                        <option value="Non-binary">Non-binary</option>
                                        <option value="Transgender"> Transgender</option>

                                    </select>
                                </div>

                                <div class = "container-flex">
                                      <b><label for = "weight" style = "position:relative;top:30%">Weight:</label></b>
                                      <input id = "weight" class = "input" type="number" style = "width:20%; margin-right:5%" /> 
                                      <select name="unit" id="unit" class = "input" style = "width:30%; height:30px">
                                        <option value="" disabled selected>Select Unit</option>
                                        <option value="male">Kg</option>
                                        <option value="female">Pound</option>
                                    </select>
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
<style scoped>
    /* -------------------------------- Base Layout -----------------------------------------------*/
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #1890FF;
        overflow: hidden;
    }
    .content-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 600px;
        width: 100%;
    }
    .container-flex{
      display:flex;
      height:100%;
      width:100%;
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
        background-color: #1890FF;
        border: 2px solid white;
        width: 300px;
        height: 40%;
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
        background-color: #1890FF;
        border: 2px solid white;
        width: 40%;
        height: 40%;
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
            margin-top: 60px;
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
    /* -------------------------------- Buttons -------------------------------------------------*/
</style>