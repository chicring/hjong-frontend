<script setup>
import { inject, ref} from "vue";
import {Tags} from "@/components/tags";

const active = inject("showSend")
const showItems = ref(false)

let selected = ref('')

function handle(tag){
  selected.value = tag
}
</script>

<template>
  <v-dialog v-model="active" width="800" height="500">
    <v-card flat class="h-100" rounded="xl">
      <v-card-text>
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
            <v-chip v-if="selected !== ''" v-model="selected" class="ml-3" density="comfortable" label closable  :text="selected.name">
              <template v-slot:prepend>
                <v-icon :color="selected.color" :icon="selected.icon"></v-icon>
              </template>
            </v-chip>
          </v-col>

          <v-col cols="5">

          </v-col>
          <v-col cols="1">
            <v-btn variant="flat" color="light-blue-darken-1" disabled>发布</v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <v-text-field variant="underlined" placeholder="输入你的标题"></v-text-field>
        <v-textarea placeholder="分享你此刻的想法..." counter variant="underlined" rows="11" no-resize row-height="30">

        </v-textarea>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
