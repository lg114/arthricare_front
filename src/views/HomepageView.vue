<!--Home Page-->
<script>
    import { ref} from 'vue';
    import { User, Bell} from '@element-plus/icons-vue';
    import { ElDrawer } from 'element-plus';
    import axios from 'axios';

    export default{
        mounted() {
            document.title = "Home | ArthriCare";
        },
        data(){
            return{
                username: '',
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
        },
        components:{
        User,
        Bell,
        ElDrawer,
    }
};
</script>

<template>
    <div class = "container">
        <el-container class = "content-container">
            <el-header class = "header">
                <el-icon class="userbtn" @click="drawer = true"><User /></el-icon>
                <span class = "username">Hello, {{ username }}</span>
                <el-icon class = "bellbtn"><Bell /></el-icon>
            </el-header>
            <el-main class = "main">
                Main
            </el-main>
            <el-footer class = "footer">
                footer
            </el-footer>
            <el-drawer v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="50%" :append-to-body = "true" :before-close = "beforeDrawerClose">
                <span>Hello</span>
            </el-drawer>
        </el-container>
    </div>
</template>

<style scoped>
    .container{
        display: flex;
        justify-content: center;
        height: 100vh;
        background-color: #1890FF;
        overflow: hidden;
    }
    .content-container{
        display: flex;
    }
    .header{
        height: 50px;
    }
    .main{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
    }
    .footer{

    }
    .userbtn{
        position: absolute;
        left: 20px;
        top: 10px;
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
    }
    .username{
        position: relative;
        top: 15px;
        left: 40px;
        color: #ffffff;
        font-weight: 550;
        font-size: 20px;
    }
    .bellbtn{
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 30px;
        color: #ffffff;
    }
</style>
