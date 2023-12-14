<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-text-field
        bg-color="#f1f2f3"
        flat
        variant="solo-filled"
        density="compact"
        placeholder="搜索动态"
        rounded
        clearable
        v-bind="props"
        v-model="content"
        @update:model-value="search"
      >
        <template v-slot:prepend-inner>
          <v-icon>
            mdi-magnify
          </v-icon>
        </template>
      </v-text-field>
    </template>
    <v-sheet class="w-100" elevation="1" rounded="xl" style="background-color: transparent; backdrop-filter: blur(1px);">
      <v-list>
        <v-list-item v-for="(item,index) in list" :key="item.post_id">
          <v-list-item-title>{{item.post_content}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>

</template>
<script setup>

import {ref} from "vue";
import request from "@/requests/myAxios";

const content = ref('')
const list = ref([])

function search(){
  list.value = []
  const params = {
    'current': 1,
  };
  if (content.value !== '') {
    params.content = content.value;
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
}

</script>
