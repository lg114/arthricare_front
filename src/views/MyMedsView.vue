<script setup>
   //import {ArrowLeftBold} from '@element-plus/icons-vue';
   import {ArrowRightBold} from '@element-plus/icons-vue';
   import red from "@/assets/capsulesred.png";
   import yellow from "@/assets/capsulesyellow.png";
   import green from "@/assets/capsulesgreen.png";
   import blue from "@/assets/capsulesblue.png";
   import purple from "@/assets/capsulespurple.png";
   import orange from "@/assets/capsulesorange.png";
   import store from "@/store";
   import { ref } from 'vue';
  import { LineHorizontal320Filled, Add20Filled, Home20Regular, BriefcaseMedical20Filled, Gift20Regular, Person20Regular } from '@vicons/fluent';
  import SideBarContent from '@/component/Sidebar.vue';
    import { Icon } from '@vicons/utils'
    const active= ref(1);
</script>

<template>
   <div class="container">
   
    <div class = "container-flex">
      <router-link to = "/">
         <el-icon class = "OperaBtn"><LineHorizontal320Filled/></el-icon>
      </router-link>
      <!-- <Icon @click="drawer = true"><MoreHorizFilled /></Icon> -->
      <p id = "title">My Meds</p>
    </div> 
    


    <div id = container2>
       <!-- <button @click="addObjectToArray">Generate Object and Add to Array</button>
      <p id = "p1">Current Medicine</p> -->
     
     <div class = "container-block" style = "height:100% ;width:100%"> 

      <!-- <div class="medObject" >
        <div class = "container-flex" style = "height:100% ;width:100%">
          <el-icon to = "/AddMed-mobile" class="PlusBtn"><CirclePlus/></el-icon>
          <div class = "container-block" style = "height:100% ;width:100%"> 
            <p class="medName"> {{ $route.query.MedName}}</p>
            <p class="date" >Category: {{ $route.query.Category}}</p>
           <p>Input 1: {{ $route.query.Field}}</p> 
          </div>  
          <router-link to = "/EditMed-mobile" >
            <el-icon class="arrowBtn"><ArrowRightBold/></el-icon>
          </router-link>
      </div>  
      {{ store.state.test}}</p>
    </div> -->
    <div class = "zeroObjAlert" v-if="store.state.MedArray.length === 0">
        <p class="zeroObjAlertP">You haven't add any Medication</p>
      </div >
      
      <div class="medObject" v-for="(item, index) in store.state.MedArray" :key="index" >
        <div class = "container-flex" style = "height:100% ;width:100%">

          <img :src= imgArray[index] class = "medImg" alt="Image" id  = "medIcon"> 

          <div class = "container-block" style = "height:100% ;width:100%"> 
           <!--<  <p class="medName"> {{ index + 1}}</p> -->       
            <p class="medName"> {{ item.MedName}}</p>
            <p class="date" >Category: {{ item.Category}}</p>
            
           <!--<p>Input 1: {{ $route.query.Field}}</p> -->
          </div>  
          <!-- <p>{{ store.state.navigation}}</p> -->
          <router-link :to="{ path: '/EditMed', query: { Index: index } }">
            <el-icon class="arrowBtn"><ArrowRightBold/></el-icon>
          </router-link>
        </div>  
      </div>

      

      </div>
  </div>
  <var-bottom-navigation
            class="footer"
            v-model:active="active"
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
                <Icon style="font-size: 38px;"><BriefcaseMedical20Filled /></Icon><br>
                <span>My Meds</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/Rewards" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="rewardsButton">
                <Icon style="font-size: 38px;"><Gift20Regular /></Icon><br>
                <span>Rewards</span>
            </var-bottom-navigation-item>
            </var-link>
            <var-link href="/#/UserProfile" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><Person20Regular /></Icon><br>
                <span>Profile</span>
            </var-bottom-navigation-item>    
            </var-link>
            <template #fab >
                <var-link href="/#/AddMed" style="color: white;">
                <Icon class="addButton"><Add20Filled /></Icon>
                </var-link>
            </template>
        </var-bottom-navigation>
<el-drawer style="background-color: #1890FF;" v-model="drawer" title="sidebar" :with-header="false" direction="ltr" size="70%" :append-to-body = "true" :before-close = "beforeDrawerClose">
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
</div> 
</template>


<style scoped>
    img{
      width: 12%;
      height:12%;
      margin-top:10px;
      margin-right:15px;

    }
    .sidebar{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
  }

