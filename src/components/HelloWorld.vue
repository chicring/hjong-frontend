<template>
  <v-container fluid class="fill-height mx-0 px-0">
    <v-container class="d-flex justify-space-between align-center">
      <v-sheet rounded="pill" height="80" width="380" elevation="3" class="d-flex justify-space-between align-center pa-2 custom-sheet" style="z-index: 999; opacity: 0.9">
        <v-btn
          variant="text"
          prepend-icon="mdi-plus-thick"
          rounded="pill"
          class="text-h5 custom-btn1 font-weight-black"
          @click="DetailShow = true"
          @mouseenter="showIcon = true"
          @mouseleave="showIcon = false"
        >
          {{ !showIcon ? '添加文件' : '嘟嘟嘟~~' }}
        </v-btn>
        <v-btn size="x-large" rounded="pill" variant="flat" class="text-body-1 custom-btn font-weight-bold" @click="handle">口令取件</v-btn>
      </v-sheet>

      <v-sheet rounded="xl" style="z-index: 999; opacity: 0.9">
<!--        <RankingList></RankingList>-->
      </v-sheet>
    </v-container>

  </v-container>
  <Waveback>

  </Waveback>

  <UploadDetails></UploadDetails>
</template>

<script setup>

import {ref,provide} from "vue";
import UploadDetails from "@/components/UploadDetails.vue";
import Waveback from "@/components/Waveback.vue";

const showIcon = ref()
const DetailShow = ref(false)

import { useToast } from 'vue-toastification'
const toast = useToast();

function handle(){
  toast.success("dsa",{
    position: "top-right",
    timeout: 5000,
  });
}
provide("DetailShow",DetailShow)

</script>

<style scoped>
.custom-sheet:hover{
  transition: transform 0.8s ease; /* 添加过渡效果，使移动更平滑 */
  transform: translateX(-20px); /* 向左移动 10 像素，根据需要调整距离 */
}
.custom-btn:hover{
  transform: scale(1.08);
  background: #446388;
  color: #d8bb53;
}
.custom-btn{
  background: #eaeaea;
}


</style>
