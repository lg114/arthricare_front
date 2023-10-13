<!-- Community Page -->
<script>
    import { ref } from 'vue';
    import { Delete20Regular, ThumbLike20Regular, LineHorizontal320Filled, CommentMultiple20Regular, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Filled, Pill28Filled, ChannelAdd20Regular  } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import SideBarContent from '@/component/Sidebar.vue';
    import { UserFilled } from '@element-plus/icons-vue';
    import axios from 'axios';

    export default{
        mounted() {
            document.title = "Community | ArthriCare";
            this.fetchDataFromBackend();
        },
        setup(){
            const activeBottom = ref(3);
            return {
                activeBottom
            }
        },
        data(){
            return{
                activeSection: 'discussion_section',
                user:{
                    name: 'Kris Wu',
                    level: '10',
                    points: '1000',
                    avatar: require('@/assets/user_avatar.png')
                },
                posts:[
                    {
                        postID: 1,
                        avatar: require('@/assets/friend_2.png'),
                        userID: 'testID_1',
                        username: 'Adam',
                        postedDateTime: new Date("2023-09-20T15:25:00+10:00"), // September 20, 2023, 15:20:00 AEST
                        title: '21M diagnosed with Rheumatoid Arthritis',
                        content: "I'm a 21M who was recently diagnosed with Rheumatoid Arthritis by a GP. It was first assumed I had some form of vasculitis, but I failed to ask what exactly my blood test results had shown that had her determine RA. It's a long wait for a specialist, if I can get one, and I can't find much on this disease in people my age. It is also to my understanding that blood test don't always point to a definitive diagnosis. I've had problem beginning as early as 12 and they never went away. I finally ignored my fear of being regarded as another \"self diagnosing patient\"; by taking the years of documented evidence and my research that never stopped pointing to some form of arthritis, it was so relieving to hear I wasn't crazy after all, although it's almost created more questions like the likelihood of misdiagnosis. Unfortunately, my current answers anytime soon. Is anyone familiar with rheumatoid vasculitis of similar autoimmune disorder within my age group?",
                        expanded: false,
                        numberOfLikes: 17,
                        numberOfComments: 8,
                        images: [
                            { url: require('@/assets/postImage1.png'), alt: 'postImage1 for postID 1' },
                            { url: require('@/assets/postImage2.png'), alt: 'postImage2 for postID 1' }, 
                            { url: require('@/assets/postImage3.png'), alt: 'postImage3 for postID 1' },
                            { url: require('@/assets/postImage4.png'), alt: 'postImage4 for postID 1' }
                        ]
                    },
                    {
                        postID: 2,
                        avatar: require('@/assets/friend_4.png'),
                        userID: 'testID_2',
                        username: 'Timothy',
                        postedDateTime: new Date("2023-09-20T09:30:00+10:00"), // September 20, 2023, 9:30:00 AEST
                        title: '“Morning” stiffness worse in the middle of the night?',
                        content: "While I am stiff for an hour or two in the morning, the stiffness seems much worse in the middle of the night or if I get up really early. Last night I almost bit it when I got up to go to the washroom because my brain headed in the direction of the bathroom but my hips and knees were locked and didn't want to move. Sometimes I walk like a penguin in the middle of the night (but not the cute ones!) due to feet and ankle stiffness but in the morning it isn't quite so bad. Anyone else find this?",
                        expanded: false,
                        numberOfLikes: 14,
                        numberOfComments: 8,
                        images: [
                            { url: require('@/assets/postImage5.png'), alt: 'postImage5 for postID 2' }, 
                            { url: require('@/assets/postImage6.png'), alt: 'postImage6 for postID 2' },
                            { url: require('@/assets/postImage7.png'), alt: 'postImage7 for postID 2' }
                        ]
                    }, 
                    {
                        postID: 3,
                        avatar: require('@/assets/friend_3.png'),
                        userID: 'testID_3',
                        username: 'Tom',
                        postedDateTime: new Date("2023-09-19T09:30:00+10:00"), // September 19, 2023, 9:30:00 AEST
                        title: 'When to resume mtx',
                        content: "I started mtx just over three weeks ago, took the first two weekly doses then got sick with Norovirus. Next dose was due on Saturday but pharmacist recommended not taking it until I'm 'feeling completely better.' Although the diarrhoea stopped by Thursday I still feel a bit washed out, shall I just take the next dose now I'm clear of the virus?",
                        expanded: false,
                        numberOfLikes: 3,
                        numberOfComments: 2,
                        images: [
                            { url: require('@/assets/postImage8.png'), alt: 'postImage6 for postID 3' },
                            { url: require('@/assets/postImage6.png'), alt: 'postImage7 for postID 3' }
                        ]
                    },
                    {
                        postID: 4,
                        avatar: require('@/assets/friend_5.png'),
                        userID: 'testID_4',
                        username: 'Anthony',
                        postedDateTime: new Date("2023-09-06T09:30:00+10:00"), // September 6, 2023, 9:30:00 AEST
                        title: 'This is a title for the General post',
                        content: "ghju fgufj fgrfd dfgv ed fgf f f gea.",
                        expanded: false,
                        numberOfLikes: 8,
                        numberOfComments: 6,
                        images: [
                            { url: require('@/assets/postImage1.png'), alt: 'postImage1 for postID 4' }
                        ]
                    },
                    {
                        postID: 5,
                        avatar: require('@/assets/friend_5.png'),
                        userID: 'testID_5',
                        username: 'Anthony',
                        postedDateTime: new Date("2023-08-24T09:30:00+10:00"), // August 24, 2023, 9:30:00 AEST
                        title: 'This is a title for the News post',
                        content: "The shortest content.",
                        expanded: false,
                        numberOfLikes: 8,
                        numberOfComments: 0,
                        images: []
                    }
                    // Add more posts here
                ], 
                showCommentInputId: null,
                newComment: "",
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
//============================== START: Unique Functions for Community Page ==============================//
            changeSection(sectionName) {
                this.activeSection = sectionName;
            },
            // START: 3 methods for SeeMore buttons
            truncateContent(content) {
                const sentences = content.split(" ");
                const truncated = sentences.slice(0, 22).join(" ");
                return truncated;
            },
            isitShortContent(content){
                const sentences = content.split(" ");
                const numberOfWords = sentences.length;
                if(numberOfWords < 22){
                    return true;
                }
                return false;
            },
            togglePostExpansion(post) {
                console.log('Toggling post expansion', post);
                post.expanded = !post.expanded;
            },
            goToPostDetail(postID) {
                this.$router.push({ name: 'PostDetail', params: { id: postID } });
            },
            // END: 3 methods for SeeMore buttons

            // START: 2 methods to add a comment
            showCommentInput(postID) {
                this.showCommentInputId = postID;
            },
            addComment(postid) {
                const post = this.posts.find((p) => p.postID === postid);
                post.comments.push({
                    username: this.user.name,
                    content: this.newComment,
                });
                this.newComment = "";
            },
            // END: 2 methods to add a comment

            // Note for Don: Add a function which adds/remove a like, changes the status of the thumbUp icon.
            toggleLike(){
                // Add or remove a like
                // The thumbUp icon when a user added 'a like' should be 'ThumbLike20Filled'
                // The thumbUp icon when a user removed 'a like' should be 'ThumbLike20Regular'
            },
            open_MyPosts(userID){
                this.$router.push({ name: 'MyPosts', params: { id: userID } });
            },

            // START: Merging backend
            async fetchDataFromBackend(){
                try {
                    const response = await axios.get('http://localhost:8181/ComityPost/getAllPost')

                    const posts = response.data;

                    if (posts.length !== 0) {
                        // 显示加载的帖子
                        for (const post of posts) {
                            this.makePost(post);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }, 
            async makePost(post) {
                const date = new Date(post.createdTime);
                const formattedDate = date.toLocaleString();
                
                // Await the result of makeImageArray(post)
                const images = await this.makeImageArray(post);

                const postData = {
                    id: post.postId,
                    avatar: require('@/assets/user_avatar.png'),
                    username: post.username,
                    postedDateTime: '',
                    timestamp: formattedDate,
                    title: post.title,
                    content: post.content,
                    expanded: this.determinePostExpandOrNot(post.content),
                    numberOfLikes: post.likeNum,
                    numberOfComments: post.commentNum,
                    images: images,
                    comments: []
                };

                this.posts.push(postData);
                //console.log(post);
            },
            determinePostExpandOrNot(content){
                if(content.length > 100){
                    return false;
                }
                return true;
            },
            async makeImageArray(post) {
                if (!post.haveImage) {
                    return [];
                }
                try {
                    const { data: urls } = await axios.get(`http://localhost:8181/ComityPost/getPostImages?postId=${post.postId}`);
                    const images = urls.map((url, index) => ({
                        url: "http://localhost:8181/" + url,
                        alt: `postImage${index + 1} for postID ${post.postId}`
                    }));
                    //console.log(images);
                    return images;
                } catch (error) {
                    console.error("Error fetching image URLs:", error);
                    return [];
                }
            },
            // END: Merging backend

            isItMyOwnPost(){
                // return true if the post is the logged-in user's, so that the delete icon will be appeared
                // return false if the post belongs to someone else, so that the 
                return true;  
            },
            deletePost(postid){
                // Display an alert to ask the user if he/she really wants to delete it
                if (confirm("Delete post?") == true) {
                    for (let i=0; this.posts.length[i]; i++){
                        if (postid==this.posts[i].postID){
                            // Donovan's task: Detele the post from DB
                        }
                    }
                } else {
                    // Cancel the deteting process
                }
            },
        },
//============================== END: Unique Functions for Community Page ==============================//
        components: {
            Icon,
            SideBarContent,
            UserFilled,
            LineHorizontal320Filled,
            Pill28Filled, 
            ChannelAdd20Regular, 
            Home20Regular, 
            BriefcaseMedical20Regular, 
            Gift20Regular, 
            PeopleCommunity20Filled,
            ThumbLike20Regular,  // Default like button  // When user liked a post
            CommentMultiple20Regular, // comment icon
            Delete20Regular
        },
        computed: {
            formattedPostTime() {
                return this.posts.map((post) => {
                const postDate = new Date(post.postedDateTime);
                const now = new Date();
                const timeDifference = now - postDate;
                const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

                // If the time difference is more than a week, display the posted date
                if (timeDifference > oneWeekInMilliseconds) {
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return postDate.toLocaleDateString(undefined, options);
                }

                // Calculate the time units (e.g., seconds, minutes, hours, etc.)
                const seconds = Math.floor(timeDifference / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                if (days > 0) {
                    return `${days} d`;
                } else if (hours > 0) {
                    return `${hours} h`;
                } else if (minutes > 0) {
                    return `${minutes} m`;
                } else {
                    return `${seconds} s`;
                }
                });
            },
        },
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
                </div>

                <p id="msg"></p>

                <!-- START: Discussion Section -->
                <div v-if="activeSection === 'discussion_section'">
                    <div v-for="(post, index) in posts" :key="post.postID" class="postCard">
                        <div class="icon_name_time">
                            <!-- NOTE: the code below to display an image is a hardcode and shouldn'r be used. -->
                            <img :src="post.avatar" alt="avatar" class="avatar" @click="open_MyPosts(post.userID)" />
                            <!-- NOTE: This code should work, but, for some reason, it's not working. <img :src="post.avatar" :alt="post.alt" />  -->
                            <div class="username" @click="open_MyPosts(post.userID)">{{ post.username }}</div>
                            <div class="time-ago">{{ formattedPostTime[index] }}</div>
                            <Icon v-if="isItMyOwnPost()==true" class="delete_post_icon" @click="deletePost(post.postID)"><Delete20Regular /></Icon>
                        </div>
                        <div class="content" @click="goToPostDetail(post.postID)">
                            <p class="postTitle">{{ post.title }}</p>
                            <p v-if="!post.expanded" class="content">{{ truncateContent(post.content) }}</p>
                            <p v-else class="content">{{ post.content }}</p>
                            <button v-if="isitShortContent(post.content)==false" @click="goToPostDetail(post.postID)" class="seeMoreButton">
                                ... See more
                            </button><br>
                            <div v-if="post.images && post.images.length" class="image-scroll-container">
                                <span v-for="(image, imageIndex) in post.images" :key="imageIndex">
                                    <img :src="image.url" :alt="image.alt" class="aImage"/> 
                                </span>    
                            </div>
                        </div>
                        <div class="like_comment_section" @click="goToPostDetail(post.postID)">
                            <Icon class="thumbLike_icon"><ThumbLike20Regular /></Icon>
                            <p class="numberOfLikes">{{ post.numberOfLikes }}</p>
                            <Icon class="comment_icon" @click="showCommentInput(post.postID)"><CommentMultiple20Regular /></Icon>
                            <p class="numberOfComments">{{ post.numberOfComments }}</p>
                        </div>
                        <hr style="width: 100%;">
                    </div>
                </div> 
                <!-- END: Discussion Section -->

                <!-- START: Event Section -->
                <!-- Note: At this moment, this section is just a placeholder. It's been hardcoded. -->
                <div v-if="activeSection === 'event_section'">
                    <h3>Upcoming Events</h3>
                    <div class="card_event">
                        <img src="@/assets/communityPage_event_1.jpg" alt="1st event" class="event" />
                        <h5 class="event-date">15. Apr. 2023</h5>
                        <a href="https://events.arthritis.org/index.cfm?fuseaction=donorDrive.event&eventID=1479" target="_blank" class="eventLink">2023 Walk to CURE Arthritis - Savannah, GA</a>
                    </div>
                    <div class="card_event">
                        <img src="@/assets/communityPage_event_2.jpg" alt="2nd event" class="event" />
                        <h5 class="event-date">22. Apr. 2023</h5>
                        <a href="https://events.arthritis.org/index.cfm?fuseaction=donorDrive.event&eventID=1466" target="_blank" class="eventLink">2023 Walk to CURE Juvenile Arthritis - Bloomington, MN</a>
                    </div>
                    <div class="card_event">
                        <img src="@/assets/communityPage_event_1.jpg" alt="3rd event" class="event" />
                        <h5 class="event-date">22. Apr. 2023</h5>
                        <a href="https://events.arthritis.org/index.cfm?fuseaction=donorDrive.event&eventID=1480" target="_blank" class="eventLink">2023 Walk to CURE Arthritis - Jacksonville, FL</a>
                    </div>
                </div>
                <!-- END: Event Section -->

                <!-- START: News Section -->
                <!-- Note: At this moment, this section is just a placeholder. It's been hardcoded. -->
                <div v-if="activeSection === 'news_section'" class="news_section">
                    <h3>Trending News</h3>
                        <div class="trendingNews-scroll-container">
                            <div class="card_TrendingNews">
                                <img src="@/assets/communityPage_NewsSection_1.jpg" alt="1st Treanding News" />
                                <h5 class="top-left">05. Sep. 2023</h5>
                                <h4 class="bottom-center">Australians 'in the dark' with arthritis: one of our most prevalent and costly diseases</h4>
                            </div>
                            <div class="card_TrendingNews">
                                <img src="@/assets/communityPage_NewsSection_5.jpg" alt="2nd Treanding News" />
                                <h5 class="top-left">04. Sep. 2023</h5>
                                <h4 class="bottom-center">Reducing opioid harm through regulatory changes - Information for consumers, patients and carers</h4>
                            </div>
                        </div>

                    <h3 style="padding-top:15px;">Latest News</h3>
                    <div class="card_latestNews">
                        <div class="latestNews_title_date">
                            <h4 class="latestNews-title">Arthritis Australia launches new Multicultural Resources</h4>
                            <h5 class="latestNews-date">06. Sep. 2023</h5>
                        </div>
                        <div class="latestNews_img">
                            <img src="@/assets/communityPage_NewsSection_2.jpg" alt="1st Today's News" class="latestNews" />
                        </div>
                    </div>
                    <hr class="latestNews">
                    <div class="card_latestNews">
                        <div class="latestNews_title_date">
                            <h4 class="latestNews-title">Young women urged to be vigilant and assess persistent back pain</h4>
                            <h5 class="latestNews-date">01. Sep. 2023</h5>
                        </div>
                        <div class="latestNews_img">
                            <img src="@/assets/communityPage_NewsSection_3.jpg" alt="2nd Today's News" class="latestNews" />
                        </div>
                    </div>
                    <hr class="latestNews">
                    <div class="card_latestNews">
                        <div class="latestNews_title_date">
                            <h4 class="latestNews-title">Parliamentary Friends of Arthritis event</h4>
                            <h5 class="latestNews-date">25. Aug. 2023</h5>
                        </div>
                        <div class="latestNews_img">
                            <img src="@/assets/communityPage_NewsSection_4.jpg" alt="3rd Today's News" class="latestNews" />
                        </div>
                    </div>
                    <hr class="latestNews">
                    <div class="card_latestNews">
                        <div class="latestNews_title_date">
                            <h4 class="latestNews-title">Crisis brewing in arthritis set to hit community and economy hard</h4>
                            <h5 class="latestNews-date">23. Aug. 2023</h5>
                        </div>
                        <div class="latestNews_img">
                            <img src="@/assets/communityPage_NewsSection_6.jpg" alt="4th Today's News" class="latestNews" />
                        </div>
                    </div>
                    <hr class="latestNews">
                </div>
                <!-- END: News Section -->
            </el-main> 
        </el-container>

<!--============================ START: The Bottom Navigation Bar ============================-->       
        <var-bottom-navigation
            class="footer"
            v-model:active="activeBottom"
            border="true"
            safe-area="true"
            :fab-props="{color:'#55BDCA'}"
        >
            <var-link href="/#/Home" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="homeButton">
                <Icon  style="font-size: 38px;"><Home20Regular /></Icon><br>
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
            <var-link href="/#/Community" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><PeopleCommunity20Filled /></Icon><br>
                <span>Community</span>
            </var-bottom-navigation-item>    
            </var-link>
            <!-- <template #fab >
                <var-link href="/#/AddMed" style="color: white;">
                <Icon class="addButton"><Add20Filled /></Icon>
                </var-link>
            </template> -->
        </var-bottom-navigation>
                <!-- Fab button -->
                <var-fab v-model:active="showAction" style="margin-bottom: 100px;" color="#006973" inactive-icon-size="26px" active-icon-size="30px" elevation="5">
            <var-button class="action" round color="#F27B42" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
                <var-link href="/#/AddPost" text-color="white" text-size="25px">
                <Icon><ChannelAdd20Regular /></Icon>
            </var-link>
            </var-button>
            <var-button class="action" round color="#55BDCA" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
                <var-link href="/#/AddMed" text-color="white" text-size="25px">
                    <Icon><Pill28Filled /></Icon>
                </var-link>
            </var-button>
        </var-fab>
<!--============================ END: The Bottom Navigation Bar ============================-->       
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

<style src="@/css/community.css" scoped></style>