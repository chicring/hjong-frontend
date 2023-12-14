<template>
  <v-container>
    <v-tabs>
      <v-tab>传输历史</v-tab>
    </v-tabs>

    <v-list>
      <v-list-item>
        <v-row dense align="center">
          <v-col>
            <div class="d-flex align-center">
              <v-icon size="30">mdi-file</v-icon>
              <div class="ml-2">
                <v-list-item-title>夏培玮私密照</v-list-item-title>
                <v-list-item-subtitle class="text-subtitle-2">上传于：2023-1-2</v-list-item-subtitle>
              </div>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-chip color="#8087bd" variant="flat" label size="small">24小时前下载</v-chip>
            <v-chip color="#d3e5ef" variant="flat" class="mx-2" size="small" label>150M</v-chip>
<!--            <v-chip color="#dbeddb" variant="flat" size="small" label></v-chip>-->
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>
<script setup>

</script>
