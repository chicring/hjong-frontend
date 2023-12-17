<template>
  <v-container fluid class="fill-height mx-0 px-0">
    <v-container class="d-flex justify-space-between align-center">
      <v-sheet rounded="pill" height="70" width="380" elevation="3" class="d-flex justify-space-between align-center pa-2 custom-sheet" style="z-index: 999; opacity: 0.9">
        <v-btn
          v-if="!showInput"
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
        <v-text-field
          v-show="showInput"
          transition="slide-x-transition"
          v-model="password"
          label="口令"
          variant="outlined"
          hide-details
          rounded="pill"
          base-color="#eaeaea" bg-color="#f1f3f5" color="black"
          class="text-h5  font-weight-black"
          :rules="rule"
          @keyup.enter="handle"
        >
          <template v-slot:append-inner>
            <v-btn  flat icon="mdi-close-circle-outline" size="small" @click="showInput = false"></v-btn>
          </template>
        </v-text-field>
        <v-btn v-if="!showInput" size="x-large" rounded="pill" variant="flat" class="text-body-1 custom-btn font-weight-bold" @click="showInput = true">口令取件</v-btn>
      </v-sheet>
    </v-container>

  </v-container>

  <Waveback></Waveback>
  <UploadDetails></UploadDetails>
</template>

<script setup>

import {ref,provide} from "vue";
import UploadDetails from "@/components/UploadDetails.vue";
import Waveback from "@/components/Waveback.vue";

const showIcon = ref()
const DetailShow = ref(false)

const showInput = ref(false);
const password = ref('');

let rule = [v => (v && v.length < 15) || '分享码至多15个字符',v => (v && v.length > 5) || '分享码不能为空']
import { useToast } from 'vue-toastification'
import router from "@/router";
const toast = useToast();

function handle(){
  if(password.value === ''){
    toast.error("分享码不正确")
  }else {
    toast.info("查看分享",{
      position: "top-right",
      timeout: 1000,
    });
    setTimeout( ()=>{router.push("/s/" + password.value )},300)
  }

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

.custom-input{
  color: #eaeaea;
  transition: color 0.3s;
}
.custom-input:hover{
  color: black;
  transition: color 0.3s;
}
</style>
