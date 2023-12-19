<script setup>
import {ref,inject} from "vue";
import request from "@/requests/myAxios";
import useClipboard from 'vue-clipboard3'
import { useToast } from 'vue-toastification'
import EmailNotify from "@/components/EmailNotify.vue";
const toast = useToast();

const DetailShow = inject("DetailShow");

let is_private = ref()
const states = [6, 12, 24, 36, 48]
const files = ref({
  value: '',
  password: '',
  expire_time: 6
})
const rules = [
  value => {
    return !value || !value.length || value[0].size < 100000000 || '文件必须小于100 MB!'
  },
]

let step = ref(1)

let share = ref({
  link: '',
  private: '',
  expireTime: {type: Date},
  pwd: ''
})
function onFileChange(event){
  files.value.value = event.target.files[0]
}
function upload(){
  toast("开始上传，请等待")
  let formData = new FormData()
  formData.append('file',files.value.value)
  if( files.value.password.length === 6){
    formData.append("password",files.value.password)
  }
  formData.append("expire_time",files.value.expire_time)
  request({
    method: 'POST',
    url: '/file/upload-share',
    data: formData,
  }).then( response => {
    let data = response.data
    if(data.code === 200){
      toast.success("上传成功！")
      share.value.link = window.location.href + 's/' + data.data.shareLink
      share.value.private = data.data.isPrivate
      share.value.pwd = data.data.password
      share.value.expireTime = new Date(data.data.expireTime).toLocaleString()
      step.value = 2
    }
  })
}
const { toClipboard } = useClipboard()
function copyAll(){
  try {
    let message = "分享链接:" + share.value.link
    console.log(share.value.pwd)
    if(share.value.pwd !== undefined){
      message = message.concat(" 密码:" + share.value.pwd)
    }
    toClipboard(message)
    toast.info("已复制链接到剪贴版")
  } catch (e) {
    console.error(e)
  }
}

const diglog = ref()

function openEmail(){
  diglog.value.showComponent()
}

</script>

<template>
  <v-dialog v-model="DetailShow" min-width="310" max-width="330">
    <v-window :model-value="step">
      <v-window-item :value="1">
        <v-card rounded="xl">
          <div class="pa-2" style="background: #f8f8f8;">
            <v-row justify="space-between" dense>
              <v-col cols="10"><p>文件传输</p></v-col>
              <v-col cols="2"><v-btn color="#ffd95a" flat size="32" icon="mdi-close" @click="DetailShow = false"></v-btn></v-col>
            </v-row>

            <v-row>

              <v-col>
                <v-file-input rounded="lg"
                              prepend-icon=""
                              density="comfortable"
                              label="选择你的文件"
                              variant="outlined"
                              chips
                              show-size
                              prepend-inner-icon="mdi-upload-outline"
                              center-affix
                              @change="onFileChange"
                              counter hide-input clearable
                              :rules="rules"
                >
                  <template v-slot:selection="{ fileNames }">
                    <template v-for="fileName in fileNames" :key="fileName">
                      <v-chip
                        size="small"
                        label
                        color="primary"
                        class="me-2"
                      >
                        {{ fileName }}
                      </v-chip>
                    </template>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>

          </div>

          <div class="px-2">
            <v-row no-gutters>
              <v-col cols="10" align-self="center"><p>私密分享</p></v-col>
              <v-col cols="2">
                <v-switch
                  flat
                  color="primary"
                  hide-details
                  class="my-0 py-0"
                  v-model="is_private"
                ></v-switch>
              </v-col>
              <v-col cols="12">
                <v-otp-input v-show="is_private" length="6" type="text" class="my-0 py-0" v-model="files.password"></v-otp-input>
              </v-col>
              <v-col cols="9" align-self="center"><p>有效期(小时)</p></v-col>
              <v-col cols="3">
                <v-select
                  density="comfortable"
                  v-model="files.expire_time"
                  :items=states
                  variant="underlined"
                ></v-select>
              </v-col>
            </v-row>

            <v-btn block color="#ffd95a" flat rounded class="my-3" @click="upload">开始上传</v-btn>
          </div>
        </v-card>
      </v-window-item>

      <v-window-item :value="2">
        <v-card rounded="xl">
          <v-card-text>
            <div>
              <div class="justify-center d-flex">
                <v-icon size="100" color="success">mdi-checkbox-marked-circle</v-icon>
              </div>
              <div class="text-center text-body-1 font-weight-bold">
                <span>已完成</span>
                <v-row no-gutters justify="center">
                  <v-btn variant="plain" rounded="xl" @click="openEmail">发送邮箱通知对方</v-btn>
                </v-row>
              </div>
            </div>

            <p class="my-3 text-body-1 font-weight-bold">链接分享</p>

            <div>
              <v-row>
                <v-col cols="12">
                  <v-chip label size="small" color="success">分享链接:</v-chip>
                  <span class="text-subtitle-2 ml-2" >{{share.link}}</span>
                </v-col>

                <v-col cols="12" v-if="share.private">
                  <v-chip label size="small" color="blue">分享码:</v-chip>
                  <span class="text-subtitle-2 ml-2">{{share.pwd}}</span>
                </v-col>

                <v-col cols="12">
                  <v-chip label size="small" color="#7db7fa">过期时间:</v-chip>
                  <span class="text-subtitle-2 ml-2">{{share.expireTime}}</span>
                </v-col>
              </v-row>
            </div>

            <v-row>
              <v-col cols="8">
                <v-btn rounded block @click="copyAll" variant="flat" color="#446388">一键复制</v-btn>
              </v-col>

              <v-col cols="4">
                <v-btn rounded @click="step = 1" variant="tonal" color="#6eb0fb">再传一次</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-dialog>

  <EmailNotify ref="diglog" :link="share.link"></EmailNotify>
</template>
