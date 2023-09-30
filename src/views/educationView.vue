<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import store from "@/store";
  // import {Plus,Minus} from '@element-plus/icons-vue';
  import '@varlet/ui/es/button/style/index';

  import { ref } from 'vue'
  import { LineHorizontal320Filled, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular,Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent';
  import { AlertCircle, Logout } from '@vicons/tabler';
  import { UserProfileAlt } from '@vicons/carbon';
  import { CastForEducationFilled } from '@vicons/material';
  import { Icon } from '@vicons/utils';
  const active = ref(0);
  
</script>

<template>
   <el-container class = "container">
      
    <div class = "container-flex" style="height:100% ; width:50% ;">
          <Icon  @click="drawer = true" class="backBtn" name="menu" :size="25" color="white"><LineHorizontal320Filled /></Icon>
        <p id= "title">Education</p>

        <router-link to = "/SearchArticle">
          <var-icon name="magnify" class="searchBtn" size="30" color="white"/>
        </router-link> 
      </div> 

     <div id = container2>
      <var-tabs 
        color="transparent"
        active-color="#55BBC9"
        inactive-color="#006973"
        v-model:active="active"
        ripple="{ disabled: true }"
        pointer-event="none"
        pointer-events="initial"
      >
      <!-- indicator-position="none"
        indicator-size="0px"  it is a border attribute-->
        <var-tab @click="showVideo">Video</var-tab>
        <var-tab @click="showArtical">Article</var-tab>
       
      </var-tabs>

      <div class="container-flex" style="margin-top:2vh;">
        <img class="starIcon" src= "@/assets/circle-star.png" alt="Image" id  = "medIcon">
        <h1  v-if="VideoVisible">SUGGESTED VIDEO</h1>
        <h1 v-if="ArticalVisible">SUGGESTED ARTICAL</h1>

      </div>

      <div v-if="VideoVisible" style=" align-items: center;">
        <router-link to="/EducationVideo">
        <div class = "container3" style="margin-top:3vh">
          <img src="@/assets/Med1.jpg" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70%"> Medication</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 562</p>
          </div>
        </div>
      </router-link>

        <router-link to="/EducationVideo">
        <div class = "container3">   
          <img src="@/assets/exe2.jpg" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70%"> Exercise</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 222</p>
          </div>
        </div>
      </router-link>

        <router-link to="/EducationVideo">
        <div class = "container3">
          <img src="@/assets/Med3.jpg" alt="Image" class="image">
          <div id = "label">
          
            <p style="margin:0;width:70%"> Medication</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 442</p>
          </div>
        </div>
      </router-link>
      </div>

      <div v-if="ArticalVisible" style="margin-top:3vh">
        <router-link to="/educationArticle">
        <div class = "container3">
          <img src="@/assets/Med4.jpg" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70%"> exercise</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 17</p>
          </div>
        </div>
      </router-link>

        <router-link to="/educationArticle">
        <div class = "container3">   
          <img src="@/assets/exe1.png" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70%"> Medication</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 83</p>
          </div>
        </div>
      </router-link>

        <router-link to="/educationArticle">
        <div class = "container3">
          <img src="@/assets/doc1.png" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70"> Doctor</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 54</p>
            
          </div>
        </div>
      </router-link>
      </div>
    </div>
   
    </el-container>
    <var-bottom-navigation
            class="footer"
            v-model:active="activeBottom"
            border="true"
            safe-area="true"
            :fab-props="{color:'#55BDCA'}"
        >
            <var-link href="/#/Home" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="homeButton">
                <Icon  style="font-size: 38px;"><Home20Regular /></Icon><br>
                <span>Home</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/MyMeds" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="medsButton">
                <Icon style="font-size: 38px;"><BriefcaseMedical20Regular /></Icon><br>
                <span>My Meds</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/Rewards" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="rewardsButton">
                <Icon style="font-size: 38px;"><Gift20Regular /></Icon><br>
                <span>Rewards</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/Community" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><PeopleCommunity20Regular /></Icon><br>
                <span>Community</span>
            </var-bottom-navigation-item>    
            </var-link>
        </var-bottom-navigation>
                        <!-- Fab button -->
                        <var-fab v-model:active="showAction" style="margin-bottom: 100px;" color="#006973" inactive-icon-size="26px" active-icon-size="30px" elevation="5">
            <var-button class="action" round color="#F27B42" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
                <var-link href="/#/AddPost" text-color="white" text-size="25px">
                <Icon><ChannelAdd20Regular /></Icon>
            </var-link>
            </var-button>
            <var-button class="action" round color="#55BDCA" text-color="white" elevation="5" style="width:40px; height:40px; font-size: 25px;">
                <var-link href="/#/AddMed" text-color="white" text-size="25px">
                    <Icon><Pill28Filled /></Icon>
                </var-link>
            </var-button>
        </var-fab>
    <!-- Side barDrawer -->
    <el-drawer v-model="drawer" direction="ltr" size="70%" :show-close="false" style = " background-color: #006973;">
        <template #header>
            <div class = "topping">
                <var-avatar :size = "100" bordered bordered-color="#FFFFFF" lazy error = "https://img.icons8.com/fluency-systems-regular/48/user--v1.png"/>
            </div>
        </template>
        <div class = "middle">
            <div class = "icon-text-container" @click = "goToUserProfile">
                <div class="icon-container">
                    <Icon><UserProfileAlt/></Icon>
                </div>
                <p>My profile</p>
            </div>
            <div class = "icon-text-container">
                <div class="icon-container">
                    <Icon><CastForEducationFilled/></Icon>
                </div>
                <p>Education</p>
            </div>
        </div>
        <template #footer>
            <div class = "bottom">
                <div class = "icon-text-container">
                    <div class="icon-container">
                        <Icon><AlertCircle/></Icon>
                    </div>
                    <p>About</p>
                </div>
                <div class = "icon-text-container" @click = "logout">
                    <div class="icon-container">
                        <Icon><Logout/></Icon>
                    </div>
                    <p>Log out</p>
                </div>
            </div>
        </template>
    </el-drawer>
</template>

<style lang = "css" scoped> 
  .likeNumber{
    padding:0;
    margin:0;
    margin-left:2%;
    left:6%;
    position:relative;
    top:0.7vh;
    font-size:90%;

  }
  .like{
    height:3vh;
    position:relative;
    left:6%;
    top:0.1vh;

  }
  .starIcon{
    width:5vh;
    height:5vh;
    position:relative;
    left:1.5vh;
    top:0.3vh;
    color:#006973;
  }

.image {
  width:100%; 
  height: 100%;
  border-radius:5px 5px 5px 5px;
  display: block;
  z-index: 1;

}
  .var-tabs .var-tab--active {
    size:50%;
    font-size:100%; 
    font-weight:bold;
    color:#006973;

}

.var-tabs .var-tab--inactive {
    size:50%;
    font-size:100%; 
    font-weight:bold;
    color:#006973;
    border-bottom: 1px solid #ccc;
}

.var-tabs .var-tab__ripple {
  display: none;
}
 
/* scoped src="@/style/addMed.css" */
    h1{
      color:#006973;;
      font-size:90%;
      font-family: system-ui;
      margin-left:5%;
      margin-top:1.7vh;
    }
    .container3{
      background-color: #ffffff;
      border-radius:5px 5px 5px 5px;
      height:25vh;
      width:95vw;
      align-items: center;
      max-height: 25vh;
      overflow: hidden;
      position: relative;
      margin:auto;
      margin-bottom:1.5vh;
    }

    .calculationPart{
      display:flex;
      width:40%;
      height:100%;
      margin-left:20%;
      border: 4px solid #1890FF;
      border-radius:10px 10px 10px 10px;
      margin:0;
      padding:0;
}
.buttons{
  height:30%;
  width:100%;
}

.container-flex{
  height:auto;
  display:flex;
  z-index: 1;
}

.container-block{
  display:inline-block;
  width:40%;
  
}

.BellBtn{
  font-size: 30px;
  color: #1890FF;
  position:relative;
  margin-left:60%;
  size:40%;
  
}
.Button{
    position: relative;
    background-color: #1890FF;
    border: none;
    font-size:130%;
    color: #ffffff;
    padding: 0px;
    width: 50%;
    text-align: center;
    transition-duration: 0.6s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    left:20%;
    border-radius:10px 10px 10px 10px; 
    height: 4%;
    margin-top:40px;
    line-height: -50px;
}

.Button::after{
    content: '';
    background:#53a4f0;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px ;
    margin-top: -120%;
    opacity: 0;
    transition:all 0.8s;
}
.Button:active::after{
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
}

.container{
  overflow-y: auto;
  display: flex;
  align-items: center;
  height: 100%;
  width:100%;
  background-color:#006973;
  overflow: auto;
  flex-direction: column;
  margin: 0 ;
  }

#container2{
  overflow-y: auto;
  padding-left:auto;
  padding-right:auto;
  align-items: center;
  background-color: rgb(251, 251, 255);
  height:200%;
  width:100%;
  padding-bottom:100px;
  justify-content: center;
  align-items: center;    
  display:inline-block;
  }

