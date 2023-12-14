<script setup>
  import {ref} from "vue";

  const snackbar = ref({
    show: false,
    title: '标题',
    message: '消息',
    color: 'info', // 默认颜色，你可以根据需要调整
    icon: '$success'
  })
  let success = (title,message)=>{
    snackbar.value = {show: true, title, message,color: "success",icon: "$success"}
  }
  let error = (title,message)=>{
    snackbar.value = {show: true, title, message,color: "error",icon: "$error"}
  }
  let alert = (title,message)=>{
    snackbar.value = {show: true, title, message,color: "warning",icon: "$warning"}
  }
  let info = (title,message)=>{
    snackbar.value = {show: true, title, message,color: "info",icon: "$info"}
  }
  defineExpose({
    success,
    error,
    info,
    alert,
  })
</script>

<template>
  <v-snackbar
    location="top right"
    v-model="snackbar.show"
    timeout="3000"
    :timer="snackbar.color"
    rounded="lg"
    color="rgba(255, 255, 255, 0.95)"
    theme="dark"
    class="elevation-1"
  >
    <v-row align="center">
      <v-col cols="2">
        <v-icon :icon="snackbar.icon" size="35" :color="snackbar.color" class="mr-3"></v-icon>
      </v-col>
      <v-col cols="7">
        <div>
          <p class="text-body-1 pb-2 text-black">{{snackbar.title}}</p>
          <p>{{snackbar.message}}</p>
        </div>
      </v-col>
      <v-col cols="3">
        <v-btn size="small" variant="flat" color="grey-lighten-3" icon="mdi-window-close" @click="snackbar.show = false"></v-btn>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<style scoped>

</style>
