<template>
  <router-view />
</template>
<style scoped>

</style>

<script setup>
  import { onMounted } from 'vue';

  onMounted(() => {
    document.body.style.setProperty('--el-color-primary','#006973');
  })
</script>