<template>
  <v-container class="d-flex justify-space-between">
    <v-sheet width="500">
      <v-card height="310" flat rounded="xl" color="#f7f7f7">
        <div class="d-flex justify-center w-100 mt-3">
          <v-avatar size="80" :image="store.account.avatar"></v-avatar>

        </div>

        <v-card-title class="text-center">{{store.account.userName}}</v-card-title>
        <v-card-subtitle class="text-center">{{store.account.introduction || '暂无简介'}}</v-card-subtitle>
        <v-card-subtitle>邮箱：{{store.account.email}}</v-card-subtitle>
        <v-card-subtitle></v-card-subtitle>
        <v-card-subtitle>注册日期: {{store.account.createTime}}</v-card-subtitle>

        <v-card-text>
          <div>
            <v-chip label size="small">分享次数: 12</v-chip>
          </div>
          <div class="mt-2">
            <v-chip label size="small">下载次数: 242</v-chip>
          </div>
        </v-card-text>
      </v-card>

      <v-sheet>
        <p class="my-4">我的动态</p>
        <div v-for="post in list" :key="post.post_id">
          <Dynamic class="my-2" :post="post" ></Dynamic>
        </div>
      </v-sheet>
    </v-sheet>

    <v-sheet width="600">
      <v-chip>我的收益：2324.9</v-chip>
      <v-chip class="ml-3">待结算的金额：2578</v-chip>
      <v-chip class="ml-3">总共下载次数：300</v-chip>

      <v-infinite-scroll
        class="mt-5 h-100"
        mode="manual"
        @load="load"
      >
        <template v-for="(item, index) in items" :key="item">
          <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
            Item number {{ item }}
          </div>
        </template>
      </v-infinite-scroll>
    </v-sheet>

  </v-container>
</template>
<script setup>
import Dynamic from "@/components/Dynamic.vue";
import {onMounted, ref} from 'vue'
import request from "@/requests/myAxios";
import {store} from "@/store/store";

const items = ref(Array.from({ length: 50 }, (k, v) => v + 1))
function load ({ done }) {
  setTimeout(() => {
    items.value.push(...Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1))
    done('ok')
  }, 1000)
}

const current = ref(1)
const list = ref([])

function getList(){
  request({
    method: 'GET',
    url: '/userPosts/find',
    params: {'current': current.value, 'useId': store.value.account.userId}
  }).then( response => {
    if(response.data.code === 200){
      list.value = response.data.data.list
    }
    console.log(store.value.account.userId)
  })
}
onMounted(() =>{
  getList()
})
</script>
