<template>
  <v-card flat>
    <v-list v-for="(item,index) in topList" :key="item.share_id">
      <v-list-item :to="'/s/'+item.share_link" rounded="lg">
        <template v-slot:prepend>
          <p class="text-red text-h6">{{index + 1}}</p>
        </template>
        <div class="ml-3">
          <v-list-item-title class="font-weight-black text-medium-emphasis">{{item.file.file_name}}</v-list-item-title>
          <v-list-item-subtitle>
            <v-icon size="15" icon="mdi-eye"></v-icon><span>{{item.views}}</span>
            <v-icon class="ml-1" size="15" icon="mdi-download"></v-icon><span>{{item.download_counts}}</span>
          </v-list-item-subtitle>
        </div>

        <template v-slot:append>
          <v-chip label size="small" >
            <template v-slot:prepend>
              <v-icon :color="getTag(item.file.file_type).color">{{getTag(item.file.file_type).icon}}</v-icon>
            </template>
            {{getTag(item.file.file_type).name}}
          </v-chip>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup>
import request from "@/requests/myAxios";
import {onMounted, ref} from "vue";
import {Types} from "@/components/Type";


const topList = ref([])

function getTag(value){
  return Types.find(type => type.value === value)
}
function getTop10(){
  request.get("/share/top").then( rep =>{
    if (rep.data.code === 200){
      topList.value = rep.data.data.records
    }
  })
}

onMounted( ()=>{
  getTop10()
})
</script>
