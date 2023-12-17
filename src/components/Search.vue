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
        <v-list-item rounded="xl" v-for="(item,index) in list" :key="item.post_id" :to=" '/d/'+ item.post_id">
          <v-list-item-title><strong>{{item.post_title}}</strong></v-list-item-title>
          <template v-slot:prepend>
            <v-avatar :image="item.user.avatar"></v-avatar>
<!--            <span class="ml-2">{{item.user.user_name}}: </span>-->
          </template>
          <template v-slot:append>
            <v-chip size="small" label :text="findTag(item.type_id)?.name">
              <template v-slot:prepend>
                <v-icon :color="findTag(item.type_id)?.color" :icon="findTag(item.type_id)?.icon"></v-icon>
              </template>
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>

</template>
<script setup>

import {ref} from "vue";
import request from "@/requests/myAxios";
import {Tags} from "@/components/tags";

const content = ref('')
const list = ref([])

function search(){
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
        list.value = []
        list.value = list.value.concat(response.data.data.list)
      }
    })
  }
}

function findTag(typeId){
  return Tags.find(tag => tag.value === typeId)
}
</script>
