<!-- Chat Page -->
<!-- NOTE: Run the page on a smartphone, and check if a keyboard comes up on the screen when a user clicks the input fields. -->
<script>
    import { ref } from 'vue';
    import { ArrowBackFilled, CameraAltFilled, ImageRound, MicRound, ArrowCircleUpTwotone } from '@vicons/material';
    import { Icon } from '@vicons/utils'
    import axios from 'axios';
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs'; 
    import { mapGetters } from 'vuex';   
    //import VueNativeSock from 'vue-native-websocket';
   // import SockJS from 'sockjs-client';
   // import { Stomp } from '@stomp/stompjs';
   // import { Client } from '@stomp/stompjs';

    export default{
        mounted() {
            document.title = "Chat | ArthriCare"
            // Connect to WebSocket when the component is mounted
            this.initChatChannelInfor();
            this.initWebSocket();
            this.fetchChatHistory();
        },

        computed: {
         ...mapGetters('user', ['loggedInUser']), // Map the loggedInUser getter
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
                socket: null,
                stompClient: null,
                chatChannelInfor: null,
                myMessageId: null,
                messageInput: '', // Add this property to hold the message input value
                chatHistory: [], // Add this property to store chat history
                drawer: ref(false),
                chatPartnerName: '', // Initialize with the chat partner's name
                chatMessages: [], // Array to store chat messages
                
            };
        },
        /*
        beforeUnmount() {
            this.stompClient.send("/app/leave", {}, this.chatChannelInfor.userFromId);
            console.log("person leave");
        },*/
        methods:{
            initChatChannelInfor()
            {
                this.chatChannelInfor = JSON.parse(sessionStorage.getItem('chatChannelInfor'));
                if (!this.chatChannelInfor) {
                    console.error('Chat channel information not found in session storage');
                    return;
                }
                this.showUserName();
            },

            initWebSocket() {
                this.socket = new SockJS('http://localhost:8181/ws');
                this.stompClient = Stomp.over(this.socket);

                console.log(this.chatChannelInfor);
                this.stompClient.connect({}, () => {
                    this.registerUser();

                    // 注意这里：你在上面的代码中使用了 chatChannelInfor，但在 data 中你命名为 chatChannelInfo。
                    // 请确保名称一致。
                    console.log(this.chatChannelInfor);
                    const chatContactPath = `/chat/contact/${this.chatChannelInfor.userFromId}`; 

                    this.stompClient.subscribe(chatContactPath, (notification) => {
                        const receivedMessage = JSON.parse(notification.body);
                        const content = receivedMessage.content;
                        const sender = receivedMessage.from;
                        this.displayMessage(sender, content);
                    });
                });
            },
            // Function to fetch chat history from the backend
            fetchChatHistory() {
                const channelId = this.chatChannelInfor.channelId;
                this.myMessageId = `${this.loggedInUser.userId}-${this.loggedInUser.name}`;
                axios.get('http://localhost:8181/ComityChat/getChatHistory', {params: {channelId: channelId,},})
                    .then((response) => {
                        if (response.status === 200) {
                        const chatHistories = response.data;
                        chatHistories.forEach((history) => {
                        const sender = history.from;
                        const content = history.content;
                        this.displayMessage(sender, content);
                    });
                    } else {
                        console.error('Failed to fetch chat histories');
                    }
                    })
                    .catch((error) => {
                    console.error('Error fetching chat history:', error);
                });
            },

            showUserName()
            {
                if (this.chatChannelInfor) {
                    const userName = this.chatChannelInfor.userToId.split('-')[1];
                    this.chatPartnerName = userName;
                } else {
                    this.chatPartnerName = 'Chatting Partner';
                }
            },

            sendMessage(message) {
                    const chatMessage = {
                    type: 'message',
                    channelId: this.chatChannelInfor.channelId,
                    from: this.chatChannelInfor.userFromId,
                    to: this.chatChannelInfor.userToId,
                    content: message,
                    time: new Date(),
                    };

                    // Send the message using WebSocket
                    this.stompClient.send("/app/message",{}, JSON.stringify(chatMessage));

                    // Clear the message input
                    this.messageInput = '';
            },

            displayMessage(sender, content) {
                const message = {
                    sender,
                    content,
                    timestamp: new Date().toISOString(),
                };
                // Add the new message to chatHistory
                this.chatHistory.push(message);
            },

            handleSendClick() {
                const message = this.messageInput.trim();
                if (message !== '' && this.chatChannelInfor) {
                    this.displayMessage(this.myMessageId, message);
                    this.sendMessage(message);
                }
            },

            // Define the registerUser function
            registerUser() {
            if (this.chatChannelInfor) {
                this.stompClient.send("/app/register", {}, this.chatChannelInfor.userFromId);
             }
            },
            

/* //////////////////////////////////////////use format if needed///////////////////////////////*/
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
/*  sendMessage(){

                console.log('sendMessage method called');
                if (this.messageInput.trim() === '')
                {return;}

                console.log('New message:', newMessage);
                // Push the new message to the chat history
                    this.chatHistory.push(newMessage);
                    console.log('Chat history:', this.chatHistory);

                // Clear the message input
                this.messageInput = '';

            },
*/
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
            <el-header class="header">
                    <Icon class="arrowBack" @click="goBack_messagePage()"><ArrowBackFilled /></Icon>
                    <img :src="avatar5" alt="avatar" class="header_avatar" />
                    <b class="header_chatPartnerName">{{ this.chatPartnerName }}</b> <!-- NOTE: I guess'Timothy' should come from the session info? -->
            </el-header>
                <div id="chat_background">
                    <div id="messageTop">
                        <img :src="avatar5" alt="avatar" id="messageTop_avatar" />
                        <b id="messageTop_partnerName">{{ this.chatPartnerName }}</b> <!-- NOTE: I guess'Timothy' should come from the session info? -->
                    </div>
                    
                    <!-- NOTE: This section needs to be updated by using for-loop to display the chat history in DB -->
                    <div id="messageMain">
                        <!-- Display existing messages from chat history using v-for -->
                        <div v-for="message in chatHistory" :key="message.timestamp">
                            <!--<p class="messageDate">{{ formatDateAndTime(message.timestamp) }}</p>-->
                            <div v-if="message.sender === myMessageId" class="reply_from_me" >
                                <p class="text_from_me">{{ message.content }}</p>
                                <img :src="avatar4" alt="avatar" class="miniIcon_me" />
                            </div>
                            <div v-else class="reply_from_chatPartner">
                                <img :src="avatar5" alt="avatar" class="miniIcon_chatPartner" />
                                <p class="text_from_partner">{{ message.content }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="chat_footer">
                    <div class="chat_footer_icons">
                        <Icon class="camera_icon"><CameraAltFilled /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                        <Icon class="image_icon"><ImageRound /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                        <Icon class="microphone_icon"><MicRound /></Icon> <!-- NOTE: put @click="" inside the icon tag-->
                    </div>
                    <div class="message_input_textField">
                        <div class="enterMessageHere">
                            <input type="text" placeholder="Message..." v-model="messageInput" @keyup.enter="sendMessage" />
                        </div>
                        <div class="arrow_to_send_a_message" @click="handleSendClick">
                            <!-- NOTE: How can I place the arrowUp icon inside the texFiled above? -->
                            <Icon><ArrowCircleUpTwotone /></Icon>
                        </div>
                    </div>
                </div>
    </div>
</template>

<style src = "@/css/chat.css" scoped></style>