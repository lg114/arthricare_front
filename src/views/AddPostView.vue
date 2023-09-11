<!-- Add Post Page -->
<script setup>
    import { ref } from 'vue';
    import { ImageRound } from '@vicons/material';
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
                <textarea v-model="postContent" class="post_content" name="post_content" placeholder="What's on your mind?" rows="10" cols="50" maxlength="500" autofocus required></textarea><br>

                <!-- Display selected images -->
                <div class="selected-images">
                    <img v-for="(image, index) in images" :src="image" :key="index" class="selected-image" />
                </div>

                <Icon class="image_icon" @click="$refs.imageInput.click()"><ImageRound />
                    <input
                        type="file"
                        accept="image/*"
                        ref="imageInput"
                        style="display: none"
                        @change="handleImageSelection"
                    />
                </Icon>
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
            const images = ref([]);
            const addImage = () => {
                if (images.value.length < 5) {
                    /* images.value.push(URL.createObjectURL(imageFile)); */
                    images.value.push('@/assets/user_avatar.png');
                }
            };
            return {
                avatar1,
                images,
                addImage
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
                    title: "",
                    content: "",
                    time: "",
                    images: [this.images]
                },
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
            handleImageSelection(event) {
                const selectedFiles = event.target.files;
                for (let i = 0; i < 5; i++) {
                    const selectedFile = selectedFiles[i];
                    // Check if the selected file is an image
                    if (selectedFile.type.startsWith('image/')) {
                        this.addImage(selectedFile);
                    }
                }
                // Clear the input value to allow selecting the same file again
                this.$refs.imageInput.value = '';
            },
            clicked_postButton(){
                // It requires back-end
            }
        },
        components: {
            Icon,
            ImageRound
        }
    };
</script>

<style src = "@/css/addPost.css" scoped></style>