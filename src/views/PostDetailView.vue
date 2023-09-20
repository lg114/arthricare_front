<!-- Post Detail Page -->
<script>
    import { ref } from 'vue';
    import { ChevronLeft20Filled, ThumbLike20Regular, ThumbLike20Filled, CommentMultiple20Regular } from '@vicons/fluent';
    import { Icon } from '@vicons/utils';

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
                    name: 'Kris Wu',
                    level: '10',
                    points: '1000'
                },
                drawer: ref(false),
                // Note for Don: the selectedPost data should be retrived from store index.js
                selectedPost:{
                    id: null,
                    avatar: '',
                    username: '',
                    postedDateTime: '',
                    timestamp: new Date(),
                    title: '',
                    content: "",
                    expanded: false,
                    numberOfLikes: null,
                    numberOfComments: null,
                    images: [],
                    comments: []
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
            },
        },
        components: {
            Icon,
            ChevronLeft20Filled,
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
                <Icon class="arrowBack" @click="goBackTo_communityPage"><ChevronLeft20Filled /></Icon>
                <b class="pageTitle">Post Detail</b>
            </el-header>
        <el-main class="main">
                <div class="postDetail_section">
                    <div class="icon_name_time">
                        <!-- NOTE: The code below to display an image is a hardcode. It needs to be improved. P.S. Flyger's been workikng on figuring out. -->
                        <img src="avatar1" alt="avatar" class="avatar" />
                        <div class="username">{{ selectedPost ? selectedPost.username : '' }}</div>
                        <div class="time-ago">{{ selectedPost ? getTimeAgo(selectedPost.timestamp) : '' }}</div>
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
                            <Icon class="comment_icon" @click="showCommentInput"><CommentMultiple20Regular /></Icon>
                            <p class="numberOfComments">{{ selectedPost ? selectedPost.numberOfComments : '' }}</p>
                            <div v-if="showCommentInputForm">
                                <input v-model="newComment" placeholder="Enter your comment" />
                                <button @click="addComment">Submit</button>
                            </div>
                        </div>
                    </div>    

                    <div v-for="comment in selectedPost.comments" :key="comment.commentID" class="all_the _comments_section">
                        <hr style="width: 100%">
                        <div class="icon_name_time">
                            <img src="avatar2" alt="avatar" class="avatar" />
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