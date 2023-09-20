<template>
  <router-view v-slot="{ Component }">
    <transition name=" remember to change this for transition" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<style scoped>
  /* .slide-enter-active,
.slide-leave-active {
  transition: all 1s ease-in-out;
}

.slide-enter-to {
  position: relative;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: relative;
  left: 0;
} */
</style>

<script>

</script>