<!--Signup Page -->
<script setup>
    import { ArrowLeftBold } from '@element-plus/icons-vue';
    import { ref} from 'vue';
    const name = ref('');
    const selectedAge = ref('');
    const gender = ref('');
    const selectedWeight = ref('');
    const email = ref('');
    const password = ref('');
</script>
<template>
    <div class = "container">
        <el-container class = "content-container">
            <el-header>
                <router-link to = "/">
                    <el-icon class = "backBtn"><ArrowLeftBold /></el-icon>
                </router-link>
            </el-header>
            <el-main style = "height: 100%; width: 100%;">
                    <div class = "input-container">
                            <h2>Sign Up</h2>
                            <div class = "input-row">
                                <b><label for = "name">Name:</label></b>
                                <input id = "name" type="text" class = "input" placeholder="Please enter your full name" v-model="name" />
                            </div>
                            
                            <div class = "input-row">
                                <b><label for = "age">Age:</label></b>
                                <select name="age" id="age" class="row-input" v-model="selectedAge">
                                    <option value="" disabled selected>Select Age</option>
                                    <option v-for="age in ageOptions" :value="age" :key="age">{{ age }}</option>
                                </select>
                            </div>
                            
                            <div class = "input-row">
                                <b><label for = "gender">Gender:</label></b>
                                <select name="gender" id="gender" class = "row-input" v-model="gender">
                                    <option value="" disabled selected>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            
                            <div class = "input-row">
                                <b><label for = "weight">Weight:</label></b>
                                <select name = "weight" id = "weight" class = "row-input" v-model = "selectedWeight">
                                    <option value="" disabled selected>Select Weight</option>
                                    <option v-for="weight in weightOptions" :value="weight" :key="weight">{{ weight }} kg</option>
                                </select>   
                            </div>
                             
                            <div class = "input-row">
                                <b><label for = "email">Email:</label></b>
                                <input id = "email" type="email" class = "input" placeholder="Please enter your email" v-model="email" /><br>
                            </div>

                            <div class = "input-row">
                                <b><label for = "password">Password:</label></b>
                                <input id = "password" type="password" class = "input" placeholder="Please enter your password" v-model="password" />
                            </div>
                    </div>
            </el-main>
            <el-footer>
                <div class="buttons">
                    <el-button class = "login-button">SIGN UP</el-button> 
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
    .input{
        color: white;
        background-color: #1890FF;
        border: 2px solid white;
        width: 300px;
        height: 40px;
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
        margin: 10px;
    }
    .row-input{
        color: white;
        background-color: #1890FF;
        border: 2px solid white;
        width: 150px;
        height: 40px;
        border-radius: 10px;
        margin: 3.5px;
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
        mounted(){
            document.title = 'Sign Up | ArthriCare';
        },
        data(){
            return {
            selectedAge: '',
            ageOptions: this.generateAgeOptions(10, 100),
            selectedWeight: '',
            weightOptions: this.generateWeightOptions(35, 200),
            };
        },
        methods:{
            generateAgeOptions(start, end){
                const options = [];
                for (let i = start; i <= end; i++) {
                    options.push(i.toString());
                }
                return options;
            },
            generateWeightOptions(start, end){
                const options = [];
                for (let i = start; i <= end; i++) {
                    options.push(i.toString());
                }
                return options;
            },

        },
    };
</script>