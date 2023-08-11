<!--Resetpassword Page -->
<script>
    import { ArrowLeftBold } from '@element-plus/icons';
    import { ref } from 'vue';
    import store from '@/store';

    export default{
        //title
        mounted(){
            document.title = 'Reset Password | ArthriCare';
        },

        setup(){
            //reset pwd data
            const email = ref('');
            const newPassword = ref('');

            //submit reset password form
            const handleReset = async () => {
                try{
                    await store.dispatch('user/resetPassword', {
                        email: email.value,
                        newPassword: newPassword.value,
                    });
                }catch(error){
                    console.error("Reset failed!", error);
                }
            }
            return{
                email,
                newPassword,
                handleReset,
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
                    <input id="input" type="email" placeholder="Please enter your email" v-model="email"/><br>
                    <b><label>New Password</label></b>
                    <input id="input" type="password" placeholder="Please enter new password" v-model="newPassword"/><br>
                </div>
            </el-main>
            <el-footer>
                <div class="buttons">
                    <el-button class = "login-button" @click = "handleReset">CONTINUE</el-button>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>


<!-- the following is all css-->
<style src = "@/css/resetpwd.css" scoped></style>