<!--Resetpassword Page -->
<script>
    import { ArrowLeftBold } from '@element-plus/icons';
    import { reactive } from 'vue';
    import { ElMessage } from 'element-plus';

    export default{
        //title
        mounted(){
            document.title = 'Reset Password | ArthriCare';
        },

        setup(){
            //reset pwd data
            const resetpwdForm = reactive({
                email: '',
                newPassword: '',
                confirmPassword: ''
            });

            //email regular expression
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            //submit reset password form
            const submitResetpwdForm = () => {
                try{
                    //validate the form
                    if(!emailRegex.test(resetpwdForm.email)){
                        ElMessage.error('Email is not valid');
                    }else if(resetpwdForm.newPassword !== resetpwdForm.confirmPassword){
                        ElMessage.error('New password and confirm new password do not match');
                    }else{
                        //data need to send
                        //const dataToSend = {
                            //email: resetpwdForm.email,
                            //newPassword: resetpwdForm.newPassword,
                        //};

                        //send request
                        //axios.post('/api/reset-password', dataToSend)
                            //.then(response => {
                                console.log('Password reset successful');
                                //After successfully resetting the password, leave it all blank
                                ElMessage.success('Password reset successfully');
                                resetpwdForm.email = '';
                                resetpwdForm.newPassword = '';
                                resetpwdForm.confirmPassword = '';
                            //})
                            //.catch(error => {
                                //console.error('Password reset failed', error);
                                //error
                                //ElMessage.error('Password reset failed');
                            //});
                    }
                }catch(error){
                    console.error("Reset failed!", error);
                }
            }

            return{
                resetpwdForm,
                submitResetpwdForm,
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
                    <input id="input" type="email" placeholder="Please enter your email" v-model="resetpwdForm.email"/><br>
                    <b><label>New Password</label></b>
                    <input id="input" type="password" placeholder="Please enter new password" v-model="resetpwdForm.newPassword"/><br>
                    <b><label>Confirm New Password</label></b>
                    <input id="input" type="password" placeholder="Please enter new password" v-model="resetpwdForm.confirmPassword"/>
                </div>
            </el-main>
            <el-footer>
                <div class="buttons">
                    <el-button class = "login-button" @click = "submitResetpwdForm">CONTINUE</el-button>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>


<!-- the following is all css-->
<style scoped>
    /* -------------------------------- Base Layout -----------------------------------------------*/
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
</style>