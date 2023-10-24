<!-- Add Post Page -->
<script>
import { ref } from 'vue';
import { Image20Filled } from '@vicons/fluent';
import { Icon } from '@vicons/utils'
import axios from 'axios';
import { mapGetters } from 'vuex';

    export default{
        mounted() {
            document.title = "Add Post | ArthriCare";
        },
        setup(){
            const avatar1 = ref(require('@/assets/user_avatar.png'));
            return {
                avatar1
            }
        },
        data(){
            return{
                user:{
                    name: 'Kris Wu',
                    level: '10',
                    points: '1000'
                },
                newPost:{
                    postID: "",
                    userID: "",
                    postTitle: "",
                    postContent: "",
                    time: new Date(),
                    images: [this.images]
                },
                drawer: ref(false),

                selectedImages: [],
            };
        },
        
        computed: {
            // Use the loggedInUser computed property from Vuex
            ...mapGetters('user', ['loggedInUser'])
        },


        methods:{
            openDrawer() {
            this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            }, 
            async clicked_postButton() {

                await this.createPost();

            },
            clicked_cancelButton() {
                this.$router.push('/Community');
            },

///
            async createPost() {
                try {
                const userId = this.loggedInUser.userId;
                // const userId = loggedInUser.userId;
                const currentTime = new Date();
                const postData = {
                    userId: userId,
                    title: this.newPost.postTitle,
                    content: this.newPost.postContent,
                    createdTime: currentTime,
                    forumSection: 'symptoms', 
                    haveImage: this.selectedImages.length > 0,
                };

                console.log(postData);
                console.log(userId);
                console.log(this.newPost.postTitle);
                console.log(this.newPost.postContent);

                const response = await axios.post('http://localhost:8181/ComityPost/createPost', postData);

                if (response.status === 200) {
                    const postId = await response.data;
                    if (this.selectedImages.length > 0) {
                    await this.uploadImages(postId);
                    }
                    this.$router.push('/Community');
                } else {
                    alert('Failed to create post.');
                }
                } catch (error) {
                console.error('Error creating post:', error);
                }
            },
////
////
            async uploadImages(postId) {
                try {
                    for (const image of this.selectedImages) {
                        const formData = new FormData();
                        formData.append('postId', postId);
                        formData.append('image', image.file);
                        console.log(postId);
                        console.log(image.file);
                        const response = await axios.post('http://localhost:8181/uploadImage/postImage', formData);

                        if (response.data.success) {
                            console.log(`Image with name ${image.fileName || image.name} uploaded successfully.`);
                        } else {
                            console.log(`Image with name ${image.fileName || image.name} failed to upload.`);
                        }
                    }
                } catch (error) {
                    console.error('Error uploading images:', error);
                }
            },
////

            openFileInput() {
                this.$refs.fileInput.click();
            },
            handleImageUpload(event) {
                /*  It checks if the number of selected images is less than 4. 
                    If it is, the selected image is read as a data URL and added to the selectedImages array.  */
                const files = event.target.files;
                if (files) {
                    for (let i = 0; i < files.length; i++) {
                    if (this.selectedImages.length < 4) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                        this.selectedImages.push({ url: e.target.result, file: files[i] });
                        };
                        reader.readAsDataURL(files[i]);
                    } else {
                        // Error handling
                        console.log("You can only upload up to 4 images.");
                    }
                    }
                }
            },
            removeImage(index) {
                this.selectedImages.splice(index, 1);
            },
        },
        components: {
            Icon,
            Image20Filled
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <input type="submit" value="Cancel" class="cancelButton" @click="clicked_cancelButton"> 
                <input type="submit" value="Post" class="postButton" @click="clicked_postButton"> 
            </el-header>
            <el-main class="main">

                <div class="user_icon_name">
                    <!-- NOTE: After Flyger figures out how to display the avatar images by using Vue-dataset, the hard-code below will be updated in the future. -->
                    <img :src="avatar1" alt="user_icon" class="user_icon" />
                    <p class="userName">{{ user.name }}</p>
                </div>

                <input type="text" v-model="newPost.postTitle" name="post_title" class="post_title" placeholder="Set a title here..."><br>
                <textarea v-model="newPost.postContent" class="post_content" name="post_content" placeholder="What's on your mind?" rows="17" cols="50" maxlength="500" autofocus required></textarea><br>



                <div class="scrollable-container"> 
                    <input type="file" @change="handleImageUpload" accept="image/*" ref="fileInput" style="display: none" multiple />
                    
                    <!-- Display selected images -->
                    <div v-for="(image, index) in selectedImages" :key="index" class="image-container">
                        <img :src="image.url" alt="Selected Image" />
                    </div>
                </div>
                <!-- Add button to trigger file input -->
                <Icon class="image_icon" @click="openFileInput" :disabled="selectedImages.length >= 4"><Image20Filled /></Icon>

            </el-main> 
        </el-container>
    </div>
</template>

<style src = "@/css/addPost.css" scoped></style>