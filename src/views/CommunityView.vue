<!-- Community Page -->
<script>
    import { ref } from 'vue';
    import { MoreHorizFilled, MedicationOutlined, CardGiftcardOutlined, HomeRound, AccountCircleOutlined, AddCircleFilled } from '@vicons/material';
    import { Icon } from '@vicons/utils'
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    export default{
        mounted() {
            document.title = "Community | ArthriCare";
        },
        setup(){
            const avatar1 = ref()
            const avatar2 = ref()
            avatar1.value = require('@/assets/user_avatar.png')
            avatar2.value = require('@/assets/friend_1.png')
            return {
                avatar1,
                avatar2
            }
        },
        data(){
            return{
                user:{
                    name: 'Username',
                    level: '10',
                    points: '1000'
                },
                posts:[
                    {
                        id: 1,
                        avator: '@/assets/user_avatar.png',
                        username: 'Adam',
                        timestamp: new Date(),
                        content: "I'm a 21M who was recently diagnosed with Rheumatoid Arthritis by a GP. It was first assumed I had some form of vasculitis, but I failed to ask what exactly my blood test results had shown that had her determine RA. It's a long wait for a specialist, if I can get one, and I can't find much on this disease in people my age. It is also to my understanding that blood test don't always point to a definitive diagnosis. I've had problem beginning as early as 12 and they never went away. I finally ignored my fear of being regarded as another \"self diagnosing patient\"; by taking the years of documented evidence and my research that never stopped pointing to some form of arthritis, it was so relieving to hear I wasn't crazy after all, although it's almost created more questions like the likelihood of misdiagnosis. Unfortunately, my current answers anytime soon. Is anyone familiar with rheumatoid vasculitis of similar autoimmune disorder within my age group?",
                        expanded: false,
                        numberOfLikes: '17',
                        numberOfComments: '8'
                    },
                    {
                        id: 2,
                        avator: '@/assets/friend_2.png',
                        username: 'Timothy',
                        timestamp: new Date(),
                        content: "ABC gfvgh frews fr fr f frfrw aafe afe fr dwe ffff wgrwf gr g ytgfd cvkuytg fvghytgf dcvkuy tgfv g h ytgf dcvk uytgfvg hytgf dcvku ytgf vghy tgfd cvkuytg fvg hyt gfdcvk uy tgf vghytg fdc v.",
                        expanded: false,
                        numberOfLikes: '6',
                        numberOfComments: '4'
                    }
                    // Add more posts here
                ],   
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
            //Router
            goToUserProfile(){
                this.$router.push('/UserProfile');
            },
//========= START: Unique methods for Community Page
            getTimeAgo(timestamp) {
                // Implement the function to calculate time ago from the given timestamp
                const currentTime = new Date();
                const postTime = new Date(timestamp);

                const timeDifference = currentTime - postTime;
                const seconds = Math.floor(timeDifference / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                if (days > 0) {
                    return days + 'd';
                } else if (hours > 0) {
                    return hours + 'h';
                } else if (minutes > 0) {
                    return minutes + 'm';
                } else {
                    return seconds + 's';
                }
            },
// here
            truncateContent(content) {
                const sentences = content.split(".");
                const truncated = sentences.slice(0, 3).join(".") + ".";
                return truncated;
                },

            expandPost (post){
                post.expanded = true;
            
            },

            togglePostExpansion(post) {
                console.log('Toggling post expansion', post);
                post.expanded = !post.expanded;
                
                },

//here end


            viewPost() {
                // Navigate to a new page to view the whole post content
                this.$router.push('/PostDetail');
            },

        },
//========= END: Unique methods for Community Page
        components: {
            Icon,
            MoreHorizFilled,
            MedicationOutlined, 
            CardGiftcardOutlined, 
            HomeRound, 
            AccountCircleOutlined,
            AddCircleFilled,
            SideBarContent,
            UserFilled
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><MoreHorizFilled /></Icon>
                <b class="pageTitle">Community</b>
            </el-header>
            <el-main class="main">
                <div id="filterSection">
                    <div class="topic">
                        <input type="radio" checked id="1" name="topic" class="topic"><label for="1">General</label>
                        <input type="radio" id="2" name="topic" class="topic"><label for="2">Symptoms</label>
                        <input type="radio" id="3" name="topic" class="topic"><label for="3">Lifestyle</label>
                        <input type="radio" id="4" name="topic" class="topic"><label for="4">News</label>
                    </div>

                    <div>
                        <select name="sortingBy" class="sortingBy">
                            <option value="Latest">Latest</option>
                            <option value="Oldesr">Oldesr</option>
                            <option value="Popular">Popular</option>
                        </select>
                    </div>
                </div>

                <div v-for="post in posts" :key="post.id" class="postCard" @click="viewPost(post)">
    <img :src="avatar1" alt="avatar" class="avatar" />
    <span class="username">{{ post.username }}</span>
    <span class="time-ago">{{ getTimeAgo(post.timestamp) }}</span>
    <div class="content">
        <p v-if="!post.expanded">{{ truncateContent(post.content) }}</p>
        <p v-else>{{ post.content }}</p>
        <button @click.stop="togglePostExpansion(post)">
            {{ post.expanded ? "Show less" : "See more" }}
        </button>
    </div>
</div>


            </el-main> 
        </el-container>


        <el-footer class="footer">
                <router-link to = "/Home">
                        <Icon class="footerBtn" id="home"><HomeRound /></Icon>      
                </router-link>
                <router-link to = "/MyMeds">
                    <Icon class="footerBtn" id="medication"><MedicationOutlined /></Icon>  
                </router-link>
                <router-link to = "/AddMed">
                    <Icon class="footerBtn" id="addMed"><AddCircleFilled /></Icon>  
                </router-link>
                <router-link to = "/Rewards">
                <Icon class="footerBtn" id="rewards"><CardGiftcardOutlined /></Icon>
                </router-link>
                <Icon class="footerBtn" id="profile"><AccountCircleOutlined /></Icon><br>
                <span id="homeText">Home</span>
                <span id="medText">My Meds</span>
                <span id="rewardsText">Rewards</span>
                <span id="profileText">Profile</span>
        </el-footer>
        <el-drawer style="background-color: #1890FF;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
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
    </div>
</template>


<style src = "@/css/community.css" scoped></style>