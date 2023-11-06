<!-- 404 NotFoundPage -->
<script>
    import { ref } from 'vue';
    import SideBarContent from '@/component/Sidebar.vue';
    import { LineHorizontal320Filled } from '@vicons/fluent';
    import { Icon } from '@vicons/utils';

    export default{
        mounted() {
            document.title = "404 NotFoundPage | ArthriCare";
        },
        setup(){
            //const avatar = ref([]);
        },
        data(){
            return{
                drawer: ref(false)
            }
        },
        methods: {
            openDrawer() {
                this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
            takeMeHome(){
                this.$router.push('/Home');
            },
            goBack(){
                this.$router.go(-1);
            }
        },
        components: {
            Icon,
            SideBarContent,
            LineHorizontal320Filled
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
            </el-header>

            <el-main class="main">
                <div class="section_404">
                    <div>
                        <b class="textFour">4</b>
                    </div>
                    <div>
                        <img src="@/assets/capsulesLightBlue.png" alt="capsule image" id="capsulesLightBlue">
                    </div>
                    <div>
                        <b class="textFour">4</b>
                    </div>
                </div>
                <p id="pageNotFound">page not found</p>

                <p id="errorMessage">Sorry, the page you are looking for doesn't exist. Here are some helpful links:</p>
                <button id="takeMeHome" @click="takeMeHome()">Take me home</button><br>
                <button id="goBack" @click="goBack()">Go back</button>
            </el-main> 
        </el-container>

        <!--============================ START: The Side Menu Bar ============================-->               
        <el-drawer style="background-color: #006973;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
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

<style src = "@/css/notFoundPage.css" scoped></style>