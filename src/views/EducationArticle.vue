<!--Education Post Page -->
<script>
    import { ChevronLeft20Filled, BookOpen20Filled, Add20Filled, Home20Regular, BriefcaseMedical20Regular, Gift20Regular, Person20Regular, CommentMultiple20Regular } from '@vicons/fluent'
    import { ThumbUpAltOutlined } from '@vicons/material'
    import { Icon } from '@vicons/utils'
    export default{
        mounted() {
                document.title = "Education Article | ArthriCare";
        },
        setup(){
        },
        data(){
            return{
                selectedArticle:{
                    id: 1,
                    title: 'Example Article',
                    coverImage: 'https://orthoinfo.aaos.org/globalassets/figures/a00389f02.jpg',
                    content: 'Arthritis is a term often used to mean any disorder that affects joints. Symptoms generally include joint pain and stiffness. Other symptoms may include redness, warmth, swelling, and decreased range of motion of the affected joints. In some types of arthritis, other organs are also affected. Onset can be gradual or sudden. There are over 100 types of arthritis. The most common forms are osteoarthritis (degenerative joint disease) and rheumatoid arthritis. Osteoarthritis usually occurs with age and affects the fingers, knees, and hips. Rheumatoid arthritis is an autoimmune disorder that often affects the hands and feet.Other types include gout, lupus, fibromyalgia, and septic arthritis.They are all types of rheumatic disease.',
                    likes: 0
            },
                liked: false
            };
        },
        computed:{
            relatedArticles(){
                return [
                    {id: 1, title: 'Relative Article 1'},
                    {id: 2, title: 'Relative Article 2'}
                ]
            }
        },
        methods:{
            toggleLike(){
                this.liked = !this.liked;
                if(this.liked){
                    this.selectedArticle.likes++;
                }else{
                    this.selectedArticle.likes--;
                }
            },
            //Router
            goToEducationArticle(){
                this.$router.push('/EducationArticle');
            }
        },
        components: {
            ChevronLeft20Filled, 
            Add20Filled, 
            Home20Regular, 
            BriefcaseMedical20Regular,
            BookOpen20Filled,
            Gift20Regular, 
            Person20Regular, 
            ThumbUpAltOutlined,
            CommentMultiple20Regular,
            Icon,
        }
    };
</script>

<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <Icon class="back"><ChevronLeft20Filled /></Icon>
                <Icon class="titleIcon"><BookOpen20Filled /></Icon>
                <b class="pageTitle">Education</b>
            </el-header>
            <el-main class="main">
                <h1 class="articleTitle">{{ selectedArticle.title }}</h1>
                <img :src="selectedArticle.coverImage" class="coverImage">
                <p class="articleContent">{{ selectedArticle.content }}</p>
                <div class="likeComment">
                    <Icon :class="['likeButton', {liked : liked}]" @click="toggleLike"><ThumbUpAltOutlined/></Icon>
                    <span class="likeCount">{{ selectedArticle.likes }}</span>
                    <Icon class="commentButton"><CommentMultiple20Regular /></Icon>
                    <span class="commentCount">0</span>
                </div>
                <var-divider />

                <h4>Related Articles:</h4>
                <ul>
                    <li v-for="relatedArticle in relatedArticles" :key="relatedArticle.id" class="relativeTitle">{{ relatedArticle.title }}</li>
                </ul>
            </el-main> 
        </el-container>
        <var-bottom-navigation
            class="footer"
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
            <var-link href="/#/UserProfile" underline="none">
            <var-bottom-navigation-item class="bottomButton" name="profileButton">
                <Icon style="font-size: 38px;"><Person20Regular /></Icon><br>
                <span>Profile</span>
            </var-bottom-navigation-item>    
            </var-link>
            <template #fab>
                <var-link href="/#/AddMed" style="color: white;">
            <Icon class="addButton"><Add20Filled /></Icon>
            </var-link>
            </template>
        </var-bottom-navigation>
        
    </div>
</template>



<style src = "@/css/EducationArticle.css" scoped></style>