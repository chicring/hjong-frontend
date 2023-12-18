<template>

  <v-container class="h-75">
    <v-window :model-value="step">
      <v-window-item :value="1" class="pt-15" >
        <v-row>
          <v-col cols="12">
            <v-row justify="center"> <h2>驼鹿快传</h2></v-row>
          </v-col>

          <v-col cols="12" class="my-3">
            <v-row justify="center"> <v-avatar v-if="shareDetail.share_user" size="80" :image="shareDetail.share_user.avatar"></v-avatar> </v-row>
          </v-col>

          <v-col cols="12" class="pb-10">
            <v-row justify="center"><h4><strong style="color: #446388">{{shareDetail.share_user?.userName || '游客' }}</strong> 分享了此文件</h4></v-row>
          </v-col>

          <v-col cols="4">
          </v-col>
          <v-col cols="4">
            <v-text-field class="text-h5 font-weight-black" counter v-model="pwd" flat variant="solo-filled" placeholder="请输入取件码"></v-text-field>
          </v-col>
          <v-col cols="4">
          </v-col>

          <v-col cols="4">
          </v-col>
          <v-col cols="4">
            <v-btn variant="flat" block @click="handle" color="#476586"> 查看文件</v-btn>
          </v-col>
          <v-col cols="4">
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <div class="pa-5">
        <v-row dense>
          <v-col cols="7">
            <div class="d-flex align-center">
              <v-avatar v-if="shareDetail.share_user" size="80" :image="shareDetail.share_user.avatar"></v-avatar>
              <div class="ml-2">
                <h4>分享文件</h4>
                <p><strong style="color: #446388">{{shareDetail.share_user?.userName || '游客' }}</strong> · {{formatDate(shareDetail.share.expireTime,1)}}前有效</p>
              </div>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-btn color="#476586" variant="tonal" block @click="shareCopy">分享</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn color="#476586" block :href="url" @click="getDownload">下载</v-btn>
          </v-col>
        </v-row>

        <v-row dense class="mt-5">
          <v-col cols="3" v-for="file in shareDetail.file" :key="file.fileId">
            <v-hover v-slot="{isHovering, props}">
              <v-card
                flat
                :color="isHovering ? 'grey-lighten-3' : '#fafafc' "
                max-height="191"
                v-bind="props"
                rounded="lg"
              >
                <div class="d-flex justify-center">
                  <v-icon size="120">mdi-file</v-icon>
                </div>
                <v-card-title class="text-center text-subtitle-2">{{file.fileName}}</v-card-title>
                <v-card-subtitle class="text-center my-0">{{ formatDate(shareDetail.share.shareTime,2)}}</v-card-subtitle>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        </div>
      </v-window-item>

      <v-window-item :value="3">
        <v-card rounded="lg">
          <div class="justify-center d-flex">
            <NotFound></NotFound>
          </div>
          <v-card-subtitle class="text-center pb-5 text-h6"> 文件不存在或已过期</v-card-subtitle>

        </v-card>
      </v-window-item>
    </v-window>
  </v-container>

</template>
<script setup>

import {onMounted, ref} from "vue";
import request from "@/requests/myAxios";
import useClipboard from 'vue-clipboard3'
import { useToast } from 'vue-toastification'
import NotFound from "@/components/icon/NotFound.vue";
const toast = useToast();
const { toClipboard } = useClipboard()

function shareCopy(){
  try {
    let message = "分享链接: " + window.location.href
    if(pwd.value !== ''){
      message = message.concat(" 密码:" + pwd.value)
    }
    toClipboard(message)
    toast.success("已复制分享链接到剪切版")
  } catch (e) {
    console.error(e)
  }
}

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
let step = ref(1)
let pwd = ref('')
let shareDetail = ref({})

let url = null

function getShare(){
  request({
    method: 'GET',
    url: '/share/find',
    params: { 'link': props.id, 'password':pwd.value}
  }).then( response =>{
    let data = response.data
    console.log(data)
    if(data.code === 200){
        shareDetail.value = data.data
        if(data.data.file){
          step.value = 2
          toast.success("查看成功")
            url = 'http://8.217.183.57:8888/file/download/'
                + shareDetail.value.share.shareLink
                + '/' + shareDetail.value.share.fileId
                + (pwd.value ? '?password=' + pwd.value : '');
        }else {
          step.value =1
          if(pwd.value === ''){
            toast("请先输入密码")
          }else {
            toast.error("密码不正确")
          }
        }
    }else if(data.code === 10010 || data.code === 10014){
      step.value = 3
    }
  })
}

function handle(){
  getShare();
  url = 'http://8.217.183.57:8888/file/download/'
    + shareDetail.value.share.shareLink
    + '/' + shareDetail.value.share.fileId
    + (pwd.value ? '?password=' + pwd.value : '');
}

const formatDate = (value,type) => {
  let formattedDate
  if(type === 1){
    formattedDate = new Date(value).toLocaleString();
  }
  if(type === 2){
    formattedDate = new Date(value).toLocaleDateString();
  }
  return formattedDate;
};

function getDownload() {
  toast.success('加入下载成功')
  let History = JSON.parse(localStorage.getItem('History')) || [];
  History.push(shareDetail.value)
  localStorage.setItem('History',JSON.stringify(History))
  console.log(url)
}

onMounted( ()=>{
  getShare()
})
</script>

<style scoped>

</style>
