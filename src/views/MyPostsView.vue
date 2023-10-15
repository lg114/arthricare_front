<!-- MyPosts Page -->
<script>
    import { ref } from 'vue';
    import { ChevronLeft20Filled, ThumbLike20Regular, CommentMultiple20Regular, Pill28Filled, ChannelAdd20Regular , Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Filled } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import { mapGetters } from 'vuex';
    import axios from 'axios';

    export default{
        mounted() {
            document.title = "My Posts | ArthriCare";
            this.loadUserProfileAndChatButton();
            this.loadUserPosts(this.selectedUser_postsPage.userID); 
        },
        setup(){
            const activeBottom = ref(3);
            const avatar1 = ref()
            const avatar2 = ref()
            const avatar3 = ref()
            const avatar4 = ref()
            avatar1.value = require('@/assets/user_avatar.png')
            avatar2.value = require('@/assets/friend_1.png')
            avatar3.value = require('@/assets/friend_2.png')
            avatar4.value = require('@/assets/friend_3.png')
            return {
                activeBottom,
                avatar1,
                avatar2,
                avatar3,
                avatar4
            }
        },
        data(){
            return{
                user:{
                    name: 'Kris Wu',
                    level: '10',
                    points: '1000',
                    avatar: '@/assets/useravatar.png' 
                },
                /* Example data of a user who has been selected on the Community Page to see more about his/her post detail
                   This info should come from the previous page (Community Page)    */
                selectedUser_postsPage:{
                    name: 'Adam',
                    userID: 'testID_1',  
                    avatar: this.avatar3,
                    totalNumberOfPosts: 0,
                    posts: [ 
                        // September 19, 2023, 12:30:00 AEST
                        { postID: 1, avatar: '@/assets/user_avatar.png', postedDateTime: new Date("2023-09-19T12:30:00+10:00"), title: '21M diagnosed with Rheumatoid Arthritis', content: "I'm a 21M who was recently diagnosed with Rheumatoid Arthritis by a GP. It was first assumed I had some form of vasculitis, but I failed to ask what exactly my blood test results had shown that had her determine RA. It's a long wait for a specialist, if I can get one, and I can't find much on this disease in people my age. It is also to my understanding that blood test don't always point to a definitive diagnosis. I've had problem beginning as early as 12 and they never went away. I finally ignored my fear of being regarded as another \"self diagnosing patient\"; by taking the years of documented evidence and my research that never stopped pointing to some form of arthritis, it was so relieving to hear I wasn't crazy after all, although it's almost created more questions like the likelihood of misdiagnosis. Unfortunately, my current answers anytime soon. Is anyone familiar with rheumatoid vasculitis of similar autoimmune disorder within my age group?", expanded: false, numberOfLikes: 17, numberOfComments: 8, images: [ { url: '@/assets/postImage1.png', alt: 'postImage1 for postID 1' }, { url: '@/assets/postImage2.png', alt: 'postImage2 for postID 1' }, { url: '@/assets/postImage3.png', alt: 'postImage3 for postID 1' }, { url: '@/assets/postImage4.png', alt: 'postImage4 for postID 1' } ], comments: [] }, 
                        // September 14, 2023, 15:45:00 AEST
                        { postID: 2, avatar: '@/assets/user_avatar.png', postedDateTime: new Date("2023-09-14T15:45:00+10:00"), title: 'The second post from Adam', content: "fgwtgiuh gtrw fr fr w gt e4g s egr wfe wfe.", expanded: false, numberOfLikes: 3, numberOfComments: 2, images: [ { url: '@/assets/postImage1.png', alt: 'postImage1 for postID 2' }, { url: '@/assets/postImage2.png', alt: 'postImage2 for postID 2' } ], comments: [] }, 
                    ]
                },
                drawer: ref(false),
                chatButtonVisible: true, 
                userPosts: [], 
            };
        },
        methods:{

        async setupUserProfileAndChatButton() {
        const userProfileInfo = JSON.parse(sessionStorage.getItem("userProfileInfo"));

        if (userProfileInfo) {
            const userProfileId = userProfileInfo.userId;
            const response = axios.get('http://localhost:8080/ComityPost/getUserProfileInfor?userId=' + userProfileId)
            const userProfile = response.data;

            this.user.name = userProfileInfo.userName;
            this.selectedUser_postsPage.totalNumberOfPosts = userProfile.numPosts;
            this.totalNumberOfLikes = userProfile.numLikes;

            if (this.loggedInUser.userId - userProfileId === 0) {
                this.chatButtonVisible = false; // Hide the chat button if the user IDs are the same
            } else {
                this.chatButtonVisible = true;
            }
        }
    },

    async loadUserProfileAndChatButton() {
        await this.setupUserProfileAndChatButton();
    },

    async startMessaging(userFromId, userToId) {
        try {
            const response = await axios.post('http://localhost:8181/ComityChat/createChatChannel', {
                userFromId: userFromId,
                userToId: userToId
            });

            if (response.status === 200) {
                const data = response.data;
                console.log('create chat channel successfully');
                sessionStorage.setItem("chatChannelInfor", JSON.stringify(data));
                this.$router.push('/Chat'); // Use Vue Router to navigate to the "testM2" route
            } else {
                console.error('Failed to create chat channel');
            }
        } catch (error) {
            console.error('Error creating chat channel:', error);
        }
    },

    async loadUserPosts(userId) {
        try {
            const response = await axios.get('http://localhost:8181/ComityPost/getUserPosts', {
                params: {
                userId: userId, // Add the userId as a query parameter
                },
            });
            const userPosts = response.data;

            // Update the userPosts data property
            this.userPosts = userPosts;
        } catch (error) {
            console.error('Error loading user posts:', error);
        }
    },
          
            openDrawer() {
                this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
//============================== START: Unique methods for MyPosts Page ==============================//
            // START: 3 methods for SeeMore buttons
            truncateContent(content) {
                const sentences = content.split(" ");
                const truncated = sentences.slice(0, 22).join(" ");
                return truncated;
            },
            togglePostExpansion(post) {
                console.log('Toggling post expansion', post);
                post.expanded = !post.expanded;
            },
            goToPostDetail() {
                this.$router.push('/PostDtail');
            },
            // END: 3 methods for SeeMore buttons
            // Note for Don: Add a function which adds/remove a like, changes the status of the thumbUp icon.
            toggleLike(){
                // Add or remove a like
                // The thumbUp icon when a user added 'a like' should be 'ThumbLike20Filled'
                // The thumbUp icon when a user removed 'a like' should be 'ThumbLike20Regular'
            },
            goBack(){
                this.$router.go(-1);
            },
        },
//============================== END: Unique Functions for MyPosts Page ==============================//
        components: {
            Icon,
            Pill28Filled, 
            ChevronLeft20Filled,
            ChannelAdd20Regular, 
            Home20Regular, 
            BriefcaseMedical20Regular, 
            Gift20Regular, 
            PeopleCommunity20Filled,
            ThumbLike20Regular,  // Default like button  // When user liked a post
            CommentMultiple20Regular, // comment icon
        },
        computed: {

            ...mapGetters('user', ['loggedInUser']), // Map the loggedInUser getter

            totalNumberOfLikes() {
                return this.selectedUser_postsPage.posts.reduce((total, post) => total + post.numberOfLikes, 0);
            },
            formattedPostTime() {
                return this.selectedUser_postsPage.posts.map((post) => {
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
        }
    };
</script>

<template>
    <div class="container">
        <el-header class="header">
            <Icon class="arrowBack" @click="goBack()"><ChevronLeft20Filled /></Icon>
            <b class="pageTitle">{{ selectedUser_postsPage.name }}'s Posts</b> 
        </el-header>

        <el-main class="main">
            <div class="user_post_overview">
                <div class="left_div">
                    <img :src="selectedUser_postsPage.avatar" alt="avatar" class="large_avatar" />
                </div>
                <div class="right_div">
                    <b class="large_userName">{{ selectedUser_postsPage.name }}</b>
                    <p>{{ selectedUser_postsPage.posts.length }}<span style="color:#949596;"> posts</span></p>
                    <p>{{ totalNumberOfLikes }}<span style="color:#949596;"> likes</span></p>
                </div>
            </div>
            <button class="message_button" @click="startMessaging(selectedUser_postsPage.userID)">Message</button>

            <hr style="width: 100%;">

            <div class="posts_section">
                <div v-for="(post, index) in selectedUser_postsPage.posts" :key="post.postID" class="postCard">
                    <div class="icon_name_time">
                        <!-- NOTE: the code below to display an image is a hardcode and shouldn'r be used. -->
                        <img :src="selectedUser_postsPage.avatar" alt="avatar" class="avatar" />
                        <div class="username">{{ post.username }}</div>
                        <div class="time-ago">{{ formattedPostTime[index] }}</div>
                    </div>
                    <div class="content" @click="goToPostDetail(post.postID)" v-for="post in userPosts" :key="post.postId">
                        <p class="postTitle">{{ post.title }}</p>
                        <p v-if="!post.expanded" class="content">{{ truncateContent(post.content) }}</p>
                        <p v-else class="content">{{ post.content }}</p>
                        <button @click="goToPostDetail(post.postID)" class="seeMoreButton">
                            ... See more
                        </button><br>
                        <div class="image-scroll-container">
                            <span v-for="(image, imageIndex) in post.images" :key="imageIndex">
                                <img src="@/assets/postImage3.png" :alt="image.alt" class="aImage"/> 
                            </span>    
                        </div>
                    </div>
                    <div class="like_comment_section">
                            <Icon class="thumbLike_icon"><ThumbLike20Regular /></Icon>
                            <p class="numberOfLikes">{{ post.numberOfLikes }}</p>
                            <Icon class="comment_icon" @click="showCommentInput(post.postID)"><CommentMultiple20Regular /></Icon>
                            <p class="numberOfComments">{{ post.numberOfComments }}</p>
                            <div v-if="showCommentInputId === post.postID">
                                <input v-model="newComment" placeholder="Enter your comment" />
                                <button @click="addComment(post.postID)">Submit</button>
                            </div>
                        </div>
                    <hr style="width: 100%;">
                </div>
            </div> <!-- End of the posts_section -->
    </el-main>
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
                <span >Community</span>
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
    </div>
</template>

<style src="@/css/myPosts.css" scoped></style>