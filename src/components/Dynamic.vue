<template>

  <v-card rounded="xl" flat >
    <div class="d-flex px-4 mt-2 align-center">
      <v-avatar :image="props.post.user.avatar"></v-avatar>
      <p class="ml-2 font-weight-bold" style="color: #446388">{{props.post.user.user_name}}</p>
    </div>
    <router-link :to=" '/d/'+ props.post.post_id" class="text-decoration-none">
    <v-card-text class="text-line text-black pt-2">
       {{props.post.post_content}}
    </v-card-text>
    </router-link>
    <v-card-subtitle class="mt-2">
      <v-chip v-if="selectedTag" label size="small" :text="selectedTag.name">
        <template v-slot:prepend>
          <v-icon :color="selectedTag.color" :icon="selectedTag.icon"></v-icon>
        </template>
      </v-chip>
    </v-card-subtitle>
    <div class="px-4 pb-2">

      <v-row justify="space-around">
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-badge :content="props.post.likes_count" color="#d3e5ef" offset-x="-4">
            <v-icon>mdi-thumb-up</v-icon>
          </v-badge>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-badge :content="props.post.comments_count" color="#d3e5ef" offset-x="-4">
            <v-icon>mdi-comment-multiple</v-icon>
          </v-badge>
        </v-col>
        <v-spacer></v-spacer>

        <v-col col="3">
          <v-icon>mdi-share</v-icon>
        </v-col>
      </v-row>
    </div>
  </v-card>

</template>

<style scoped>
.text-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>
<script setup>

import {Tags} from "@/components/tags";
import {onMounted, ref} from "vue";

const props = defineProps({
  post: {type: Object}
})
let selectedTag = ref({})

onMounted( () =>{
  selectedTag.value = Tags.find(tag => tag.value === props.post.type_id)
})


</script>
