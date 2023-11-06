<!--   
    Author: Lin Gan
    Student number: 6502933
    Date: 2023/10/20 
-->
<template>
    <el-container class = "container">
        <el-header class = "header">
            <div>
                <div class = "buttons">
                    <span @click="prevStep"><var-icon name="chevron-left" color = "#006973"/>Back</span>
                </div>
            </div>
        </el-header>
        <el-main class = "main">
            <div class = "logo">
                <img src = "@/assets/logo.png">
            </div>
            <div class = "form">
                <h1>Let's create your profile</h1>
                <h3>What is your email address?</h3>
                <var-input class="input" variant="outlined" id = "email" type="email" placeholder="Email" v-model="tempFormData.email"
                :rules="[
                    (v) => !!v || 'Email is required',
                    (v) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || 'E-mail must be valid'
                ]"
                /><br>
                <var-input class="input" variant="outlined" id = "password" :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="tempFormData.password">
                <template #append-icon>
                        <span @click="showPassword = !showPassword" style="font-size: 15px;">{{ showPassword ? 'Hide' : 'Show' }}</span>
                    </template>
                </var-input>
                <br>
                <var-button block @click = "updateData"><b>Submit</b></var-button>
            </div>
        </el-main>
        <el-footer class = "footer">
            <div>
                <span>© 2023 ArthriCare</span>
            </div>
        </el-footer>
    </el-container>
</template>
<script>
    import { ref } from 'vue';

    export default {
        props: ['formData'],
        data(){
            return {
                currentStep: 'signupStep6',
                tempFormData: {
                    email: this.formData.email,
                    password: this.formData.password,
                },
                showPassword: ref(false),
            }
        },
        methods:{
            updateData(){
                this.$emit('updateFormData',{
                    email: this.tempFormData.email,
                    password: this.tempFormData.password,
                });
                this.$emit('continueToNextStep');
            },
            prevStep() {
                this.$emit('prevStep');
            },
                nextStep() {
                this.$emit('nextStep');
            },
        },
        watch:{
            formData:{
                deep: true,
                handler(newValue) {
                this.tempFormData.email = newValue.email;
                this.tempFormData.password = newValue.password;
            },
        }
        }
    }
</script>
<style scoped>
    .container{
        background-color: #CFEEF5;
        height: 100vh;
    }
    .header{
        margin-top: 5%;
    }
    .buttons{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center; 
    }
    .header span{
        color: #006973;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
    }
    .logo{
        position: relative;
        left: -2%;
    }
    img{
        width: 25%;
    }
    h1{
        color:#006973;
    }
    h3{
        color:#006973;
    }
    .input{
        width: 100%;
        font-weight: bold;
        border-radius: 10px;
        --field-decorator-text-color: #006973;
        --field-decorator-focus-color: #F27B42;
        --field-decorator-blur-color: #006973;
        --field-decorator-placeholder-size: 16px;
        --field-decorator-line-size: 2px;
        --input-input-font-size: 18px;
    }   
    .form{
        --button-default-color: #006973;
        --button-default-text-color: #CFEEF5;
        --button-normal-height: 56px;
    }
    .footer div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footer span{
        margin-left: 8px;
        color: #006973;
        font-size: 15px;
        font-weight: 500;
    }
    @media screen and (min-width: 768px){
        img{
            width: 15%;
            margin-left: 25px;
        }
    }
</style>
