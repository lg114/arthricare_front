<!-- Post Detail Page -->
<script>
    import { ref } from 'vue';
    import { ChevronLeft20Filled, ThumbLike20Regular, ThumbLike20Filled, CommentMultiple20Regular, Image20Filled, ArrowCircleUp20Filled } from '@vicons/fluent';
    import { Icon } from '@vicons/utils';

    export default{
        mounted() {
            document.title = "Post Detail | ArthriCare";
        },
        setup(){
            const avatar1 = ref(require('@/assets/user_avatar.png')) // Kris
            const avatar2 = ref(require('@/assets/friend_2.png')) // Adam
            const avatar4 = ref(require('@/assets/friend_3.png')) // Tom
            const avatar5 = ref(require('@/assets/friend_4.png')) // Thimoty
            return {
                avatar1,
                avatar2,
                avatar4,
                avatar5
            }
        },
        data(){
            return{
                user:{
                    name: 'Kris Wu',
                    level: '10',
                    points: '1000'
                },
                drawer: ref(false),
                // Note for Don: the selectedPost data should be retrived from store index.js
                selectedPost:{
                    postID: 1,
                    avatar: this.avatar2,
                    userID: 'testID_1',
                    username: 'Adam',
                    postedDateTime: new Date("2023-09-20T15:25:00+10:00"), // September 20, 2023, 15:20:00 AEST
                    title: '21M diagnosed with Rheumatoid Arthritis',
                    content: "I'm a 21M who was recently diagnosed with Rheumatoid Arthritis by a GP. It was first assumed I had some form of vasculitis, but I failed to ask what exactly my blood test results had shown that had her determine RA. It's a long wait for a specialist, if I can get one, and I can't find much on this disease in people my age. It is also to my understanding that blood test don't always point to a definitive diagnosis. I've had problem beginning as early as 12 and they never went away. I finally ignored my fear of being regarded as another \"self diagnosing patient\"; by taking the years of documented evidence and my research that never stopped pointing to some form of arthritis, it was so relieving to hear I wasn't crazy after all, although it's almost created more questions like the likelihood of misdiagnosis. Unfortunately, my current answers anytime soon. Is anyone familiar with rheumatoid vasculitis of similar autoimmune disorder within my age group?",
                    expanded: false,
                    numberOfLikes: 17,
                    images: [
                        { url: '@/assets/postImage1.png', alt: 'postImage1 for postID 1' },
                        { url: '@/assets/postImage2.png', alt: 'postImage2 for postID 1' }, 
                        { url: '@/assets/postImage3.png', alt: 'postImage3 for postID 1' },
                        { url: '@/assets/postImage4.png', alt: 'postImage4 for postID 1' }
                    ],
                    comments: [
                        { comentedUserID: 'testID_3', commentedUser: 'Tom', commentedUserAvater: this.avatar4, commentContent: 'Nice!' },
                        { comentedUserID: 'testID_2', commentedUser: 'Thimothy', commentedUserAvater: this.avatar5, commentContent: 'Great!' },
                    ]
                },
                commentInput: '', // Add this property to hold the comment input value
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
            goBack(){
                this.$router.go(-1);
            },
            // START: Unique methods for Post Detail Page
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
            },
            sendComment(){
                // Add code here. The code should be simmilar to sendMessage() in ChatView.vue?
            },
            open_MyPosts(userID){
                this.$router.push({ name: 'MyPosts', params: { id: userID } });
            },
            displayCommentField(){
                var commentField = document.getElementById("postDetail_footer");
                commentField.style.display = "block";
            }
        },
        components: {
            Icon,
            ChevronLeft20Filled,
            ThumbLike20Regular, 
            ThumbLike20Filled,
            CommentMultiple20Regular,
            Image20Filled,
            ArrowCircleUp20Filled
        },
        computed: {
            totalNumberOfComments() {
                return this.selectedPost.comments.length;
            },
            formattedPostTime() {
                const postDate = new Date(this.selectedPost.postedDateTime);
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
            },
    },
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="arrowBack" @click="goBack()"><ChevronLeft20Filled /></Icon>
                <b class="pageTitle">Post Detail</b>
            </el-header>
        <el-main class="main">
                <div class="postDetail_section">
                    <div class="icon_name_time">
                        <!-- NOTE: The code below to display an image is a hardcode. It needs to be improved. P.S. Flyger's been workikng on figuring out. -->
                        <img :src="selectedPost.avatar" alt="avatar" class="avatar" @click="open_MyPosts(selectedPost.userID)" />
                        <div class="username">{{ selectedPost ? selectedPost.username : '' }}</div>
                        <div class="time-ago">{{ selectedPost ? formattedPostTime : '' }}</div>
                    </div>

                    <div class="content">
                        <p class="postTitle">{{ selectedPost ? selectedPost.title : '' }}</p>
                        <p class="content">{{ selectedPost ? selectedPost.content : '' }}</p>
                        <div id="image-scroll-container">
                            <!-- <span v-for="(image, imageIndex) in post.images" :key="imageIndex"> -->
                                <img src="@/assets/postImage3.png" alt="" class="aImage"/> 
                            <!-- </span> -->
                        </div>
                        <div class="like_comment_section">
                            <span v-if="!isLinked" @click="toggleLike">
                                <Icon class="thumbLike_icon"><ThumbLike20Regular /></Icon>
                            </span>
                            <span v-else @click="toggleLike">
                                <Icon class="thumbLike_icon"><ThumbLike20Filled /></Icon>
                            </span>
                            <p class="numberOfLikes">{{ selectedPost ? selectedPost.numberOfLikes : '' }}</p>
                            <Icon class="comment_icon" @click="displayCommentField"><CommentMultiple20Regular /></Icon>
                            <p class="numberOfComments">{{ totalNumberOfComments }}</p>
                            <div v-if="showCommentInputForm">
                                <input v-model="newComment" placeholder="Enter your comment" />
                                <button @click="addComment">Submit</button>
                            </div>
                        </div>
                    </div>    

                    <div v-for="comment in selectedPost.comments" :key="comment.commentID" class="all_the _comments_section">
                        <hr style="width: 100%">
                        <div class="icon_name_time">
                            <img :src="comment.commentedUserAvater" alt="avatar" class="commentedUserAvatar" />
                            <div class="username">{{ comment.commentedUser }}</div>
                            <div class="commentContent">{{ comment.commentContent }}</div>
                        </div>
                    </div>
                    <hr style="width: 100%">
                </div>

                <div id="postDetail_footer" style="display: none;">
                    <div>
                        <Icon class="image_icon"><Image20Filled /></Icon>
                    </div>
                    <div>
                        <div class="enterCommentHere">
                            <input type="text" placeholder="Comment here..." v-model="messageInput" @keyup.enter="sendComment" />
                        </div>
                        <div class="arrow_to_send_a_comment" @click="sendComment">
                            <!-- NOTE: How can I place the arrowUp icon inside the texFiled above? -->
                            <Icon><ArrowCircleUp20Filled /></Icon>
                        </div>
                    </div>
                </div>
            </el-main> 
        </el-container>
    </div>
</template>

<style src = "@/css/postDetail.css" scoped></style>