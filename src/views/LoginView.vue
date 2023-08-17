<!--Login Page -->
<script>
    import { ArrowLeftBold } from '@element-plus/icons-vue';
    import { reactive } from 'vue';
    import router from '@/router';
    import { ElMessage } from 'element-plus';
    
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

            //submit login form
            const submitLoginForm = () => {
                try{
                    //Use regular expressions to verify email and password
                    if(loginForm.email === '' || loginForm.password === ''){
                        //if the validation failed
                        ElMessage.error('Please enter a valid email address or password');
                    }else{
                        //data need to send
                        //const dataToSend = {
                            //email: loginForm.email,
                            //password: loginForm.password,
                        //};

                        //send request
                        //axios.post('api/login', dataToSend)
                            //.then(response => {
                            console.log('Login successful');
                            router.push('/home');
                            //.catch(error => {
                                //console.error('Login failed', error);
                                //error
                                //ElMessage.error("Invalid email or password");
                        //});
                    }
                }catch(error){
                    console.error("Login failed!", error);
                }
            };

            return{
                loginForm,
                submitLoginForm,
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
                        <div>
                            <form class="input-container">
                                <h2>Welcome Back</h2>
                                <p>Login to your account</p>
                                <b><label>Email Address</label></b>
                                <input class="input" id = "email" type="email" placeholder="Please enter your email" v-model="loginForm.email"/><br>
                                <b><label>Password</label></b>
                                <input class="input" id = "password" type="password" placeholder="Please enter your passowrd" v-model="loginForm.password"/>
                            </form>
                        </div>
                        <div id="mid">
                            Don't have an account?
                            <router-link to = "/Signup">Sign Up</router-link>
                            <hr>
                            Forget your password? 
                            <router-link to = "/Resetpassword">Click Here</router-link>
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
    }
    /* -------------------------------- Base Layout -----------------------------------------------*/

    /* -------------------------------- Back Button -----------------------------------------------*/
    .backBtn{
        font-size: 30px;
        margin: -170px;
        margin-top: 20px;
        color:#FFFFFF;
    }
    /* -------------------------------- Back Button -----------------------------------------------*/

    /* -------------------------------- Component -------------------------------------------------*/
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
    /* -------------------------------- Component -------------------------------------------------*/

    /* -------------------------------- Buttons -------------------------------------------------*/
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
    /* -------------------------------- Buttons -------------------------------------------------*/

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
            position: relative;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
        .login-button{
            height: 63px;
        }
    }
    /* -------------------------------- Small Screen -------------------------------------------*/
</style>