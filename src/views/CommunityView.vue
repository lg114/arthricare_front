<!-- Community Page -->
<script>
    import { ref } from 'vue';
    import { ChatOutlined } from '@vicons/material';
    import { ThumbLike20Regular, LineHorizontal320Filled, Add20Filled, Home20Filled, BriefcaseMedical20Regular, Gift20Regular, Person20Regular } from '@vicons/fluent'
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
            const avatar3 = ref()
            const avatar4 = ref()
            avatar1.value = require('@/assets/user_avatar.png')
            avatar2.value = require('@/assets/friend_1.png')
            avatar3.value = require('@/assets/friend_2.png')
            avatar4.value = require('@/assets/friend_3.png')
            return {
                avatar1,
                avatar2,
                avatar3,
                avatar4
            }
        },
        data(){
            return{
                activeSection: 'discussion_section',
                user:{
                    name: 'Username',
                    level: '10',
                    points: '1000',
                    avatar: '@/assets/useravatar.png' 
                },
                posts:[
                    {
                        id: 1,
                        avatar: '@/assets/user_avatar.png',
                        username: 'Adam',
                        timestamp: new Date(),
                        title: '21M diagnosed with Rheumatoid Arthritis',
                        content: "I'm a 21M who was recently diagnosed with Rheumatoid Arthritis by a GP. It was first assumed I had some form of vasculitis, but I failed to ask what exactly my blood test results had shown that had her determine RA. It's a long wait for a specialist, if I can get one, and I can't find much on this disease in people my age. It is also to my understanding that blood test don't always point to a definitive diagnosis. I've had problem beginning as early as 12 and they never went away. I finally ignored my fear of being regarded as another \"self diagnosing patient\"; by taking the years of documented evidence and my research that never stopped pointing to some form of arthritis, it was so relieving to hear I wasn't crazy after all, although it's almost created more questions like the likelihood of misdiagnosis. Unfortunately, my current answers anytime soon. Is anyone familiar with rheumatoid vasculitis of similar autoimmune disorder within my age group?",
                        expanded: false,
                        numberOfLikes: 17,
                        numberOfComments: 8,
                        images: [
                            { url: '@/assets/postImage1.png', alt: 'postImage1 for postID 1' },
                            { url: '@/assets/postImage2.png', alt: 'postImage2 for postID 1' }, 
                            { url: '@/assets/postImage3.png', alt: 'postImage3 for postID 1' },
                            { url: '@/assets/postImage4.png', alt: 'postImage4 for postID 1' }
                        ],
                    },
                    {
                        id: 2,
                        avatar: '@/assets/friend_2.png',
                        username: 'Timothy',
                        timestamp: new Date(),
                        title: '“Morning” stiffness worse in the middle of the night?',
                        content: "While I am stiff for an hour or two in the morning, the stiffness seems much worse in the middle of the night or if I get up really early. Last night I almost bit it when I got up to go to the washroom because my brain headed in the direction of the bathroom but my hips and knees were locked and didn't want to move. Sometimes I walk like a penguin in the middle of the night (but not the cute ones!) due to feet and ankle stiffness but in the morning it isn't quite so bad. Anyone else find this?",
                        expanded: false,
                        numberOfLikes: 14,
                        numberOfComments: 8,
                        images: [
                            { url: '@/assets/postImage5.png', alt: 'postImage5 for postID 2' }, 
                            { url: '@/assets/postImage6.png', alt: 'postImage6 for postID 2' },
                            { url: '@/assets/postImage7.png', alt: 'postImage7 for postID 2' }
                        ],
                    }, 
                    {
                        id: 3,
                        avatar: '@/assets/user_avatar.png',
                        username: 'Sarah',
                        timestamp: new Date(),
                        title: 'When to resume mtx',
                        content: "I started mtx just over three weeks ago, took the first two weekly doses then got sick with Norovirus. Next dose was due on Saturday but pharmacist recommended not taking it until I'm 'feeling completely better.' Although the diarrhoea stopped by Thursday I still feel a bit washed out, shall I just take the next dose now I'm clear of the virus?",
                        expanded: false,
                        numberOfLikes: 3,
                        numberOfComments: 2,
                        images: [
                            { url: '@/assets/postImage8.png', alt: 'postImage6 for postID 3' },
                            { url: '@/assets/postImage9.png', alt: 'postImage7 for postID 3' }
                        ],
                    },
                    {
                        id: 4,
                        avatar: '@/assets/user_avatar.png',
                        username: 'Anthony',
                        timestamp: new Date(),
                        title: 'This is a title for the General post',
                        content: "ghju fgufj fgrfd dfgv ed fgf f f gea.",
                        expanded: false,
                        numberOfLikes: 8,
                        numberOfComments: 6,
                        images: [
                            { url: '@/assets/postImage1.png', alt: 'postImage1 for postID 4' }
                        ],
                    },
                    {
                        id: 5,
                        avatar: '@/assets/user_avatar.png',
                        username: 'Anthony',
                        timestamp: new Date(),
                        title: 'This is a title for the News post',
                        content: "ghju fgufj fgrfd dfgv ed fgf f f gea.",
                        expanded: false,
                        numberOfLikes: 8,
                        numberOfComments: 6,
                        images: [],
                    }
                    // Add more posts here
                ],   
                events: [
                    { date: '04/15/2023' , name: '2023 Walk to CURE Arthritis - Savannah, GA', link: 'https://events.arthritis.org/index.cfm?fuseaction=donorDrive.event&eventID=1479' },
                    { date: '04/22/2023' , name: '2023 Walk to CURE Juvenile Arthritis - Bloomington, MN', link: 'https://events.arthritis.org/index.cfm?fuseaction=donorDrive.event&eventID=1466' },
                    { date: '04/22/2023' , name: '2023 Walk to CURE Arthritis - Jacksonville, FL', link: 'https://events.arthritis.org/index.cfm?fuseaction=donorDrive.event&eventID=1480' }
                ],
                drawer: ref(false),
            };
        },
        methods:{
            
            scrollToTop() {
                console.log ("scrolling")
                window.scrollTo(0, 0);
            },

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
//============================== START: Unique Functions for Community Page ==============================//
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
            // START: 3 methods for SeeMore/SeeLess buttons
            truncateContent(content) {
                const sentences = content.split(" ");
                const truncated = sentences.slice(0, 22).join(" ");
                return truncated;
            },
            togglePostExpansion(post) {
                console.log('Toggling post expansion', post);
                post.expanded = !post.expanded;
                
            },
            // END: 3 methods for SeeMore/SeeLess buttons
            viewPost() {
                // Navigate to a new page to view the whole post content
                this.$router.push('/PostDetail');
            },
            // SATR: Filter the posts by a section
            filterBysection(sectionID){
                if(sectionID==="1"){
                    // Only display the posts with Discussion section
                }else if(sectionID==="2"){
                    // Only display the posts with Event section
                }
                else if(sectionID==="3"){
                    // Only display the posts with News section
                }
                else if(sectionID==="4"){
                    // Only display the posts with Message section
                }
            },
            // END: Filter the posts by a section
            changeSection(sectionName) {
                this.activeSection = sectionName;
            },
            // Note for Don: Add a function which adds/remove a like, changes the status of the thumbUp icon.
            toggleLike(){
                // Add or remove a like
                // The thumbUp icon when a user added 'a like' should be 'ThumbLike20Filled'
                // The thumbUp icon when a user removed 'a like' should be 'ThumbLike20Regular'
            }
        },
