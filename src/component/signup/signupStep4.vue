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
                    <span @click="nextStep">Skip<var-icon name="chevron-right" color = "#006973"/></span>
                </div>
            </div>
        </el-header>
        <el-main class = "main">
            <div class = "logo">
                <img src = "@/assets/logo.png">
            </div>
            <div class = "form">
                <h1>Let's create your profile</h1>
                <h3>What is your height?</h3>
                <var-input class = "input" variant="outlined" id = "height" type="text" v-model="tempFormData.height" placeholder="Height" style = "margin-bottom: 10px;"
                :rules="[
                    (v) => !isNaN(parseFloat(v)) && isFinite(v) || 'Please enter a valid number',
                    (v) => v > 0 || 'Value must be greater than 0',
                    (v) => v.length <= 4 || 'Length cannot be greater than 4'
                ]"
                />
                <var-radio-group v-model = "tempFormData.heightUnit" style = "margin-bottom: 10px;">
                    <var-radio :checked-value="'cm'">
                        <span :style="{ color: tempFormData.heightUnit === 'cm' ? '#F27B42' : '#006973' }"><b>Cm</b></span>
                    </var-radio>
                    <var-radio :checked-value="'feet'">
                        <span :style="{ color: tempFormData.heightUnit === 'feet' ? '#F27B42' : '#006973' }"><b>Feet</b></span>
                    </var-radio>
                </var-radio-group>
                <var-button block @click = "updateData"><b>Continue</b></var-button>
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
    export default {
        props: ['formData'],
        data(){
            return {
                currentStep: 'signupStep4',
                tempFormData:{
                    height: this.formData.height,
                    heightUnit: this.formData.heightUnit,
                }
            }
        },
        methods:{
            updateData(){
                this.$emit('updateFormData',{
                    height: this.tempFormData.height,
                    heightUnit:this.tempFormData.heightUnit
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
                    this.tempFormData.height = newValue.height;
                    this.tempFormData.heightUnit = newValue.heightUnit;
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
    .form{
        --radio-checked-color: #F27B42;
        --radio-unchecked-color: #006973;
        --button-default-color: #006973;
        --button-default-text-color: #CFEEF5;
        --button-normal-height: 56px;
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
    h1{
        color:#006973;
    }
    h3{
        color:#006973;
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
