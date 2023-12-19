<template>
  <v-dialog width="550" v-model="dialog">
    <v-card rounded="lg" class="pa-2">
      <v-card-title>邮箱通知</v-card-title>
      <v-form v-model="form">
        <v-text-field :rules="rule" label="收信人邮箱" density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" v-model="email.address"></v-text-field>
        <v-text-field label="标题" density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" v-model="email.title"></v-text-field>
        <v-text-field label="内容" density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" v-model="email.content"></v-text-field>
        <v-btn block :disabled="!form" @click="sendMessage" variant="flat" color="#446388" rounded="xl">确认发送</v-btn>
      </v-form>
      <div class="py-3">
        <v-card-subtitle >预览</v-card-subtitle>
        <v-card-text>
          <h2 style="color:#446388;font-weight: bold;"> {{email.title}}</h2>
          <h4 style="font-weight: bold;">{{ email.content }}</h4>
        </v-card-text>
      </div>
    </v-card>

  </v-dialog>
</template>

<script setup>

import {ref} from "vue";
import axios from "axios";
import {store} from "@/store/store";
import { useToast } from 'vue-toastification'

const toast = useToast();

const props =defineProps({
  link: {}
})
const dialog =ref(false)
const email = ref({
  address: "",
  title: store.value.account?.userName + " 通过驼鹿快传分享了文件给你",
  content: "分享连接："+props.link
})

const form = ref(null)

let rule = [v => (v && v.length > 5) || '邮箱不能为空']
function showComponent() {
  dialog.value = true;
}
function hideComponent() {
  dialog.value = false;
}

function sendMessage(){
  axios({
    method:'GET',
    url:'http://jw.sanzuriver.cn/api/email',
    params:{
      'email':email.value.address,
      'title':email.value.title,
      'content':email.value.content
    }
  }).then(Response=>{
    toast.info(Response.data)
    email.value.address=""
    email.value.title=""
    email.value.content=""
    hideComponent()
  }).catch(error=>{
    console.log("服务器错误")}
  )

}
defineExpose({
  showComponent,
  hideComponent
})

</script>
