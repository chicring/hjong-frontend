<!--<script setup>-->
<!--import {ref,inject} from 'vue'-->
<!--import Sendcomment from './Sendcomment.vue'-->
<!--import request from "../../request/axiosInstance.js";-->

<!--const props = defineProps({-->
<!--  comment:Object,     //传入所有评论（一级，二级）-->
<!--})-->

<!--//回复评论组件是否显示-->
<!--const reply = ref(false);-->

<!--//接收评论-->
<!--const comment = ref(props.comment)-->

<!--//发送评论需要的参数-->
<!--let sendComment = ref({-->
<!--  book_id:'',-->
<!--  parent_comment_id:'',-->
<!--  content:'',-->
<!--  level:'',-->
<!--  to_user:'',-->
<!--})-->

<!--//发送评论触发的函数-->
<!--function newsendComment(newcomment){-->
<!--  sendComment.value.book_id = newcomment.book_id-->
<!--  if(newcomment.parent_comment_id == -1){-->
<!--    sendComment.value.parent_comment_id = newcomment.comment_id-->
<!--  }else {-->
<!--    sendComment.value.parent_comment_id = newcomment.parent_comment_id-->
<!--    sendComment.value.to_user = newcomment.username-->
<!--  }-->
<!--  //评论的层级-->
<!--  sendComment.value.level = 2-->
<!--}-->

<!--//刷新子级评论，发送评论后触发-->
<!--const tworefresh = inject("tworefresh")-->

<!--//点击回复滚动到指定回复组件处-->
<!--const scrollToComment = (commentId) => {-->
<!--  const element = document.getElementById(commentId);-->
<!--  if (element) {-->
<!--    element.scrollIntoView({ behavior: 'smooth', block: 'center'});-->
<!--  }-->
<!--}-->

<!--const showIcon = ref(false)-->
<!--const showIcon2 = ref(false)-->

<!--const applyForm = ref(false)-->

<!--const apply = ref({-->
<!--  title: '举报用户或评论',-->
<!--  action: '举报',-->
<!--  content: '',-->
<!--  to_user: '',-->
<!--  to_avatar: '',-->
<!--  to_name: '',-->
<!--  to_content: '',-->
<!--})-->

