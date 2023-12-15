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
              @click="dialog = false"
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

            <v-file-input prepend-icon="" variant="outlined" label="选择你的新头像">
              <template v-slot:prepend>
                <v-avatar :image="account.avatar"></v-avatar>
              </template>
            </v-file-input>

            <v-text-field v-model="account.userName" variant="outlined">
              <template v-slot:prepend>
                <strong>昵称</strong>
              </template>
            </v-text-field>

            <v-textarea v-model="account.userName" variant="outlined">
              <template v-slot:prepend>
                <strong>简介</strong>
              </template>
            </v-textarea>
          </div>
        <v-divider></v-divider>
<!--        <v-list-->
<!--          lines="two"-->
<!--          subheader-->
<!--        >-->
<!--          <v-list-subheader>General</v-list-subheader>-->

<!--        </v-list>-->
      </v-card>
    </v-dialog>

</template>

<script setup>
import {inject, ref} from 'vue'
import {store} from "@/store/store";

let dialog = inject("dialog")

const account = store.value.account

</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
