<template>
  <v-container class="w-100 d-flex justify-space-between" style="position: relative">
    <v-sheet width="800" color="#fafafc">
      <Search></Search>
      <v-infinite-scroll
          class="h-100"
          @load="load"
          color="secondary"
      >
        <template v-for="post in list" :key="post.post_id">
          <Dynamic class="my-2" :post="post"></Dynamic>
        </template>
        <template v-slot:empty>
          <v-alert density="comfortable" rounded="lg" type="info" border="start">没有更多了</v-alert>
        </template>
      </v-infinite-scroll>

    </v-sheet>
    <v-sheet class="fixed-sheet" width="335" max-height="600" rounded="xl">
      <div class="pa-3">
        <v-btn class="my-3" width="250" flat block rounded="lg" color="#4d698e" @click="showSend = !showSend">发布动态</v-btn>

        <v-chip prepend-icon="mdi-forum" label color="success" >主题</v-chip>
        <div>
          <v-chip-group
            selected-class="text-primary"
            mandatory
            variant="text"
            class="ml-4"
          >
            <v-chip
              v-for="tag in tags"
              :key="tag.name"
              @click="handleChipClick(tag)"
            >
              <template v-slot:prepend>
                <v-icon :color="tag.color" :icon="tag.icon"></v-icon>
              </template>
              {{ tag.name }}
            </v-chip>
          </v-chip-group>

        </div>

        <div class="mt-4">
          <v-chip prepend-icon="mdi-fire" label color="red">热门</v-chip>
          <RankingList></RankingList>
        </div>
      </div>
    </v-sheet>

    <send-post v-if="showSend"></send-post>
  </v-container>
</template>
<script setup>
import Dynamic from "@/components/Dynamic.vue";
import Search from "@/components/Search.vue";
import RankingList from "@/components/RankingList.vue";
import {onMounted, ref, provide} from "vue";
import request from "@/requests/myAxios";
import SendPost from "@/components/sendPost.vue";
import { Tags } from "@/components/tags"

const tags = Tags

const current = ref(1)
const list = ref([])
const showSend = ref(false)
provide("showSend",showSend)

const selectTag = ref('')
function getList(){
  const params = {
    'current': current.value,
  };
  if (selectTag.value !== '') {
    params.type = selectTag.value.value;
  }
  request({
    method: 'GET',
    url: '/userPosts/find',
    params: params
  }).then( response => {
    if(response.data.code === 200){
      list.value = list.value.concat(response.data.data.list)
    }
  })
}

function load({done}){
  current.value++
  if( current.value * 20 > list.value.length){
    done('empty')
  }else {
    getList()
    done('ok')
  }
}

function handleChipClick(tag) {
  if(selectTag.value?.value === tag.value){
    selectTag.value = ''
  }else {
    selectTag.value = tag
  }
  list.value = []
  current.value = 1
  getList()
}


onMounted(() =>{
  getList()
})
</script>


<style scoped>
.fixed-sheet {
  position: fixed;
  top: 70px;
  right: 200px;

}
</style>
