<template>

  <div class="d-flex align-center" style="height: 100vh; background: url('/blob-scene-haikei.svg') center/cover no-repeat;">
    <v-window :model-value="step" class="mx-auto">
      <v-window-item :value="1">
        <v-card  rounded="xl" width="360" height="416" flat>
          <v-card-title class="mt-5 text-center font-weight-bold text-h5 text-blue-darken-1">登录到驼鹿快传</v-card-title>
          <div class="pa-4">
            <v-text-field density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" placeholder="输入你的用户名" v-model="login.email"></v-text-field>
            <v-text-field density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" placeholder="输入你的密码" type="password" v-model="login.password"></v-text-field>
          </div>

          <v-card-text class="pt-0">
            <v-row>
              <!--          <v-col cols="6">-->
              <!--            <v-checkbox-->
              <!--              color="secondary"-->
              <!--              label="记住账号"-->
              <!--            ></v-checkbox>-->
              <!--          </v-col>-->
              <!--          <v-col cols="6">-->
              <!--            <a>忘记密码</a>-->
              <!--          </v-col>-->
              <v-col cols="6"><v-btn class="font-weight-medium" rounded="lg" variant="tonal" block color="#0c7792" @click="step = 2">注册</v-btn></v-col>
              <v-col cols="6"><v-btn class="font-weight-medium" rounded="lg" variant="tonal" block color="#006adc" @click="toLogin">登录</v-btn></v-col>
              <v-col cols="12"><v-btn class="font-weight-medium" rounded="lg" variant="tonal" block color="#5746af" :to="'/'">以游客身份浏览</v-btn></v-col>
              <v-col>
                <div class="justify-space-around d-flex">
                  <v-icon size="30" color="#90969c">mdi-wechat</v-icon>
                  <v-icon size="30" color="#90969c">mdi-weather-night</v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-window-item>

      <v-window-item :value="2">
        <v-card rounded="xl" width="360" height="450" flat>
          <v-card-title class="mt-5 text-center font-weight-bold text-h5 text-blue-darken-1">注册</v-card-title>
          <div class="pa-4">
            <v-text-field density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" placeholder="输入你的用户名" v-model="register.userName"></v-text-field>
            <v-text-field density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" placeholder="输入你的邮箱" v-model="register.email"></v-text-field>
            <div class="d-flex">
              <v-text-field density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" placeholder="验证码" v-model="register.code"></v-text-field>
              <v-btn class="ml-2" height="48" flat rounded="lg" color="blue-lighten-4" @click="askCode()">获取验证码</v-btn>
            </div>
            <v-text-field density="comfortable" rounded="lg" flat base-color="#ffffff" bg-color="#f1f3f5" color="blue" variant="outlined" placeholder="输入你的密码" type="password" v-model="register.password"></v-text-field>
          </div>
          <v-card-text class="my-0 py-0">
            <v-row>
              <v-col cols="3">
                <v-btn height="40" block flat class="font-weight-medium" rounded="lg" variant="tonal" color="blue" @click="step = 1">登录</v-btn>
              </v-col>
              <v-col cols="9">
                <v-btn height="40" block flat class="font-weight-medium" rounded="lg" variant="tonal" color="#5746af" @click="toRegister">注册</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </div>

</template>
<script setup>
  import router from "@/router";
  import {ref} from "vue";
  import Cookies from "js-cookie";
  import request from "@/requests/myAxios";

  import { useToast } from 'vue-toastification'
  import Loading1 from "@/components/loading/loading1.vue";

  const toast = useToast();
  const step = ref(1)

  const login = ref({
    'email': '',
    'password': ''
  })
  const register = ref({
    'userName': '',
    'email': '',
    'code': '',
    'password': ''
  })
  function toLogin(){
    request({
      method: 'POST',
      url: '/user/login',
      params: { 'email': login.value.email, 'password': login.value.password}
    }).then( response =>{
      if(response.data.code === 200){
        localStorage.setItem('account', JSON.stringify(response.data.data.user))
        localStorage.setItem('token', response.data.data.token)
        toast.success("登陆成功，马上跳转")
        setTimeout(() => {
          router.push('/');
        }, 300);
      }else {
        toast.error(response.data.message,{
          position: "top-center",
        })
      }
    })
  }
  function askCode(){
    request({
      method: 'GET',
      url: '/user/code',
      params: {'email': register.value.email}
    }).then( response =>{
      if(response.data.code === 200){
        toast.success("获取成功，请到邮箱查看")
      }else {
        toast.error(response.data.message,{
          position: "top-center",
        })

      }
    })
  }
  function toRegister(){
    let data = JSON.stringify(register.value);
    request({
      method: 'POST',
      url: '/user/register',
      headers: {'Content-Type': 'application/json'},
      params: {code: register.value.code},
      data: data
    }).then( response =>{
      if(response.data.code === 200){
        toast.success(response.data.message)

      }else {
        toast.error(response.data.message,{
          position: "top-center",
        })
      }
    })
  }
</script>

