<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import store from "@/store";
  import { LineHorizontal320Filled, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular, Pill28Filled, ChannelAdd20Regular } from '@vicons/fluent'
  import { Icon } from '@vicons/utils'
  // import {Plus,Minus} from '@element-plus/icons-vue';
  import SideBarContent from '@/component/Sidebar.vue';
  import '@varlet/ui/es/button/style/index';
  import { ref } from 'vue'

  
</script>

<template>
   <el-container class = "container">
      
    <div class = "container-flex" style="height:100% ; width:50% ;">
          <Icon class="backBtn" name="menu" :size="25" color="white" @click="drawer = true"><LineHorizontal320Filled/></Icon>

        <p id= "title">Education</p>

        <router-link to = "/SearchArticle">
          <var-icon name="magnify" class="searchBtn" size="30" color="white"/>
        </router-link> 
      </div>
      
     <div id = container2>
      <var-tabs 
        color="transparent"
        active-color="#55BBC9"
        inactive-color="#ddd"
        v-model:active="active"
        indicator-position="none"
        indicator-size="0px"
        v-ripple="{ disabled: true }"
        ripple="{ disabled: true }"
        pointer-event="none"
        pointer-events="initial"
      >
        <var-tab @click="showVideo">Video</var-tab>
        <var-tab @click="showArtical">Article</var-tab>
       
      </var-tabs>

      <div v-if="VideoVisible">
        <router-link to="/educationVideo">
        <div class = "container3">
          <img src="@/assets/Med1.jpg" alt="Image" class="image">
          <div id = "label">
            Medication sale
          </div>
        </div>
      </router-link>
      
        <div class = "container3">   
          <img src="@/assets/exe2.jpg" alt="Image" class="image">
          <div id = "label">
            Medication
          </div>
        </div>

        <div class = "container3">
          <img src="@/assets/Med3.jpg" alt="Image" class="image">
          <div id = "label">
            Medication
          </div>
        </div>
      </div>

      <div v-if="ArticalVisible">
        <router-link to="/educationArticle">
        <div class = "container3">
          <img src="@/assets/Med4.jpg" alt="Image" class="image">
          <div id = "label">
           Medication
          </div>
        </div>
      </router-link>

        <div class = "container3">   
          <img src="@/assets/exe1.png" alt="Image" class="image">
          <div id = "label">
            exercise
          </div>
        </div>

        <div class = "container3">
          <img src="@/assets/doc1.png" alt="Image" class="image">
          <div id = "label">
            doctor
          </div>
        </div>
      </div>
    </div>
    <el-drawer style="background-color: #006973;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
            <!--Action是模拟接口，与后端连接时更换-->
                <div class = "sidebar">
                    <el-upload action="" :show-file-list="false">
                        <el-avatar :size="65">
                            <img :src="imgUrl" v-if="imgUrl" class="uploaded-avatar" />
                                <template v-else>
                                    <UserFilled class="defalut-avatar" />
                                </template>
                        </el-avatar>   
                    </el-upload> 
                </div>
            <SideBarContent :imgUrl="imgUrl" />    
        </el-drawer>
    </el-container>
    <var-bottom-navigation
            class="footer"
            border="true"
            safe-area="true"
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
            <!-- <template #fab>
                <var-link href="/#/AddMed" style="color: white;">
            <Icon class="addButton"><Add20Filled /></Icon>
            </var-link>
            </template> -->
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

</template>

<style lang = "css" scoped> 

.image {
  width:100%; 
  height: 100%;
  border-radius:15px 15px 0px 0px;
  display: block;
  z-index: 1;

}
  .var-tabs .var-tab--active {
    size:50%;
    font-size:100%; 
    font-weight:bold;

}
.var-tabs .var-tab__ripple {
  display: none;
}
 

/* scoped src="@/style/addMed.css" */
    h1{
      color:#55BBC9;
      font-size:17px;
      font-family: system-ui;
      margin-left:5%;
    }
    .container3{
      border-bottom: 3px solid #d8d0d0;
      margin:5%;
      margin-top:3%;
      margin-bottom:8%;
      background-color: #ffffff;
      border-radius:15px 15px 15px 15px;
      height:70%;
      width:90%;
      align-items: center;
      max-height: 200px;
      overflow: hidden;
      position: relative;

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
  left:20%;
  padding-top:6.5%;
  }

#label{   
  width:100%;
  font-weight:600;
  font-size: 100%;
  color:  #006973;
  padding:2%;
  text-align: left;
  font-family: system-ui;
  background-color:#F7F0F0;
  border-radius:0px 0px 15px 15px;
  box-shadow: 1px 2px 2px 1px #ccdde9; 
  position:absolute;
  bottom:0;
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
</style>

<script>

export default {
  components: {SideBarContent,LineHorizontal320Filled,Icon, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, PeopleCommunity20Regular, Pill28Filled, ChannelAdd20Regular},
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
      Meds2:[],
      //always empty
      Meds3:[],
      showAction: ref(false), //Show actions of the fab
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
    toggleAction(){
                this.showAction.value = !this.showAction.value
            }

},
  mounted(){
            document.title = 'Education'

        },
        setup(){
          
        }
}

</script>