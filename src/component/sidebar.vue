<script>
    export default{
        
    }
</script>
<template>
    <el-drawer>
    <template #header>
        <div class = "topping">
            <var-avatar :size = "100" bordered bordered-color="#FFFFFF" lazy :src="require('@/assets/logo.png')"/>
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
                <Icon><UserProfileAlt/></Icon>
            </div>
            <p>Message</p>
        </div>
        <div class = "icon-text-container">
            <div class="icon-container">
                <Icon><CastForEducationFilled/></Icon>
            </div>
            <p>Education</p>
        </div>
        <div class = "icon-text-container">
            <div class = "icon-container">

            </div>
            <p>Assessment</p>
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