<!--function sendApply(){-->
<!--  // axios({-->
<!--  //   method: 'POST',-->
<!--  //   url: '/api/action',-->
<!--  //   data: { 'action': apply.value.action , 'content': apply.value.content , "to_user": apply.value.to_user}-->
<!--  // }).then( response =>{-->
<!--  //   applyForm.value = false-->
<!--  //   alert("举报成功")-->
<!--  // })-->

<!--  request({-->
<!--    method: 'POST',-->
<!--    url: '/api/action',-->
<!--    data: { 'action': apply.value.action , 'content': apply.value.content , "to_user": apply.value.to_user}-->
<!--  }).then( response =>{-->
<!--    applyForm.value = false-->
<!--    alert("举报成功")-->
<!--  })-->
<!--}-->
<!--function startapply(comment) {-->
<!--  applyForm.value = true-->
<!--  apply.value.to_user = comment.user_id-->
<!--  apply.value.to_avatar = comment.avatar-->
<!--  apply.value.to_name = comment.username-->
<!--  apply.value.to_content = comment.content-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  &lt;!&ndash; //评论 &ndash;&gt;-->
<!--  <v-container fluid class="d-flex my-0 py-0">-->
<!--    &lt;!&ndash; //评论人的头像 &ndash;&gt;-->

<!--    <v-avatar :image="comment.avatar" class="mt-2"></v-avatar>-->

<!--    <div class="w-100">-->
<!--      <div @mouseenter="showIcon = true" @mouseleave="showIcon = false">-->
<!--        <v-card-title class="text-subtitle-2 text-medium-emphasis my-0 py-0 d-flex">-->
<!--          {{ comment.username }}-->
<!--          &lt;!&ndash; //用户标识 &ndash;&gt;-->
<!--          <v-chip label size="small" class="mt-1 ml-1" color="teal-lighten-2">{{ comment.role }}</v-chip>-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-btn :style="{ opacity: showIcon ? 0.8 : 0 }" variant="text" icon="mdi-dots-vertical" size="30" @click="startapply(comment)">-->

<!--          </v-btn>-->
<!--        </v-card-title>-->

<!--        <v-card-text class="text-body-1 font-weight-medium">-->
<!--          {{ comment.content }}-->
<!--        </v-card-text>-->

<!--        <v-card-subtitle class="mb-2 my-0 py-0">-->
<!--          {{ comment.created_at }}-->
<!--          <v-icon class="ml-3">mdi-thumb-up-outline</v-icon>-->
<!--          <v-icon class="ml-3">mdi-thumb-down-outline</v-icon>-->

<!--          &lt;!&ndash; //传入回复的评论的信息 &ndash;&gt;-->
<!--          <a class="ml-3" @click="newsendComment(comment), reply = !reply ,scrollToComment(comment.comment_id)">回复</a>-->
<!--        </v-card-subtitle>-->
<!--      </div>-->
<!--      &lt;!&ndash; //子级评论 &ndash;&gt;-->
<!--      <v-container fluid class="my-0 py-0">-->
<!--        <v-card flat color="write" rounded="xl" class="w-100" :key="tworefresh">-->
<!--          <div class="d-flex" v-for="commentChildren in comment.children" :key="commentChildren.comment_id" >-->
<!--            <v-avatar :image="commentChildren.avatar" class="mt-2 ml-1"></v-avatar>-->
<!--            <div class="w-100" @mouseenter="showIcon2 = true" @mouseleave="showIcon2 = false">-->

<!--              <v-card-title class="text-subtitle-2 text-medium-emphasis my-0 py-0 d-flex">-->
<!--                {{ commentChildren.username }} <v-chip label size="small" class="mt-1 ml-1" color="teal-lighten-2">{{ commentChildren.role }}</v-chip>-->
<!--                <p v-if="commentChildren.to_user" class="ml-2 text-high-emphasis">回复</p> <p v-if="commentChildren.to_user" class="text-blue ml-1">@{{ commentChildren.to_user }}</p>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn :style="{ opacity: showIcon2 ? 0.8 : 0 }" variant="text" icon="mdi-dots-vertical" size="30" @click="startapply(commentChildren)">-->

<!--                </v-btn>-->
<!--              </v-card-title>-->

<!--              <v-card-text class="text-body-1 font-weight-medium">-->
<!--                {{ commentChildren.content }}-->
<!--              </v-card-text>-->

<!--              <v-card-subtitle class="mb-2 my-0 py-0">-->
<!--                {{ commentChildren.created_at }}-->
<!--                <v-icon class="ml-3">mdi-thumb-up-outline</v-icon>-->
<!--                <v-icon class="ml-3">mdi-thumb-down-outline</v-icon>-->
<!--                <a class="ml-3" @click="newsendComment(commentChildren) ,scrollToComment(comment.comment_id),reply = !reply">回复</a>-->
<!--              </v-card-subtitle>-->

<!--            </div>-->
<!--          </div>-->
<!--        </v-card>-->
<!--      </v-container>-->
<!--    </div>-->
<!--  </v-container>-->

<!--  &lt;!&ndash; //回复评论组件 &ndash;&gt;-->
<!--  <div :id="comment.comment_id">-->
<!--    <Sendcomment v-if="reply" class="mt-2"  :Sendcomment="sendComment"></Sendcomment>-->
<!--  </div>-->

<!--  <v-dialog v-model="applyForm" width="700" persistent transition="dialog-top-transition">-->
<!--    <v-card color="#f1f3f7" rounded="xl">-->
<!--      <v-card-title>{{apply.title}}</v-card-title>-->
<!--      <div class="pa-4">-->
<!--        <v-row>-->
<!--          <v-col cols="2">-->
<!--            <v-text-field variant="outlined" color="blue" bg-color="white" disabled v-model="apply.action" density="compact"></v-text-field>-->
<!--          </v-col>-->
<!--          <v-col cols="10">-->
<!--            &lt;!&ndash;                  <div>&ndash;&gt;-->
<!--            &lt;!&ndash;                    <v-text-field variant="outlined" color="blue" bg-color="white"></v-text-field>&ndash;&gt;-->
<!--            &lt;!&ndash;                  </div>&ndash;&gt;-->
<!--            <div>-->
<!--              <v-chip color="error">举报用户:</v-chip>-->
<!--              <v-chip class="ml-2"> <v-avatar :image="apply.to_avatar" class="mr-2"></v-avatar> {{apply.to_name}}: <span class="text-red-darken-2 ml-2">{{apply.to_content}}</span>  </v-chip>-->

<!--            </div>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-row>-->
<!--          <v-textarea  bg-color="white" variant="outlined" label="举报理由" rounded="xl" v-model="apply.content">-->

<!--          </v-textarea>-->
<!--        </v-row>-->
<!--      </div>-->

<!--      <v-card-actions>-->
<!--        <v-spacer></v-spacer>-->
<!--        <v-btn @click="applyForm = false" variant="plain">取消</v-btn>-->
<!--        <v-btn @click="sendApply">确认申请</v-btn>-->
<!--      </v-card-actions>-->
<!--    </v-card>-->
<!--  </v-dialog>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->
