<script setup>
import {onMounted, ref} from "vue";
import request from "@/requests/myAxios";
import useClipboard from 'vue-clipboard3'
import { useToast } from 'vue-toastification'
const toast = useToast();
const { toClipboard } = useClipboard()

function shareCopy(){
  try {
    let message = "分享链接: " + window.location.href
    toClipboard(message)
    toast.success("已复制分享链接到剪切版")
  } catch (e) {
    console.error(e)
  }
}

const props = defineProps({
  id: {required: true,type: String,}
  }
)
const detail = ref({})
function getPostOne(){
  request( {
    method: "GET",
    url: "/userPosts/findOne",
    params: { "id": props.id}
  }).then( response =>{
    if(response.data.code === 200){
      detail.value = response.data.data
    }
  })
}

onMounted(()=>{
  getPostOne()
})
</script>
<template>
<v-container>
  <v-card class="mx-auto" flat rounded="xl" width="800">
    <div class="pa-4">
      <v-row justify="center">
        <v-avatar size="80" :image="detail?.user?.avatar"></v-avatar>
        <div class="w-25">
          <v-card-title class="align-center">{{detail?.user?.user_name}}</v-card-title>
          <v-card-subtitle>{{detail?.user?.introduction || '还没有简介哦'}}</v-card-subtitle>
        </div>
      </v-row>

      <v-row justify="center" class="mt-10">
        <h2>{{detail?.post_title}}</h2>
      </v-row>

      <div>
        <v-card-subtitle class="py-0">{{detail?.post_time}}</v-card-subtitle>
        <v-card-text>
          {{detail?.post_content}}
        </v-card-text>
      </div>
    </div>

    <div class="px-4 pb-2 d-flex justify-lg-space-around">
      <v-badge :content="detail?.likes_count" color="#d3e5ef" offset-y="8">
        <v-btn size="small" flat icon="mdi-thumb-up-outline"></v-btn>
      </v-badge>
      <v-badge :content="detail?.comments_count" color="#d3e5ef" offset-y="8" v-show="false">
        <v-btn size="small" flat icon="mdi-comment-multiple-outline" v-show="false"></v-btn>
      </v-badge>
      <v-btn size="small" flat icon="mdi-share-outline" @click="shareCopy"></v-btn>
    </div>
  </v-card>
</v-container>
</template>
