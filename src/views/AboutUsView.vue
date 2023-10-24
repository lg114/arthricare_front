<!-- About Us Page -->
<script>
    import { ref } from 'vue';
    import { LineHorizontal320Filled, DocumentPill20Regular, FolderPerson20Regular, PeopleCommunity20Filled,
        Notepad20Regular } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import SideBarContent from '@/component/Sidebar.vue';

    export default{
        mounted() {
            document.title = "About Us | ArthriCare";
        },
        setup(){
            return {
                
            }
        },
        data(){
            return{
                user:{
                    name: 'Kris Wu',
                    level: '10',
                    points: '1000',
                    avatar: require('@/assets/user_avatar.png')
                },
                drawer: ref(false),
            };
        },
        methods:{
            openDrawer() {
                this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
            /* START: Unique Methods of About Us */
            goTo_MyMeds() {
                this.$router.push('/MyMeds');
            },
            goTo_Education() {
                this.$router.push('/Education');
            },
            goTo_Home() {
                this.$router.push('/Home');
            },
            goTo_Community() {
                this.$router.push('/Community');
            },
            goTo_SignUp() {
                this.$router.push('/Signup');
            },
            /* END: Unique Methods of About Us */
        },
//============================== END: Unique Functions for Community Page ==============================//
        components: {
            Icon,
            SideBarContent,
            LineHorizontal320Filled,
            DocumentPill20Regular,
            FolderPerson20Regular,
            PeopleCommunity20Filled,
            Notepad20Regular
        },
        computed: {
           
        },
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
                <b class="pageTitle">About Us</b>
            </el-header>

            <el-main class="main">   
                <div class="background">
                    <div class="whiteCircle_S" style="position: absolute; top:-90px; left:-80px;"></div>
                    <div class="whiteCircle_L" style="position: absolute; top:105px; left:50px;"></div>
                    <img src="@/assets/logo_rectangle.png" alt="largeLogo" class="largeLogo" style="position: absolute; top:210px; left:110px;"> 
                    <div class="whiteCircle_M" style="position: absolute; top:510px; left:-70px;"></div>
                </div>
                
                <div class="content">
                    <h1 id="EmpoweringJoints" style="color: #006973;">Empowering Joints<br>Rewarding Lives </h1>
                    <h3 style="color: #38404C;">Your path to Pain-Free Living!</h3>
                    <p class="miniTitle">Why ArthriCare?</p>
                    <p id="content_whyArthriCare">We support arthritis patients in managing their medication and health effectively. Our mission is to provide a user-friendly and comprehensive tool that empowers patients to take control of their well-being and connect with a supportive community.</p>

                    <div class="fourMainFeatures">
                        <div class="twoFeatures">
                            <div class="whiteBackground">
                                <Icon class="fourIcons" @click="goTo_MyMeds()"><DocumentPill20Regular /></Icon>
                                <p class="feature">Medication<br>Tracking</p>
                            </div>
                            <div class="whiteBackground">
                                <Icon class="fourIcons" @click="goTo_Education()"><Notepad20Regular /></Icon>
                                <p class="feature">Eucational<br>Resource</p>
                            </div>
                        </div>
                        <div class="twoFeatures">
                            <div class="whiteBackground">
                                <Icon class="fourIcons" @click="goTo_Home()"><FolderPerson20Regular /></Icon>
                                <p class="feature">Personalised<br>Insights</p>
                            </div>
                            <div class="whiteBackground">
                                <Icon id="comunityIcon" @click="goTo_Community()"><PeopleCommunity20Filled /></Icon>
                                <p class="feature">Community<br>Support</p>
                            </div>
                        </div>
                    </div>

                    <div class="parent_doctors">
                        <img src="@/assets/doctor_female.png" alt="female doctor" id="img_doctor_female">
                        <img src="@/assets/doctor_male.png" alt="male doctor" id="img_doctor_male">

                        <div class="child_fadedBox"></div>
                    </div>

            
                </div>
            </el-main>
             
            <div class="footer_aboutUs">
                <h1 id="GetStartedWith">Get started with<br>ArthriCare today</h1>
                <button class="button_signUp" @click="goTo_SignUp()">SIGN UP</button>

                <p id="contactUs">CONTACT US</p>
                <a href="mailto:arthricare@gmail.com">arthricare@gmail.com</a><br>

                <img src="@/assets/logo.png" alt="footerLogo" class="footerLogo"> 
                <p class="name">© 2023 ArthriCare</p>
            </div>
        </el-container>

<!--============================ START: The Side Menu Bar ============================-->               
        <el-drawer style="background-color: #006973;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
            <!--Action是模拟接口，与后端连接时更换-->
                <div class = "sidebar">
                    <el-upload action="" :show-file-list="false">
                        <el-avatar :size="65">
                            <img :src="imgUrl" v-if="imgUrl" class="uploaded-avatar" />
                                <template v-else>
                                    <UserFilled class="defalut-avatar" />
                                </template>
                        </el-avatar>   
                    </el-upload> 
                </div>
            <SideBarContent :imgUrl="imgUrl" />    
        </el-drawer>
<!--============================ END: The Side Menu Bar ============================-->        
    </div>
</template>

<style src="@/css/aboutUs.css" scoped></style>