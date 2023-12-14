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
          <v-list-item rounded="lg" :value="share">
            <v-row no-gutters align="center">
              <v-col cols="8">
                <div class="d-flex align-center">
                  <v-chip size="small" variant="text" class="text-subtitle-2">{{index}}</v-chip>
                  <v-icon size="30">mdi-file</v-icon>
                  <div class="ml-2">
                    <v-list-item-title class="text-body-2">{{share.file.file_name}}</v-list-item-title>
                    <v-list-item-subtitle class="text-subtitle-2">上传于：{{share.file.upload_time}}</v-list-item-subtitle>
                  </div>
                </div>
              </v-col>
              <v-col cols="4">
                <v-chip color="#8087bd" variant="flat" label size="small">24小时后过期 </v-chip>
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
          <v-alert density="comfortable" rounded="lg" type="info" border="start">没有更多了</v-alert>
        </template>
      </v-infinite-scroll>

    </v-sheet>
  </v-container>
</template>
<script setup>

import {onMounted, ref} from "vue";
import request from "@/requests/myAxios";

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
</style>
