<!--Resetpassword Page -->
<script setup>
//这里我用了element plus的icon，如果没安装的话要先安装
import { ArrowLeftBold } from '@element-plus/icons'
import { ref } from 'vue'
const email = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
</script>

<template>
    <div class="container">
        <router-link to = "/Login"><el-icon class="backBtn">
            <ArrowLeftBold />
        </el-icon></router-link>
        <div id="form">
            <h1>Reset Your Password</h1><br>
            Email Address<br>
            <input id="input" type="email" placeholder="Please enter your email" v-model="email"/><br><br>
            New Password<br>
            <input id="input" type="password" placeholder="Please enter new password" v-model="newPassword"/><br><br>
            Confirm New Password<br>
            <input id="input" type="password" placeholder="Please enter new password" v-model="confirmPassword"/>
        </div>
        <div class="buttons">
            <el-button class = "login-button">CONTINUE</el-button> 
        </div>
    </div>
</template>

<style scoped>
    .container{
    display: grid;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background-color: #1890FF;
    overflow:hidden;
}
    .backBtn{
        font-size: 30px;
        margin-top: 80px;
        color:#FFFFFF;
    }
    h1{
        font-weight: 400;
    }
    #form{
        text-align: left;
        color:#ffffff;
        margin-left: 20px;
        position:sticky;
        bottom: 35%;
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

<script>
    export default{
    data(){
        return {
            email: '',
            newPassword: '',
            confirmPassword: ''
        };
    },
    mounted(){
        document.title = 'Reset Password | ArthriCare';
    },
    };
</script>