.uploaded-avatar {
        width: 100%;
        height: 100%;
}
.defalut-avatar{
    width: 70%;
    height: 80%;
}
.menu-item{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
}
.menu-icon{
    color: #ffffff;
    font-size: 20px;
}
.menu-icon1{
    color: #ffffff;
    font-size: 25px;
    margin-right: 15px;
}
.menu-icon2{
    color: #ffffff;
    font-size: 25px;
    margin-right: 5px;
}
.menu-icon3{
    color: #ffffff;
    font-size: 25px;
    margin-right: 1px;
}
.menu-button{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
}
.menu-button3{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 130px;
    cursor: pointer;
}
.menu-button3 p{
    font-size: 20px;
    font-weight: 550;
    margin: 20px 35px;
}
.menu-button p{
    font-size: 20px;
    font-weight: 550;
    margin: 30px 30px;
    text-decoration: none;
}
    
    .zeroObjAlert{
      width:100%;
      height:100%;
      margin-left:5%;
      background-color: white;
   
    }

    .zeroObjAlertP{
      color:#55BBC9;
      position: relative;
      top:20%;
      font-size:200%;
      height:1000%;
      text-align: center;
      right:5%;

    }
    .container{
      overflow-y: auto;
        display: flex;
        align-items: center;
        height:100%;
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
        background-color: white;
        height:100%;
        width:100%;
        justify-content: center;
        align-items: center;
        display:inline-block;
    }

    #title{
      font-size: 130%;
      position: relative;
      color:#FFFFFF;
      right:15%;
      margin-top:30%;
    }

    .container-flex{
       display:flex;
    }

    .container-block{
       width:100%;
       height:100%;
       
    }

    .OperaBtn{
        font-size: 20px;
        color:#FFFFFF;
        position:relative;
        margin-top:170%;
        right:440%;
    }

    .PlusBtn{
        font-size: 45px;
        color: red;
        display:relative;
        margin-top:4%;
        margin-left:10%;
      }

      .arrowBtn{
        font-size: 180%;
        color: grey;
        display:relative;
        margin-top:100%;
        right:90%;
        bottom:17%;
     
      }

      #medIcon{
        position:relative;
        margin-left:10%;
      }

     #p1{
        font-size:101%;
        margin-top:0;
        margin-bottom:0;
        display:relative;
        border-bottom: 1px solid #a39e9e;
        padding:3%;
        padding-left:9%;
        font-weight:bold;
        font-family: custom;
     } 

     .medObject{
        border-bottom: 2px solid #DDDDDD;
        width:100%;
        height:11%;
        padding:3%;
     }

     .medName{
        color : Black;
        margin-left:6%;      
        margin-right:6%;   
        display:relative;
        margin-top:5%;
        letter-spacing:1px;
        font-size:15px;
        width:40%;
     
     }

     .date{
        color : #a39e9e;
        font-size:3px;
        margin-left:6%;       
        display:relative;
        padding:0;
        letter-spacing:0.5px;
     }
     .bottomButton{
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
    --bottom-navigation-item-active-color: #55BDCA;
    white-space: nowrap;
}  
.addButton{
    font-size: 35px;
}
        
</style>

<script>


export default {
  computed:{
    name(){
      return store.state.navigation
    }
  },
beforeCreate(){
            console.log('beforeCreate')
        },
  created() {

  },

  data() {
    return{
      MedicineArray: [],
      imgArray:[red ,yellow,purple
      ,green,blue,orange]
      // MedName : this.$route.params.MedName,
      // Field : this.$route.params.Field,
      // Category : this.$route.params.Category
   
    };
},
  methods: {

    formattedDate(Date) {

      const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(Date).toLocaleDateString('en-US', dateOptions);
    },

    addObjectToArray() {
          // const queryObject = this.$route.query;
          // // const dataObject = {};
          // // for (const key in queryObject) {
          // //   dataObject[key] = queryObject[key];
          // // }
          
          // // // Add the object to the array
          // this.MedicineArray.push(queryObject);
          // const data = JSON.parse(jsonString);
          // const objectFromString = JSON.parse('{' + data.StringObject.replace(/&/g, ',').replace(/=/g, ':') + '}');
     
          // console.log(queryObject);
          // console.log(this.$route.query.queryObject);
          // console.log('Start');
          // console.log(this.MedicineArray[0]);
          const dataObject = {
            MedName:  this.$route.query.MedName,
            Category:  this.$route.query.Category,
            Frequency: this.$route.query.Frequency,
            Unit: this.$route.query.Unit,
            StartDate:  this.$route.query.StartDate ,
            EndDate:  this.$route.query.EndDate,
            Note:  this.$route.query.Note,
            timeInput1: this.$route.query.timeInput1,
            timeInput2: this.$route.query.timeInput2,
            timeInput3: this.$route.query.timeInput3,
          };   
          if(dataObject.MedName!=="" && dataObject.MedName!== undefined){
            console.log("FUnctino CALLED")
            this.MedicineArray.push(dataObject);
            store.state.MedArray.push(dataObject);
            sessionStorage.setItem('MedArray', JSON.stringify(this.MedicineArray));
          }else{
            console.log("error")
          }
            console.log(this.MedicineArray);
            console.log(this.MedicineArray.length);
            console.log(store.state.MedArray.timeInput1);
            console.log("End");

        },

        loadStorage(){
          const savedArrayData = sessionStorage.getItem('MedArray');
          if (savedArrayData) {
           this.MedicineArray = JSON.parse(savedArrayData);
          }
        },
        openDrawer() {
            this.drawer = true;
            },
            beforeDrawerClose(done) {
                done();
            },
  },
      
  mounted(){
        if(store.state.navigation){
          this.loadStorage();
          this.addObjectToArray();
          store.commit('changeToFalse');
          //store.commit("setArray", JSON.parse(sessionStorage.getItem('MedArray')));
         // console.log(store.state.MedArray[0].Field + "ffffffffffffff")
        }else{
          //store.commit("setArray", JSON.parse(sessionStorage.getItem('MedArray')));
          console.log("error mounted")
          
      }
    },

        components:{
          Icon,
          LineHorizontal320Filled, 
          Add20Filled, 
          Home20Regular, 
          BriefcaseMedical20Filled, 
          Gift20Regular, 
          Person20Regular,
          SideBarContent
        }
      }
        
</script>



