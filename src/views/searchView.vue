<!--Welcome Page -->
<!--Welcome Page -->
<script setup>
  import store from "@/store";
  // import {Plus,Minus} from '@element-plus/icons-vue';
  import '@varlet/ui/es/button/style/index';
 
  
</script>

<template>
   <el-container class = "container">
      
      <div class = "container-flex" >
        <input ref="MedName" id="MedName" type="text" placeholder="Search"/>
        <router-link to = "/Education">
          <input type = "button" id = "input1" value="Cancel">
        </router-link> 
      </div>
      
      <div id = container2>
          <div class="container-block">
            <!-- <p style="margin-top:25%" class="searchItem">Health</p>
            <p class="searchItem">Medication</p>
            <p class="searchItem">Suppport</p>
            <p class="searchItem">Procedure</p> -->

          </div>
      </div>
   
    </el-container>
</template>

<style lang = "css" scoped> 

    #input1{
      width:8vh;
      position:relative;
      top:5.2vh;
      background:#006973;
      border:none;
      color:white;
      font-family: system-ui;
      font-weight: bold;

    }
    
  .searchItem{
    text-align: center;
    padding:0;
    margin-top:14%;
    color:white;
    font-size:130%;
    font-family: system-ui;
  }
  .cancel{
    position:relative;
    top:6vh;
    left:3%;
    margin-right:4vh;
    color:white;
    font-size:110%;
    font-family: system-ui;
    padding:0;
    height:5%;
  }
  .cancel:hover{
    position:relative;
    top:47%;
    left:3%;
    color:black;
    font-size:110%;
    font-family: system-ui;
  }
/* scoped src="@/style/addMed.css" */
    h1{
      color:#55BBC9;
      font-size:17px;
      font-family: system-ui;
      margin-left:5%;
    }
    .container3{
      border: 1px solid #eceff1;
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
  height:15vh;
  z-index: 1;
}

.container-block{
  align-items: center;
  width:100%;
  
}

.BellBtn{
  font-size: 30px;
  color: #1890FF;
  position:relative;
  margin-left:60%;
  size:40%;
  
}

.container{
  display: flex;
  align-items: center;
  height:100vh;
  width:100%;
  background-color:#006973;
  flex-direction: column;
  }

#container2{
  padding-left:auto;
  padding-right:auto;
  align-items: center;
  justify-content: center;
  background-color: #D9D9D9;
  height:100%;
  width:100%;
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
  color:  #006973;
  padding:2%;
  text-align: left;
  font-family: system-ui;
  background-color:#F7F0F0;
  border-radius:0px 0px 15px 15px;
  box-shadow: 1px 2px 9px 1px #ccdde9; 
  z-index: 3;
  position:absolute;
  bottom:0;
}

input{
  align-items: center;
  width:35vh;    
  height:5vh;
  font-size:100%;   
  margin-left:6%;
  margin-top:15%;
  background-color: white;
  border:none; 
  border : 1px solid #ccdde9;
  color: #006973;
  padding:5%;
  border-radius: 5px;
  font-family: system-ui;
  box-sizing: border-box;
  border-radius:10px 10px 10px 10px;
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

      Meds : [],
      Meds2:[],
      //always empty
      Meds3:[],

    };
    
  },
  
  methods: {
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