#title{
  font-size: 130%;
  position:relative;
  color:#FFFFFF;
  font-family: system-ui;
  top:13%;
  width:100%;
  left:25%;
  padding-top:6.5%;
  }

#label{   
  width:100%;
  font-weight:600;
  font-size: 100%;
  color:  white;
  padding:3%;
  text-align: left;
  font-family: system-ui;
  background: repeating-linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4));

  position:absolute;
  bottom:0;
  display:flex;
  padding:1%;
  padding-left:6%;
  
  
}

input{
  align-items: center;
  width:100%;    
  font-size:90%;   
  background-color: white;
  border:none; 
  border : 1px solid #ccdde9;
  color: black;

  margin-bottom:2%;
  margin-top:2%;
  padding:5%;
  border-radius: 5px;
  font-family: system-ui;
  box-sizing: border-box;
  } 


  input:focus
  { 
  outline-style: none;
  border-bottom: 1px solid #b5b7c2;
  }

  .backBtn{
    color:#FFFFFF;
    position:absolute;
    left: 30px;
    top:4%;
    }

  .searchBtn{
    color:#FFFFFF;
    position:relative;
    left:210%;
    top:40%;
    }

.login-button{
  margin-top:5%;
  margin-left:2.5%;
  width: 95%;
  height: 350%;
  margin-bottom: 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size:17px;
  }

