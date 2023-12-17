<template>
  <v-app-bar flat style="background-color: #fafafc;">
    <template v-slot:prepend>
      <v-app-bar-title>
        <div class="d-flex align-center">
          <Icon></Icon>
          <span>驼鹿快传</span>
        </div>
      </v-app-bar-title>
    </template>

    <div class="w-100 d-flex justify-end pr-sm-15">

      <v-btn-toggle  variant="text">
        <v-btn class="font-weight-medium" :to="'/'">首页</v-btn>
        <v-btn class="font-weight-medium" :to="'/share'">逛逛</v-btn>
      </v-btn-toggle>

      <div class="mx-3">
        <v-btn v-show="store.account === null" class="font-weight-bold" rounded="xl" height="48" variant="flat" color="#446388" :to="'/login'" >登录/注册</v-btn>
      </div>

      <v-btn-toggle
        rounded="xl"
        class="mr-3"
        v-show="store.account !== null"
      >

        <v-btn :to="'/account/history'">历史</v-btn>

        <v-btn :to=" '/account/my'" >我的</v-btn>
      </v-btn-toggle>

      <v-avatar v-if="store.account !== null" :image="store.account.avatar"></v-avatar>

    </div>
  </v-app-bar>
</template>

<script setup>
import {store} from "@/store/store";
import MooseIcon from "@/components/icon/MooseIcon.vue";
import Icon from "@/components/icon/Icon.vue";

let account = JSON.parse(localStorage.getItem('account'))
store.value.account = account


</script>
