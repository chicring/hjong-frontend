<script setup>
import {ref} from "vue";
import {Tags} from "@/components/tags";
import request from "@/requests/myAxios";
import { useToast } from 'vue-toastification'

const toast = useToast();
const active = ref(false)
function showComponent() {
  active.value = true;
}

function hideComponent() {
  active.value = false;
}

const showItems = ref(false)
let selected = ref(Tags[7])

const post = ref({
  post_title: '',
  post_content: '',
  type_id: 8
})

const rule = ref({
  value: null,
  post_title: [
    v => !!v || '请输入标题',
    v => (v && v.length > 5) || '标题至少需要5个字符',
    v => (v && v.length < 15) || '标题最多15个字符'
  ],
  post_content: [
    v => !!v || '请输入内容',
    v => (v && v.length > 20) || '内容至少需要20个字符'
  ],
  type_id: [ v => !!v || '请选择话题']
})

function handle(tag){
  selected.value = tag
  post.value.type_id =  selected.value.value
}

function sendPost(){
  request.post('/userPosts/post',post.value)
    .then(response =>{
      if (response.data.code === 200){
        toast.success("发布成功")
        selected = ref(Tags[7])
        active.value = false
      }
    })
}

defineExpose({
  showComponent,
  hideComponent
})

</script>

<template>
  <v-dialog v-model="active" width="800" height="500" transition="dialog-bottom-transition">
    <v-card flat class="h-100" rounded="xl">
      <v-card-text>
        <v-form v-model="rule.value">
        <v-row no-gutters align="center">
          <v-col cols="6">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-chip color="green-lighten-1" @click="showItems=true" v-bind="props">
                  <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                  </template>
                  <template v-slot:default>
                    <p>选择话题</p>
                  </template>
                </v-chip>
              </template>
              <div style="width: 250px ; height: 400px;background-color: transparent; opacity: 0.9; backdrop-filter: blur(5px);" >

                <v-chip class="mx-2 my-2" v-for="tag in Tags" :key="tag.value" label :text="tag.name" @click="handle(tag)">
                      <template v-slot:prepend>
                        <v-icon :color="tag.color" :icon="tag.icon"></v-icon>
                      </template>
                </v-chip>

              </div>

            </v-menu>

            <v-chip v-if="selected !== ''" :key="selected.value" class="ml-3" density="comfortable" label closable  :text="selected.name">
              <template v-slot:prepend>
                <v-icon :color="selected.color" :icon="selected.icon"></v-icon>
              </template>
            </v-chip>
          </v-col>

          <v-col cols="5">

          </v-col>
          <v-col cols="1">
            <v-btn variant="flat" color="light-blue-darken-1" :disabled="!rule.value" @click="sendPost">发布</v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <v-text-field variant="underlined" placeholder="输入你的标题" v-model="post.post_title" :rules="rule.post_title"></v-text-field>
        <v-textarea :rules="rule.post_content" v-model="post.post_content" placeholder="分享你此刻的想法..." counter variant="underlined" rows="11" no-resize row-height="30">

        </v-textarea>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>
