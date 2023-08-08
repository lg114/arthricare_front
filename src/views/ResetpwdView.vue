<!--Resetpassword Page -->
<script>
    import { ArrowLeftBold } from '@element-plus/icons';
    import { reactive } from 'vue';
    import { ElMessage } from 'element-plus';
    import axios from 'axios';
    import router from '@/router';

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
            });


            //submit reset password form
            const submitResetpwdForm = async () => {
                const email = resetpwdForm.email;
                const newPassword = resetpwdForm.newPassword;
                try{
                    //validate the form
                    if(resetpwdForm.email === ''){
                        ElMessage.error('Email is not valid');
                    }else{
                        // send to backend
                        const response = await axios.put('http://localhost:8181/api/updatePasswordbyemail', 
                        {
                            email: email,
                            password: newPassword,
                        });
                        console.log (response.data);
                        console.log('Password reset successful');
                        //After successfully resetting the password, leave it all blank
                        ElMessage.success('Password reset successfully');
                        resetpwdForm.email = '';
                        resetpwdForm.newPassword = '';
                        resetpwdForm.confirmPassword = '';
                        router.push('/Login');
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
<style src = "@/css/resetpwd.css" scoped></style>