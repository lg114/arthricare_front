<!-- Add Post Page -->
<script>
    import { ref } from 'vue';
    import { CameraAltFilled, ImageRound } from '@vicons/material';
    import { Icon } from '@vicons/utils'
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
            //Router
            goToUserProfile(){
                this.$router.push('/UserProfile');
            },
            async activateCamera() {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.play();

                    // Wait for the video to start playing
                    await new Promise((resolve) => video.onplay = resolve);

                    // Capture a snapshot from the video stream
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                        const imageFile = new File([blob], 'camera_snapshot.jpg', { type: 'image/jpeg' });
                        this.addImage(imageFile);
                        stream.getTracks().forEach(track => track.stop());
                    }, 'image/jpeg', 0.9);
                } catch (error) {
                    console.error('Error accessing camera:', error);
                }
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
            }
        },
        components: {
            Icon,
            CameraAltFilled, 
            ImageRound
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <b id="postButton">Post</b>
                <!-- <input type="submit" value="Submit"> -->
            </el-header>
            <el-main class="main">

                <div class="user_icon_name">
                    <!-- NOTE: After Flyger figures out how to display the avatar images by using Vue-dataset, the hard-code below will be updated in the future. -->
                    <img :src="avatar1" alt="user_icon" class="user_icon" />
                    <p class="userName">{{ user.name }}</p>
                </div>

                <input type="text" id="post_title" name="post_title" class="title_input" placeholder="Set a title here..."><br>
                <textarea id="post_context" name="post_context" placeholder="What's on your mind?" rows="10" cols="50" maxlength="500" autofocus required></textarea><br>

                <!-- Display selected images -->
                <div class="selected-images">
                    <img v-for="(image, index) in images" :src="image" :key="index" class="selected-image" />
                </div>

                <!-- NOTE: Should I wrap the icons below by <div></div> ? -->
                <Icon class="camera_icon" @click="activateCamera"><CameraAltFilled /></Icon>
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



<style src = "@/css/addPost.css" scoped></style>