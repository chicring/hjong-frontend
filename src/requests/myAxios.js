import axios from 'axios'
import { useToast } from 'vue-toastification'
import router from "@/router";
const toast= useToast();

const token = localStorage.getItem('token')

const request= axios.create({
  baseURL: 'http://8.217.183.57:8888',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {

      toast.error("登陆失效，请重新登陆")
      router.push("/")
    }
    return response;
  },
  (error) => {
    toast.warning(error.data.message)
    return Promise.reject(error);
  }
);
export default request
