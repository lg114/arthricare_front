<!-- Chat Page -->
<!-- NOTE: Run the page on a smartphone, and check if a keyboard comes up on the screen when a user clicks the input fields. -->
<script>
    import { ref } from 'vue';
    import { ArrowBackFilled, CameraAltFilled, ImageRound, MicRound, ArrowCircleUpTwotone } from '@vicons/material';
    import { Icon } from '@vicons/utils'
    export default{
        mounted() {
            document.title = "Chat | ArthriCare";
        },
        setup(){
            const avatar1 = ref()
            const avatar2 = ref()
            const avatar3 = ref()
            const avatar4 = ref()
            const avatar5 = ref()
            avatar1.value = require('@/assets/user_avatar.png')
            avatar2.value = require('@/assets/friend_1.png')
            avatar3.value = require('@/assets/friend_2.png')
            avatar4.value = require('@/assets/friend_3.png')
            avatar5.value = require('@/assets/friend_4.png')
            return {
                avatar1,
                avatar2,
                avatar3,
                avatar4,
                avatar5
            }
        },
        data(){
            return{
                user:{
                    name: 'Username',
                    level: '10',
                    points: '1000'
                },
                chatPartners:[
                    {
                        icon: '@/assets/friend_4.png', // avatar5
                        name: 'Timothy',
                        latestMassege: 'Hey Kris, have you tried this exe...',
                        newMessage: true
                    },
                    {
                        icon: '@/assets/friend_2.png', // avatar3
                        name: 'Adam',
                        latestMassege: 'Hi Kris, blah blah blah.',
                        newMessage: false
                    }
                ],
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
            shortenMessage(latestMassege){
                // Shorten the whole message
                const sentences = latestMassege.split(" ");
                const truncated = sentences.slice(0, 14).join(" ");
                // Return the Shortenede message
                return truncated;
            },
            goBack_messagePage(){
                this.$router.push('/Message');
            }
        },
        components: {
            Icon,
            ArrowBackFilled,
            CameraAltFilled,
            ImageRound,
            MicRound,
            ArrowCircleUpTwotone
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                    <Icon class="arrowBack" @click="goBack_messagePage()"><ArrowBackFilled /></Icon>
                    <img :src="avatar5" alt="avatar" class="header_avatar" />
                    <b class="header_chatPartnerName">Timothy</b> <!-- NOTE: I guess'Timothy' should come from the session info? -->
            </el-header>
            <el-main class="main">
                <div id="chat_background">
                    <div id="messageTop">
                        <img :src="avatar5" alt="avatar" id="messageTop_avatar" />
                        <b id="messageTop_partnerName">Timothy</b> <!-- NOTE: I guess'Timothy' should come from the session info? -->
                    </div>
                    
                    <!-- NOTE: This section needs to be updated by using for-loop to display the chat history in DB -->
                    <div id="messageMain">
                        <p class="messageDate">JUL 13 AT 4:53 AM</p>
                        <p class="text_from_me">Hi Timothy, this is Kris. Blah blah blah blah blah blah.</p>
                        
                        <div class="reply_from_chatPartner">
                            <img :src="avatar5" alt="avatar" class="miniIcon_chatPartner" />
                            <p class="text_from_partner">Hey Kris, have you tried this exercise?</p>
                        </div>
                    </div>

                    <!-- NOTE: -->
                    <p style="margin: 50px; margin-top: 100px; text-align: center; color: red;"> 
                        NOTE: The layout of the footer needs to be improved. Run the page on smartphone and see if a keyboard comes up when a user Add a funciton to enable a user to sent a new message. The backend for this page is ready, but it hasn't been marged yet.
                    </p>
                </div>

                <div class="chat_footer">
                    <div class="chat_footer_icons">
                        <Icon class="camera_icon"><CameraAltFilled /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                        <Icon class="image_icon"><ImageRound /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                        <Icon class="microphone_icon"><MicRound /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                    </div>
                    <div class="message_input_textField">
                        <div class="enterMessageHere">
                            <input type="text" placeholder="Message..." />
                        </div>
                        <div class="arrow_to_send_a_message">
                            <!-- NOTE: How can I place the arrowUp icon inside the texFiled above? -->
                            <Icon><ArrowCircleUpTwotone /></Icon>
                        </div>
                    </div>
                </div>




            </el-main> 
        </el-container>
    </div>
</template>

<style src = "@/css/chat.css" scoped></style>