<!-- Chat Page -->
<!-- NOTE: Run the page on a smartphone, and check if a keyboard comes up on the screen when a user clicks the input fields. -->
<script>
    import { ref } from 'vue';
    import { ChevronLeft20Filled, Camera20Filled, Image20Filled, Mic20Filled, ArrowCircleUp20Filled } from '@vicons/fluent';
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
                reply:"replygyujhj gtyuhnj bvhujhnmd",
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
                messageInput: '', // Add this property to hold the message input value
                chatHistory: [], // Add this property to store chat history
                drawer: ref(false),
            };
        },
        methods:{
            formatDateAndTime(timestamp) {
        const options = {
            day: '2-digit', // Display day in two digits (01, 02, etc.)
            month: '2-digit', // Display month in two digits (01, 02, etc.)
            year: 'numeric', // Display year in full format (2023)
            hour: '2-digit', // Display hour in two digits (00, 01, etc.)
            minute: '2-digit', // Display minute in two digits (00, 01, etc.)
            hour12: false // Use 24-hour format
            };

                const [datePart, timePart] = new Date(timestamp).toLocaleString('en-US', options).split(', ');
                const [month, day, year] = datePart.split('/');
                const formattedDate = `${day}/${month}/${year}`;

                return `${formattedDate} ${timePart}`;
            },

            openDrawer() {  
                this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
            // New method to send a message and update chat history
            sendMessage(){

                console.log('sendMessage method called');
                if (this.messageInput.trim() === '')
                {return;}

                // demonstration
                const newMessage = {
                    sender: 'me', // You can set the sender
                    content: this.messageInput,
                    timestamp: new Date().toISOString(),
                };
                console.log('New message:', newMessage);
                // Push the new message to the chat history
                    this.chatHistory.push(newMessage);
                    console.log('Chat history:', this.chatHistory);


                // Clear the message input
                this.messageInput = '';

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
            ChevronLeft20Filled,
            Camera20Filled,
            Image20Filled,
            Mic20Filled,
            ArrowCircleUp20Filled
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="arrowBack" @click="goBack_messagePage()"><ChevronLeft20Filled /></Icon>
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
                        <!-- Display existing messages from chat history using v-for -->
                        <div v-for="message in chatHistory" :key="message.timestamp">
                            <p class="messageDate">{{ formatDateAndTime(message.timestamp) }}</p>
                            <p v-if="message.sender === 'me'" class="text_from_me">{{ message.content }}</p>
                            <div v-else class="reply_from_chatPartner">
                                <img :src="avatar5" alt="avatar" class="miniIcon_chatPartner" />
                                <p class="text_from_partner">{{ message.content }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- NOTE: -->
                    <p style="margin: 50px; margin-top: 100px; text-align: center; color: red;"> 
            
                        Change text's background as relative to the length of the word
                        NOTE: Run the page on smartphone and see if a keyboard comes up when a user. 
                        The backend for this page is ready, but it hasn't been marged yet.

                    </p>
                </div>

                <div class="chat_footer">
                    <div class="chat_footer_icons">
                        <Icon class="camera_icon"><Camera20Filled /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                        <Icon class="image_icon"><Image20Filled /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                        <Icon class="microphone_icon"><Mic20Filled /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                    </div>
                    <div class="message_input_textField">
                        <div class="enterMessageHere">
                            <input type="text" placeholder="Message..." v-model="messageInput" @keyup.enter="sendMessage" />
                        </div>
                        <div class="arrow_to_send_a_message" @click="sendMessage">
                            <!-- NOTE: How can I place the arrowUp icon inside the texFiled above? -->
                            <Icon><ArrowCircleUp20Filled /></Icon>
                        </div>
                    </div>
                </div>
            </el-main> 
        </el-container>
    </div>
</template>

<style src = "@/css/chat.css" scoped></style>