//============================== END: Unique Functions for Community Page ==============================//
        components: {
            Icon,
            SideBarContent,
            UserFilled,
            ChatOutlined,
            LineHorizontal320Filled,
            Add20Filled, 
            Home20Filled, 
            BriefcaseMedical20Regular, 
            Gift20Regular, 
            Person20Regular,
            ThumbLike20Regular,  // Default like button  // When user liked a post
            // comment icon
        }
    };
</script>












<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="more" @click="drawer = true"><LineHorizontal320Filled /></Icon>
                <b class="pageTitle">Community</b>
            </el-header>

            <el-main class="main">
                <div class="sectionFilter">
                    <input type="radio" checked id="1" name="section" class="section" @click="changeSection('discussion_section')"><label for="1">Discussion</label>
                    <input type="radio" id="2" name="section" class="section" @click="changeSection('event_section')"><label for="2">Event</label>
                    <input type="radio" id="3" name="section" class="section" @click="changeSection('news_section')"><label for="3">News</label>
                    <input type="radio" id="4" name="section" class="section" @click="changeSection('message_section')"><label for="4">Message</label>
                </div>

                <div v-if="activeSection === 'discussion_section'">
                    <div v-for="post in posts" :key="post.id" class="postCard" @click="viewPost(post)">
                        <div class="icon_name_time">
                            <!-- NOTE: the code below to display an image is a hardcode and shouldn'r be used. -->
                            <img :src="avatar1" alt="avatar" class="avatar" />
                            <!-- NOTE: This code should work, but, for some reason, it's not working. <img :src="post.avatar" :alt="post.alt" />  -->
                            <div class="username">{{ post.username }}</div>
                            <div class="time-ago">{{ getTimeAgo(post.timestamp) }}</div>
                        </div>
                        <div class="content">
                            <p class="postTitle">{{ post.title }}</p>
                            <p v-if="!post.expanded" class="content">{{ truncateContent(post.content) }}</p>
                            <p v-else class="content">{{ post.content }}</p>
                            <button @click="viewPost(post)" class="seeMoreButton">
                                ... See more
                            </button><br>
                            <div id="image-scroll-container">
                                <span v-for="(image, imageIndex) in post.images" :key="imageIndex">
                                    <img src="@/assets/postImage3.png" :alt="image.alt" class="aImage"/> 
                                </span>    
                            </div>
                            <div class="like_comment_section">
                                <!-- Note for Don:  -->
                                <Icon class="thumbLike_icon"><ThumbLike20Regular /></Icon>
                                <p class="numberOfLikes">{{ post.numberOfLikes }}</p>
                                <Icon class="comment_icon" ><ChatOutlined /></Icon>
                                <p class="numberOfComments">{{ post.numberOfComments }}</p>
                            </div>
                        </div>
                        <hr style="width: 200%">
                    </div>

                    <!-- Note for Don: This is #4. The code below is to jump to the top of the page, but this function is not working. 
                    <div class="scroll-to-top-container">
                        <Icon @click="scrollToTop"><ArrowCircleUpTwotone class="scrollToTopButton" /></Icon>
                    </div>
                    -->
                </div> 
                <!-- END: Discussion Section -->

                <!-- START: Event Section -->
                <div v-if="activeSection === 'event_section'">
                    <table class="event-table">
                        <thead>
                            <tr>
                                <th>Dates</th>
                                <th>Upcoming Events</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(event, index) in events" :key="index">
                            <td>{{ event.date }}</td>
                            <td><a :href="event.link" target="_blank">{{ event.name }}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- END: Event Section -->

                <!-- START: News Section -->
                <!-- Note: At this moment, this section is just a placeholder. It's been hardcoded. -->
                <div v-if="activeSection === 'news_section'" class="news_section">
                    <h3>Trending News</h3>
                        <div class="trendingNews-scroll-container">
                  
                                <img src="@/assets/communityPage_NewsSection_1.png" alt="1st Treanding News" class="img-trendingNews" />
                        

                                <img src="@/assets/communityPage_NewsSection_5.png" alt="2nd Treanding News" class="img-trendingNews" />
                    
                        </div>    

                    <h3>Today's News</h3>
                    <div class="card_TodaysNews">
                        <h4>There will be a news title.</h4>
                        <h5>06. Sep. 2023</h5>
                        <img src="@/assets/communityPage_NewsSection_2.png" alt="1st Today's News" class="todaysNews" />
                    </div>
                    <hr class="todaysNews">
                    <div class="card_TodaysNews">
                        <h4>There will be a news title.</h4>
                        <h5>06. Sep. 2023</h5>
                        <img src="@/assets/communityPage_NewsSection_3.png" alt="2nd Today's News" class="todaysNews" />
                    </div>
                    <hr class="todaysNews">
                    <div class="card_TodaysNews">
                        <h4>There will be a news title.</h4>
                        <h5>06. Sep. 2023</h5>
                        <img src="@/assets/communityPage_NewsSection_4.png" alt="3rd Today's News" class="todaysNews" />
                    </div>
                </div>
                <!-- END: News Section -->

                <!-- START: Message Section -->
                <div v-if="activeSection === 'message_section'">
                    <p>Content for Message</p>
                </div>
                <!-- END: Message Section -->
            </el-main> 
        </el-container>



