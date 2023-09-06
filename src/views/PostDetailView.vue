<!--User Profile Page -->
<script>
    import { ref } from 'vue';
    import { ArrowBackFilled } from '@vicons/material';
    import { ThumbLike20Regular, ThumbLike20Filled, CommentMultiple20Regular } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    export default{
        mounted() {
            document.title = "Post Detail | ArthriCare";
        },
        setup(){
            const avatar1 = ref()
            const avatar2 = ref()
            const avatar3 = ref()
            avatar1.value = require('@/assets/user_avatar.png')
            avatar2.value = require('@/assets/friend_4.png')
            avatar3.value = require('@/assets/friend_5.png')
            return {
                avatar1,
                avatar2,
                avatar3
            }
        },
        data(){
            return{
                user:{
                    name: 'Username',
                    level: '10',
                    points: '1000'
                },
                drawer: ref(false),
                selectedPost:{
                    /* NOTE: The info below which is about the selected post to see more its detail is just an example and hardcoded.
                        In order to make it feasible, get the info by connecting with back-end.  */
                    postID: 1,
                    avatar: '@/assets/user_avatar.png',
                    username: 'Adam',
                    timestamp: new Date(),
                    title: '21M diagnosed with Rheumatoid Arthritis',
                    content: "I'm a 21M who was recently diagnosed with Rheumatoid Arthritis by a GP. It was first assumed I had some form of vasculitis, but I failed to ask what exactly my blood test results had shown that had her determine RA. It's a long wait for a specialist, if I can get one, and I can't find much on this disease in people my age. It is also to my understanding that blood test don't always point to a definitive diagnosis. I've had problem beginning as early as 12 and they never went away. I finally ignored my fear of being regarded as another \"self diagnosing patient\"; by taking the years of documented evidence and my research that never stopped pointing to some form of arthritis, it was so relieving to hear I wasn't crazy after all, although it's almost created more questions like the likelihood of misdiagnosis. Unfortunately, my current answers anytime soon. Is anyone familiar with rheumatoid vasculitis of similar autoimmune disorder within my age group?",
                    numberOfLikes: 17,
                    isLiked: false,
                    numberOfComments: '8',
                    images: [
                        { url: '@/assets/postImage1.png', alt: 'postImage1 for postID 1' },
                        { url: '@/assets/postImage2.png', alt: 'postImage2 for postID 1' }, 
                        { url: '@/assets/postImage3.png', alt: 'postImage3 for postID 1' },
                        { url: '@/assets/postImage4.png', alt: 'postImage4 for postID 1' }
                    ],
                    comments: [
                        { commentID: '111', commenterAvatar: this.avatar2, alt: 'commenterAvatar4', commenterUserName: 'Timothy', comment: 'This is the first comment from Timothy!', commentTimestamp: new Date() },
                        { commentID: '112', commenterAvatar: this.avatar3, alt: 'commenterAvatar5', commenterUserName: 'Kai', comment: 'This is the first comment from Kai!', commentTimestamp: new Date() },
                        { commentID: '113', commenterAvatar: '@/assets/friend_4.png', alt: 'commenterAvatar4', commenterUserName: 'Timothy', comment: 'This is the second comment from Timothy!', commentTimestamp: new Date() },
                        { commentID: '114', commenterAvatar: '@/assets/friend_5.png', alt: 'commenterAvatar5', commenterUserName: 'Kai', comment: 'This is the second comment from Kai!', commentTimestamp: new Date() }
                    ]
                }
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
            goBackTo_communityPage(){
                this.$router.push('/Community');
            },
            // START: Unique methods for Post Detail Page
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
            // Note for Don: Add a function to change the thumbUp icon evry time when a user clicks it
            toggleLike() {
                if (this.selectedPost.isLiked) {
                    // User unlikes the post
                    this.selectedPost.numberOfLikes -= 1;
                } else {
                    // User likes the post
                    this.selectedPost.numberOfLikes += 1;
                }
                this.selectedPost.isLiked = !this.selectedPost.isLiked;
            }
            // END: Unique methods for Post Detail Page
        },
        components: {
            Icon,
            ArrowBackFilled,
            ThumbLike20Regular, 
            ThumbLike20Filled,
            CommentMultiple20Regular
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="arrowBack" @click="goBackTo_communityPage"><ArrowBackFilled /></Icon>
                <b class="pageTitle">Post Detail</b>
            </el-header>
            <el-main class="main">
               <!-- NOTE: How can I get the details of a specific post which has been selected on the Community Page? -->
               <!-- Step 1: Create a placeholder to display the selected post with a title, text and images.  -->
               <!-- Step 2: Create a placeholder to display all the comments. -->
               <!-- Step 3: Add an input to add a new comment (comments can hold text and images) -->

                    <div class="postDetail_section">
                        <div class="icon_name_time">
                            <!-- NOTE: The code below to display an image is a hardcode. It needs to be improved. P.S. Flyger's been workikng on figuring out. -->
                            <img :src="avatar1" alt="avatar" class="avatar" />
                            <!-- NOTE: This code should work, but, for some reason, it's not working. <img :src="post.avatar" :alt="post.alt" />  -->
                            <div class="username">{{ selectedPost.username }}</div>
                            <div class="time-ago">{{ getTimeAgo(selectedPost.timestamp) }}</div>
                        </div>

                        <div class="content">
                            <p class="postTitle">{{ selectedPost.title }}</p>
                            <p class="content">{{ selectedPost.content }}</p>
                            <div id="image-scroll-container">
                                <span v-for="(image, imageIndex) in selectedPost.images" :key="imageIndex">
                                    <img src="@/assets/postImage3.png" :alt="image.alt" class="aImage"/> 
                                </span> 
                            </div>
                            <div class="like_comment_section">
                                <span v-if="!isLinked" @click="toggleLike">
                                    <Icon class="thumbLike_icon"><ThumbLike20Regular /></Icon>
                                </span>
                                <span v-else @click="toggleLike">
                                    <Icon class="thumbLike_icon"><ThumbLike20Filled /></Icon>
                                </span>
                                <p class="numberOfLikes">{{ selectedPost.numberOfLikes }}</p>
                                <Icon class="comment_icon"><CommentMultiple20Regular /></Icon>
                                <p class="numberOfComments">{{ selectedPost.numberOfComments }}</p>
                            </div>
                        </div>    

                        <div v-for="comment in selectedPost.comments" :key="comment.commentID" class="all_the _comments_section">
                            <hr style="width: 100%">
                            <div class="icon_name_time">
                                <img :src="avatar2" alt="avatar" class="avatar" />
                                <div class="username">{{ comment.commenterUserName }}</div>
                                <div class="content">{{ comment.comment }}</div>
                            </div>
                        </div>
                        <hr style="width: 100%">
                    </div>
            </el-main> 
        </el-container>
    </div>
</template>



<style src = "@/css/postDetail.css" scoped></style>