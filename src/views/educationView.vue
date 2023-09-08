<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import store from "@/store";
  // import {Plus,Minus} from '@element-plus/icons-vue';
  import '@varlet/ui/es/button/style/index';
  import { ref } from 'vue'
  const active = ref(0);
  
</script>

<template>
   <el-container class = "container">
      
    <div class = "container-flex" style="height:100% ; width:50% ;">
        <router-link to = "/">
          <var-icon class="backBtn" name="menu" :size="25" color="white"/>
        </router-link> 
        <p id= "title">Education</p>

        <router-link to = "/Search">
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
        <var-tab @click="showArtical">Artical</var-tab>
       
      </var-tabs>

      <div class="container-flex" style="margin-top:2vh;">
        <img class="starIcon" src= "@/assets/circle-star.png" alt="Image" id  = "medIcon">
        <h1 style="margin-left:9%;">SUGGESTED VIDEO</h1>

      </div>

      <div v-if="VideoVisible" style=" align-items: center;">
        <div class = "container3" style="margin-top:3vh">
          <img src="@/assets/Med1.jpg" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70%"> Medication</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 562</p>
          </div>
        </div>

        <div class = "container3">   
          <img src="@/assets/exe2.jpg" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70%"> Exercise</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 222</p>
          </div>
        </div>

        <div class = "container3">
          <img src="@/assets/Med3.jpg" alt="Image" class="image">
          <div id = "label">
          
            <p style="margin:0;width:70%"> Medication</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 442</p>
          </div>
        </div>
      </div>

      <div v-if="ArticalVisible" style="margin-top:3vh">
        <div class = "container3">
          <img src="@/assets/Med4.jpg" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70%"> exercise</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 17</p>
          </div>
        </div>

        <div class = "container3">   
          <img src="@/assets/exe1.png" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70%"> Medication</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 83</p>
          </div>
        </div>

        <div class = "container3">
          <img src="@/assets/doc1.png" alt="Image" class="image">
          <div id = "label">
            <p style="margin:0;width:70"> Doctor</p>
            <img class="like" src= "@/assets/like.png" alt="Image" id  = "medIcon">
            <p class="likeNumber"> 54</p>
            
          </div>
        </div>
      </div>
    </div>
   
    </el-container>
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
      color:#55BBC9;
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
  background-color:#55BBC9;
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
  left:10%;
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
  z-index: 3;
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
    position:relative;
    right:250%;
    top:42%;
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

</style>

<script>

export default {
  components: {},
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

    };
  },
  
  methods: {
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
    }

},
  mounted(){
            document.title = 'Add Medication'

        },
        setup(){
          
        }
}

</script>