.login-button{
  color:white;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  background-color: transparent;
  background-color:#55BBC9;
  border: 2px solid white;
  transition: background-color 0.5s, color 0.5s;
  }
 /* footer */
 .bottomButton{
        width: 90px;
        padding-left:20px;
        padding-right: 20px;
    }
    .footer{
        display: inline;
        position: fixed;
        text-align: center;
        bottom: 0;
        height:80px;
        --bottom-navigation-item-font-size: 13px;
        --bottom-navigation-item-active-color: #646566;
        white-space: nowrap;
    }  
    .addButton{
        font-size: 35px;
    }
</style>

<script>

export default {
  components: {
    Icon,
    Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular,Pill28Filled, ChannelAdd20Regular,
    UserProfileAlt,
    CastForEducationFilled,
    AlertCircle,
    Logout

  },
  computed: {
    changeToTrue() {
      return this.$store.state.changeToTrue;
    },
    
  },
  data() {
    return {
      VideoVisible: true,
      ArticalVisible: false,
      Meds : [],
      drawer: ref(false),
    };
  },
  
  methods: {
    openDrawer() {
            this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
    showVideo() {
      this.VideoVisible = true;
      this.ArticalVisible = false;
    },
    showArtical() {
      this.ArticalVisible = true;
      this.VideoVisible  = false;
    },
    con(){
      console.log(this.$store.state.changeToTrue);
      store.commit("changeToTrue");
    },
    async logout(){
                this.$store.dispatch('user/logout');
    },

},
  mounted(){
            document.title = 'Education | ArthriCare'

        },
        setup(){
          
        }
}

</script>