<!--============================ START: The Bottom Navigation Bar ============================-->       
        <var-bottom-navigation
            class="footer"
            v-model:active="active"
            border="true"
            safe-area="true"
            :fab-props="{color:'#55BDCA'}"
        >
            <var-link href="/#/Home" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="homeButton">
                <Icon  style="font-size: 38px;"><Home20Filled /></Icon><br>
                <span>Home</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/MyMeds" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="medsButton">
                <Icon style="font-size: 38px;"><BriefcaseMedical20Regular /></Icon><br>
                <span>My Meds</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/Rewards" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="rewardsButton">
                <Icon style="font-size: 38px;"><Gift20Regular /></Icon><br>
                <span>Rewards</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/UserProfile" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><Person20Regular /></Icon><br>
                <span>Profile</span>
            </var-bottom-navigation-item>    
            </var-link>
            <template #fab >
                <var-link href="/#/AddMed" style="color: white;">
                <Icon class="addButton"><Add20Filled /></Icon>
                </var-link>
            </template>
        </var-bottom-navigation>
<!--============================ END: The Bottom Navigation Bar ============================-->       
<!--============================ START: The Side Menu Bar ============================-->               
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
<!--============================ END: The Side Menu Bar ============================-->        
    </div>
</template>


<style src="@/css/community.css" scoped></style>