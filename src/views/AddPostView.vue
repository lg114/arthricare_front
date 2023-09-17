<!-- Add Post Page -->
<script setup>
    import { ref } from 'vue';
    import { ImageRound, CancelFilled } from '@vicons/material';
    import { Icon } from '@vicons/utils'
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <input type="submit" value="Post" class="postButton" @click="clicked_postButton"> 
            </el-header>
            <el-main class="main">

                <div class="user_icon_name">
                    <!-- NOTE: After Flyger figures out how to display the avatar images by using Vue-dataset, the hard-code below will be updated in the future. -->
                    <img :src="avatar1" alt="user_icon" class="user_icon" />
                    <p class="userName">{{ user.name }}</p>
                </div>

                <input type="text" v-model="postTitle" name="post_title" class="post_title" placeholder="Set a title here..."><br>
                <textarea v-model="postContent" class="post_content" name="post_content" placeholder="What's on your mind?" rows="17" cols="50" maxlength="500" autofocus required></textarea><br>


                <div class="scrollable-container"> 
                    <input type="file" @change="handleImageUpload" accept="image/*" ref="fileInput" style="display: none" multiple />
                    
                    <!-- Display selected images -->
                    <div v-for="(image, index) in selectedImages" :key="index" class="image-container">
                        <img :src="image.url" alt="Selected Image" />
                        <Icon class="cancel_icon" @click="removeImage(index)"><CancelFilled /></Icon>
                    </div>
                </div>
                <!-- Add button to trigger file input -->
                <Icon class="image_icon" @click="openFileInput" :disabled="selectedImages.length >= 4"><ImageRound /></Icon>

            </el-main> 
        </el-container>
    </div>
</template>


<script>
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
        methods:{
            openDrawer() {
            this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
            clicked_postButton(){
                // It requires back-end
            },




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
            ImageRound,
            CancelFilled
        }
    };
</script>

<style src = "@/css/addPost.css" scoped></style>


