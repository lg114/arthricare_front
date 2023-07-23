<!--Login Page -->
<script>
    import { ArrowLeftBold } from '@element-plus/icons-vue';
    import { ref,reactive } from 'vue';
    import router from '@/router';

    export default{
        //title
        mounted() {
            document.title = "Login | ArthriCare";
        },
        setup(){
            //setup login data
            const loginForm = reactive({
                email: '',
                password: '',
            });

            //default show error message
            const showError = ref(false);

            //handle login process
            const handlelogin = () => {
                if(loginForm.email === '' || loginForm.password === ''){
                    showError.value = true;
                }else{
                    showError.value = false;
                    router.push('/Home');
                }
            };

            //submit login form
            const submitLoginForm = () => {
                try{
                    //Here, axios is used to send network requests, assuming the address of the backend API is '/api/login'
                    
                    //jump to login page
                    router.push("/home");
                }catch(error){
                    console.error("Login failed!", error);
                }
            };

            return{
                loginForm,
                handlelogin,
                submitLoginForm,
                showError,
            };
        },
        components: {
            ArrowLeftBold
        },
    }
</script>
<template>
    <div class="container" >
        <el-container class = "content-container">
            <el-header>
                <router-link to = "/">
                    <el-icon class = "backBtn"><ArrowLeftBold /></el-icon>
                </router-link>
            </el-header>
            <el-main style = "height: 500px">
                    <div class = "input-container">
                        <h2>Welcome Back</h2>
                        <p>Login to your account</p>
                        <b><label>Email Address</label></b>
                        <input class="input" id = "email" type="email" placeholder="Please enter your email" v-model="loginForm.email"/><br>
                        <b><label>Password</label></b>
                        <input class="input" id = "password" type="password" placeholder="Please enter your passowrd" v-model="loginForm.password"/>
                    </div>
                    <div id="mid">
                        Don't have an account?
                        <router-link to = "/Signup">Sign Up</router-link>
                        <hr>
                        Forget your password? 
                        <router-link to = "/Resetpassword">Click Here</router-link>

                        <p v-if="showError" class="error">Please enter email address or password</p>
                    </div>
            </el-main>
            <el-footer>
                <div class="buttons">
                     <el-button class = "login-button" @click = "submitLoginForm">LOG IN</el-button>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<style scoped>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #1890FF;
        overflow: auto;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .backBtn{
        font-size: 30px;
        margin: -170px;
        margin-top: 20px;
        color:#FFFFFF;
    }
    .input-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color:#FFFFFF;
        margin-bottom: 40px;
        text-align: left;
    }
    .input-container h2{
        margin: 10;
        font-weight: 600;
    }
    #mid{
        color: #FFFFFF;
        font-size: small;
        text-align: center;
        bottom: 30%;
    }
    .input{
        color: white;
        background-color: #1890FF;
        border: 2px solid white;
        width: 300px;
        height: 40px;
        border-radius: 10px;
        margin-top: 5px;
        padding-left: 10px;
        outline: none;
    }
    ::placeholder{
        color: #FFFFFF;
    }
    hr{
        width:350px;
    }
    a{
        color: #FFFFFF;
        text-decoration: underline;
    }
    .buttons{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .login-button{
        width: 319px;
        height: 63px;
        margin-bottom: 10px;
        border-radius: 10px;
        font-weight: 700;
    }

    .login-button{
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
    .error{
        color: #FF5F5F;
        font-size:x-large;

    }
</style>