<template>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="700"
    >
      <v-card rounded="lg">
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>修改用户资料</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              @click="update()"
            >
              保存
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
          <div class="px-4 my-2">
            <v-text-field v-model="account.email" readonly>
              <template v-slot:prepend>
                <strong>邮箱</strong>
              </template>
            </v-text-field>


            <v-file-input accept="image/png, image/jpeg, image/bmp" @change="handleFileChange" prepend-icon="" variant="outlined" label="选择你的新头像">
              <template v-slot:prepend>
                <v-avatar :image="account.avatar" ></v-avatar>
              </template>
            </v-file-input>

            <v-text-field :placeholder="account.userName" v-model="userInfo.user_name" variant="outlined">
              <template v-slot:prepend>
                <strong>昵称</strong>
              </template>
            </v-text-field>

            <v-textarea :placeholder="account.introduction" v-model="userInfo.introduction" variant="outlined">
              <template v-slot:prepend>
                <strong>简介</strong>
              </template>
            </v-textarea>
          </div>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>

</template>

<script setup>
import {inject, ref} from 'vue'
import {store} from "@/store/store";
import request from "@/requests/myAxios";
import { useToast } from 'vue-toastification'
import axios from "axios";
const toast = useToast();

let dialog = ref(false)

const account = store.value.account

const userInfo = ref({
  user_name: null,
  introduction: null,
  avatar: null
})

const selectedFile = ref(null);

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

function upload() {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", selectedFile.value);

    axios({
      method: 'POST',
      url: 'http://8.130.77.166:3333/api/v1/upload',
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    }).then(response => {
      userInfo.value.avatar = response.data.data.links.url;
      resolve(); // 通过resolve表示Promise执行成功
    }).catch(error => {
      reject(error); // 通过reject表示Promise执行失败
    });
  });
}

async function update(){
  console.log(userInfo.value)
  if(selectedFile.value !== null){
    await upload()
  }
  if(userInfo.value.avatar || userInfo.value.user_name || userInfo.value.introduction){
    request.post('/user/update', userInfo.value).then( response =>
    {
      if (response.data.code === 200){
        toast.success(response.data.message)
        hideComponent()
      }
    })
  }
}

function showComponent() {
  dialog.value = true;
}

function hideComponent() {
  dialog.value = false;
}

defineExpose({
  showComponent,
  hideComponent
})
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
