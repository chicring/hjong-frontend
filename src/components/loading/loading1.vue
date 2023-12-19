<template>
  <div class="loading">
    <p>正在加载. . .</p>
  </div>
</template>

<script setup>

import MooseIcon from "@/components/icon/MooseIcon.vue";
</script>

<style scoped>
.loading {
  position: fixed;
  transform: translate(-50%, -50%);
  background: url('~@/assets/img/Moose.svg') center center no-repeat #fff;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  animation: floatUpDown 1.5s infinite alternate; /* 上下浮动动画 */
}

@keyframes floatUpDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30px); /* 浮动的距离，可以根据需要调整 */
  }
}

</style>
