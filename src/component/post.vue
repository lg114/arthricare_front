<!--   
    Author: Lin Gan
    Student number: 6502933
    Date: 2023/10/20 
-->
<template>
    <div style="padding: 20px;"> 
        <div v-if="activeSection === 'discussion_section'">
            <div v-for="(post, index) in posts" :key="post.postID" class="postCard">
                <div class="icon_name_time">
                    <!-- NOTE: the code below to display an image is a hardcode and shouldn'r be used. -->
                    <img :src="post.avatar" alt="avatar" class="avatar" @click="open_MyPosts(post.userID)" />
                    <!-- NOTE: This code should work, but, for some reason, it's not working. <img :src="post.avatar" :alt="post.alt" />  -->
                    <div class="username" @click="open_MyPosts(post.userID)">{{ post.username }}</div>
                    <div class="time-ago">{{ formattedPostTime[index] }}</div>
                </div>
                <div class="content" @click="goToPostDetail(post.postID)">
                    <p class="postTitle">{{ post.title }}</p>
                    <p v-if="!post.expanded" class="content">{{ truncateContent(post.content) }}</p>
                    <p v-else class="content">{{ post.content }}</p>
                    <button @click="goToPostDetail(post.postID)" class="seeMoreButton">
                        ... See more
                    </button><br>
                    <div class="image-scroll-container">
                        <span v-for="(image, imageIndex) in post.images" :key="imageIndex">
                            <img :src="image.url" :alt="image.alt" class="aImage"/> 
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
        </div> <!-- END: Discussion Section -->
    </div>

</template>

<script>
    import { ref } from 'vue';
    import axios from 'axios';
    import { Icon } from '@vicons/utils';
    import { ThumbLike20Regular, CommentMultiple20Regular} from '@vicons/fluent';
    export default {
        props: ['initialPosts'],
        name: 'DiscussionPost',
        components:{
            Icon,
            ThumbLike20Regular,  // Default like button  // When user liked a post
            CommentMultiple20Regular // comment icon
        },
        mounted() {
            //this.fetchDataFromBackend();
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
                posts: this.initialPosts ? this.initialPosts.map(post => ({...post})) : [
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
                    // {
                    //     postID: 2,
                    //     avatar: require('@/assets/friend_4.png'),
                    //     userID: 'testID_2',
                    //     username: 'Timothy',
                    //     postedDateTime: new Date("2023-09-20T09:30:00+10:00"), // September 20, 2023, 9:30:00 AEST
                    //     title: '“Morning” stiffness worse in the middle of the night?',
                    //     content: "While I am stiff for an hour or two in the morning, the stiffness seems much worse in the middle of the night or if I get up really early. Last night I almost bit it when I got up to go to the washroom because my brain headed in the direction of the bathroom but my hips and knees were locked and didn't want to move. Sometimes I walk like a penguin in the middle of the night (but not the cute ones!) due to feet and ankle stiffness but in the morning it isn't quite so bad. Anyone else find this?",
                    //     expanded: false,
                    //     numberOfLikes: 14,
                    //     numberOfComments: 8,
                    //     images: [
                    //         { url: require('@/assets/postImage5.png'), alt: 'postImage5 for postID 2' }, 
                    //         { url: require('@/assets/postImage6.png'), alt: 'postImage6 for postID 2' },
                    //         { url: require('@/assets/postImage7.png'), alt: 'postImage7 for postID 2' }
                    //     ]
                    // }, 
                    // {
                    //     postID: 3,
                    //     avatar: require('@/assets/friend_3.png'),
                    //     userID: 'testID_3',
                    //     username: 'Tom',
                    //     postedDateTime: new Date("2023-09-19T09:30:00+10:00"), // September 19, 2023, 9:30:00 AEST
                    //     title: 'When to resume mtx',
                    //     content: "I started mtx just over three weeks ago, took the first two weekly doses then got sick with Norovirus. Next dose was due on Saturday but pharmacist recommended not taking it until I'm 'feeling completely better.' Although the diarrhoea stopped by Thursday I still feel a bit washed out, shall I just take the next dose now I'm clear of the virus?",
                    //     expanded: false,
                    //     numberOfLikes: 3,
                    //     numberOfComments: 2,
                    //     images: [
                    //         { url: require('@/assets/postImage8.png'), alt: 'postImage6 for postID 3' },
                    //         { url: require('@/assets/postImage6.png'), alt: 'postImage7 for postID 3' }
                    //     ]
                    // },
                    // {
                    //     postID: 4,
                    //     avatar: require('@/assets/friend_5.png'),
                    //     userID: 'testID_4',
                    //     username: 'Anthony',
                    //     postedDateTime: new Date("2023-09-06T09:30:00+10:00"), // September 6, 2023, 9:30:00 AEST
                    //     title: 'This is a title for the General post',
                    //     content: "ghju fgufj fgrfd dfgv ed fgf f f gea.",
                    //     expanded: false,
                    //     numberOfLikes: 8,
                    //     numberOfComments: 6,
                    //     images: [
                    //         { url: require('@/assets/postImage1.png'), alt: 'postImage1 for postID 4' }
                    //     ]
                    // },
                    // {
                    //     postID: 5,
                    //     avatar: require('@/assets/friend_5.png'),
                    //     userID: 'testID_5',
                    //     username: 'Anthony',
                    //     postedDateTime: new Date("2023-08-24T09:30:00+10:00"), // August 24, 2023, 9:30:00 AEST
                    //     title: 'This is a title for the News post',
                    //     content: "The shortest content.",
                    //     expanded: false,
                    //     numberOfLikes: 8,
                    //     numberOfComments: 0,
                    //     images: []
                    // }
                    // Add more posts here
                ],
                formattedPostTime: [],
                showCommentInputId: null,
                newComment: "",
            };
        },
        methods:{
            changeSection(sectionName) {
                this.activeSection = sectionName;
            },
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
            },
            // END: Filter the posts by a section

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
        },
    }
</script>
<style src="@/css/community.css" scoped></style>
