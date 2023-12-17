<template>
  <v-container fluid>
    <v-tabs>
      <v-tab>我的分享</v-tab>
      <v-tab>付费分享</v-tab>
    </v-tabs>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
      variant="plain"
    >
      <v-btn >全部</v-btn>
      <v-btn >生效中</v-btn>
      <v-btn >已失效</v-btn>
    </v-btn-toggle>

    <v-sheet>
      <v-infinite-scroll
          class="h-100"
          @load="load"
          color="secondary"
      >
        <template v-for="(share, index) in list" :key="share.share_id">
          <v-list-item rounded="lg" >
            <v-row no-gutters align="center">
              <v-col cols="7">
                <div class="d-flex align-center">
                  <v-chip size="small" variant="text" class="text-subtitle-2">{{index}}</v-chip>
                  <v-icon size="30">mdi-file</v-icon>
                  <div class="ml-2">
                    <v-list-item-title class="text-body-2">{{share.file.file_name}}</v-list-item-title>
                    <v-list-item-subtitle class="text-subtitle-2">上传于：{{share.file.upload_time}}</v-list-item-subtitle>
                  </div>
                </div>
              </v-col>
              <v-col cols="5">
                <v-btn
                  variant="text"
                  class="btn-link"
                >
                  <LinkIcon ></LinkIcon>

                  <v-menu activator="parent">
                    <v-sheet class="pa-2" rounded="lg">
                      <v-btn variant="text" block :to=" '/s/'+ share.share_link">查看分享</v-btn>
                      <v-btn class="my-2" variant="text" block @click="copyAll(share)">复制分享</v-btn>
                      <v-btn variant="text" block @click="delectShare(share.share_id)">删除分享</v-btn>
                    </v-sheet>
                  </v-menu>
                </v-btn>

                <v-chip color="#8087bd" variant="flat" label size="small">{{share.expire_time}}后过期 </v-chip>
                <v-chip color="#d3e5ef" variant="flat" class="mx-2" size="small" label>浏览: {{share.views}}</v-chip>
                <v-chip color="#dbeddb" variant="flat" class="mr-2" size="small" label >下载：{{share.download_counts}}</v-chip>
                <v-chip v-if="share.password !== null" color="light-green-lighten-4" variant="flat" label size="small" class="pwd-chip">
                  <v-icon>mdi-lock-open</v-icon>
                  <div class="show-pwd ml-2 font-weight-medium">
                    {{share.password}}
                  </div>
                </v-chip>
              </v-col>
            </v-row>
          </v-list-item>
        </template>

        <template v-slot:empty>
          <v-alert density="comfortable" rounded="lg" type="info" border="start">没有更多分享了</v-alert>
        </template>
      </v-infinite-scroll>

    </v-sheet>
  </v-container>
</template>
<script setup>

import {onMounted, ref} from "vue";
import request from "@/requests/myAxios";
import LinkIcon from "@/components/icon/LinkIcon.vue";
import useClipboard from 'vue-clipboard3'
import { useToast } from 'vue-toastification'
const toast = useToast();
const { toClipboard } = useClipboard()

let toggle = ref(null)

let list = ref([])
const current = ref(1)
const pages = ref(1)

function getShareList(){
  request({
    method: 'GET',
    url: '/share/my',
    params:{'current': current.value}
  }).then( response =>{
    pages.value = response.data.data.pages
    list.value = list.value.concat(response.data.data.records)
  })
}
function load({done}){
  setTimeout(() => {
    if( current.value >= pages.value ){
      done('empty')
    }else {
      current.value++
      getShareList()
      done('ok')
    }
  }, 300)
}

function copyAll(share){
  try {
    let message = "分享链接: http://" + window.location.host+ "/s/" +share.share_link
    console.log(share)
    if(share.password !== null){
      message = message.concat(" 密码:" + share.password)
    }
    toClipboard(message)
    toast.success("复制成功: "+ message)
  } catch (e) {
    console.error(e)
  }
}

function delectShare(id){
  request.get("/share/detect",{ params: {shareId: id}}).then(
    response => {
      if (response.data.code === 200){
        toast.success(response.data.message)
        getShareList()
      }
    }
  )
}
onMounted( () =>{
  getShareList()
})

</script>

<style scoped>
.pwd-chip:hover .show-pwd {
  display: block;
}

.show-pwd {
  display: none;
}

.btn-link{
  opacity: 0.3;
}
.btn-link:hover{
  opacity: 1;
}

</style>
