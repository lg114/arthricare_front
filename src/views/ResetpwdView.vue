<!--Resetpassword Page -->
<script>
    import { ArrowLeftBold } from '@element-plus/icons';
    import { reactive } from 'vue';
    import router from '@/router';

    export default{
        //title
        mounted(){
            document.title = 'Reset Password | ArthriCare';
        },

        setup(){
            //reset pwd data
            const resetpwd = reactive({
                email: '',
                newPassword: '',
                confirmPassword: ''
            });

            //handle reset pwd process
            const handleResetPwd = () => {

            }

            //submit reset password form
            const submitResetpwdForm = () => {
                try{
                    //Here, axios is used to send network requests, assuming the address of the backend API is '/api/resetpwd'
                    
                    //jump to login page
                    router.push("/welcome");
                }catch(error){
                    console.error("Reset failed!", error);
                }
            }

            return{
                resetpwd,
                handleResetPwd,
                submitResetpwdForm
            };
        },

        components:{
            ArrowLeftBold
        }
    };
</script>

<template>
    <div class="container">
        <el-container class = "content-container">
            <el-header>
                <router-link to = "/">
                    <el-icon class="backBtn"><ArrowLeftBold /></el-icon>
                </router-link>  
            </el-header>
            <el-main style = "height: 500px;">
                <div class = "input-container">
                    <h2>Reset Your Password</h2>
                    <b><label>Email Address</label></b>
                    <input id="input" type="email" placeholder="Please enter your email" v-model="resetpwd.email"/><br>
                    <b><label>New Password</label></b>
                    <input id="input" type="password" placeholder="Please enter new password" v-model="resetpwd.newPassword"/><br>
                    <b><label>Confirm New Password</label></b>
                    <input id="input" type="password" placeholder="Please enter new password" v-model="resetpwd.confirmPassword"/>
                </div>
            </el-main>
            <el-footer>
                <div class="buttons">
                    <router-link to = "/">
                        <el-button class = "login-button">CONTINUE</el-button>
                    </router-link>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>


<!-- the following is all css-->
<style scoped>
    .container{
        display: grid;
        flex-direction: column;
        place-items: center;
        height: 100vh;
        background-color: #1890FF;
        overflow:hidden;
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
    #input{
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
</style>