<template>
  <v-container>
    <v-sheet class="d-flex justify-space-between">
      <v-card width="500" max-height="340" flat rounded="xl" color="#f7f7f7" @mouseenter="showBtn = true" @mouseleave="showBtn = false">
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
            <v-chip label size="small">动态数量: {{list.length}}</v-chip>
          </div>
          <div class="mt-2">
            <v-chip label size="small">下载次数: {{History}}</v-chip>
          </div>
        </v-card-text>
        <transition name="fade">
         <v-btn color="#446388" v-if="showBtn" class="mb-2" rounded="xl" flat block="" @click="showUpdate.showComponent">修改用户资料</v-btn>
        </transition>
      </v-card>

      <v-sheet width="600">
        <p class="my-4">我的动态</p>
        <div v-for="post in list" :key="post.post_id">
          <Dynamic class="my-2" :post="post" ></Dynamic>
        </div>
      </v-sheet>
    </v-sheet>

    <v-sheet width="600" v-if="false">
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

    <UpdateUserInfo ref="showUpdate"></UpdateUserInfo>
  </v-container>
</template>
<script setup>
import Dynamic from "@/components/Dynamic.vue";
import {onMounted, ref, provide} from 'vue'
import request from "@/requests/myAxios";
import {store} from "@/store/store";
import UpdateUserInfo from "@/components/UpdateUserInfo.vue";

const showUpdate = ref()

let History = 0;
if (JSON.parse(localStorage.getItem('History')) !== null){
  History = JSON.parse(localStorage.getItem('History')).length
}


const showBtn = ref(false)
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


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
