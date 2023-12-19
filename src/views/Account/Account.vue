<script setup>

  import router from "@/router";
  import {store} from "@/store/store";
  import { useToast } from 'vue-toastification'
  import Icon from "@/components/icon/Icon.vue";

  const toast = useToast();
  const items = [
    {
      title: '传输历史',
      value: 1,
      icon: 'mdi-history',
      to: '/account/history'
    },
    {
      title: '我的分享',
      value: 2,
      icon: 'mdi-share-circle',
      to: '/account/share'
    },
    {
      title: '我的',
      value: 3,
      icon: 'mdi-account-circle',
      to: '/account/my'
    }
    ]

  let account = JSON.parse(localStorage.getItem('account'))
  store.value.account = account

  function out(){
    toast.success("登出成功")
    setTimeout(() => {
      router.push('/');
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      store.value.account = {}
    }, 2000);
  }


</script>
<template>

    <v-layout>
      <v-navigation-drawer
        color="#f7f7f7"
        permanent
        floating
      >
        <template v-slot:prepend>
          <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
              <Icon></Icon>
              <span>驼鹿快传</span>
            </div>

            <v-btn color="#f7f7f7" icon="mdi-reply" flat :to="'/'"></v-btn>

          </div>
        </template>

        <v-spacer class="py-15"></v-spacer>
        <v-list color="transparent" v-for="item in items" :key="item.value" density="compact" nav >
          <v-list-item rounded="lg" color="primary" :prepend-icon="item.icon" :title="item.title" :to="item.to" ></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <div class="my-4 d-flex">
              <v-avatar :image="store.account.avatar"></v-avatar>
              <div class="pa-2 w-100">
                <p class="text-subtitle-2">{{store.account.usedSize}}/{{store.account.diskSize}}</p>
                <v-progress-linear
                  height="6"
                  model-value="1"
                  color="#d8bb53"
                  rounded
                ></v-progress-linear>
              </div>
            </div>
            <v-btn block color="#476586" @click="out">
              登出
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main style="height: 400px">
        <router-view></router-view>
      </v-main>
    </v-layout>

</template>
