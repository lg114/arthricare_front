<script>
    export default {
        //title
        mounted(){
            document.title = 'Privacy policy | ArthriCare';
        },
        methods: {
            goback() {
                this.$router.push('/');
            },
        },
    };
</script>

<template>
    <el-container class = "container">
        <el-header class = "header">
            <var-icon name="chevron-left" class="header-icon" @click="goback"/>
            <b style="font-size: 20px;">Privacy Policy</b>
        </el-header>
        <el-main class = "main">
            <div class = "title">
                <img src="@/assets/logo.png"/>
                <h3>Privacy Policy</h3>
            </div>
            <div class = "paragh">
                <h4>PRIVACY POLICY - ARTHRICARE PROJECT</h4>
                <i><b>UPDATED OCTOBER 5, 2023</b></i>
                <h5>Welcome to the Arthricare website. Before using this website, please carefully read this Privacy Policy to understand how we handle your personal data.</h5>
                <p>
                    We have the highest regard for your privacy and personal information and realize that the success of our services depends on the trust that you have in the way we handle your personal information. 
                    By entrusting us with your information, we would like to assure you of our commitment to keep such information private. 
                    We have taken considerable steps to protect the confidentiality, security and integrity of this information. 
                    We encourage you to review the following information carefully.
                </p>
                <b><p>1. Data Collection and Use</p></b>
                <p>1.1 Personal Information</p>
                <p>In the course of using the Arthricare website, we may collect the following types of personal information:</p>
                <p>~ Name: Used for personalizing your user experience and communication.</p>
                <p>~ Email Address: Used for contacting you, sending important notices, and updates.</p>
                <p>~ More information such as gender, weight, height etc.</p>
                <b><p>2. Data Protection</p></b>
                <p>We have implemented appropriate security measures to protect your personal information. We use encryption technology to secure the transmission of sensitive information, and only authorized</p>
                <b><p>3. Change to Privacy Policy</p></b>
                <p>We may update this Privacy Policy periodically to reflect changes on our website and legal requirements. Please check this page regularly for the latest information.</p>
                <b><p>4. Contact Us</p></b>
                <p>If you have any questions or suggestions regarding this Privacy Policy, please contact us at: arthricare@ar.com</p>
            </div>
        </el-main>
    </el-container>
</template>
<style scoped>
    .container{
        height: 100%;
    }
    .header{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #006973;
        color: #FFFFFF;
        height: 80px;
    }
    .header-icon{
        font-size: 25px;
        position: absolute;
        left: 5%;
        font-weight: bold;
    }
    .main{
        --el-main-padding: 0;
        background-color: #FFFFFF;
    }
    .title{
        display: flex;
        justify-content: center;
        align-items: center;
        color:#006973;
        background-color: #F1F2F7;
        padding: 5px;
    }
    .title img{
        width: 25vw;
        padding-right: 10px;
    }
    .paragh{
        padding: 15px;
        color: #38404C;
    }
</style>