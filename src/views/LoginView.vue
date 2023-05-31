<!--Login Page -->
<script setup>
//这里我用了element plus的icon，如果没安装的话要先安装
import { ArrowLeftBold } from '@element-plus/icons'
import { ref } from 'vue'
const email = ref('');
const password = ref('');

</script>
<template>
    <div class="container" >
        <router-link to = "/"><el-icon class="backBtn">
            <ArrowLeftBold />
        </el-icon></router-link>
        <div id="form">
            <h1>Welcome Back</h1>
            <p>Login to your account</p><br>
            Email Address<br>
            <input id="input" type="email" placeholder="Please enter your email" v-model="email"/><br><br>
            Password<br>
            <input id="input" type="password" placeholder="Please enter your passowrd" v-model="password"/>
        </div>
        <div id="mid">
            Don't have an account? 
            <a href="/Signup">Sign up</a><br>
            <hr>
            Forget your password? 
            <a href="/Resetpassword">Click here</a>
        </div>
        <!--等做完homepage再把登录的链接补上！！-->
        <div class="buttons">
            <el-button class = "login-button">LOG IN</el-button> 
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
        margin-right: 400px;
        color:#FFFFFF;
    }
    #form{
        font-family: 'Myanmar Khyay';
        text-align: left;
        color:#ffffff;
        margin-left: 20px;
        position:sticky;
        bottom: 40%;
    }
    #mid{
        color: #FFFFFF;
        font-size: small;
        position:sticky;
        bottom: 30%;
        text-align: center;
        right:39%;
    }
    h1{
        font-weight: 400;
    }

    #input{
        color: white;
        background-color: #1890FF;
        border: 2px solid white;
        width: 319px;
        height: 40px;
        border-radius: 10px;
        margin-top: 5px;
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
        margin-right:60px;
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
    mounted(){
        document.title = 'Login | ArthriCare';
    },
    };
</script>