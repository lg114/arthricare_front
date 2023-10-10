<!-- About Us Page -->
<script>
    import { ref } from 'vue';
    import { LineHorizontal320Filled } from '@vicons/fluent'
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

            /* END: Unique Methods of About Us */
        },
//============================== END: Unique Functions for Community Page ==============================//
        components: {
            Icon,
            SideBarContent,
            LineHorizontal320Filled
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
                <div>
                    <span class="whiteCircle" style="height:185px; width:185px; top:-60px; left:-100px;"></span>
                    <span class="whiteCircle" style="height:372px; width:372px; top:-70px; left:110px;"></span>
                    <span class="whiteCircle" style="height:263px; width:263px; top:-30px; left:-90px;"></span>
                    
                    <h1 style="top:-860px; left:10px;">Empowering Joints <br>Rewarding Lives </h1>
                    <h3 style="top:-860px; left:10px;">Your path to Pain-Free Living!</h3>
                    <img src="@/assets/logo.png" alt="largeLogo" class="largeLogo"> 


                </div>
            </el-main> 
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