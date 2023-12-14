<template>
  <v-card rounded="xl" flat>
    <v-list v-for="index in 5" :key="index">
      <v-list-item>
        <template v-slot:prepend>
          <p class="text-red text-h6">{{index}}</p>
        </template>
        <div class="ml-3">
          <v-list-item-title class="font-weight-bold">测试</v-list-item-title>
          <v-list-item-subtitle>
            <v-icon size="15" icon="mdi-eye"></v-icon><span>12</span>
            <v-icon class="ml-1" size="15" icon="mdi-download"></v-icon><span>23</span>
          </v-list-item-subtitle>
        </div>

        <template v-slot:append>
          <v-chip label color="green" size="small">
            <template v-slot:prepend>
              <v-icon>mdi-android</v-icon>
            </template>
            软件
          </v-chip>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup>
</script>
