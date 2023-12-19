// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {store} from "@/store/store";
import { useToast } from 'vue-toastification'
const toast= useToast();

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: '驼鹿快传|首页',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'share',
        name: '逛逛',
        component: () => import('@/views/Dynamic/DynamicList.vue')
      },
      {
        path: 'd/:id',
        name: '动态详情',
        props: true,
        component: () => import('@/views/Dynamic/DynamicDetail.vue')
      },
      {
        path: 's/:id',
        name: '分享详情',
        props: true,
        component: () => import('@/views/ShareDetail.vue')
      }
    ],
  },
  {
    path: '/account',
    component: () => import('@/views/Account/Account.vue'),
    children: [
      {
        path: 'my',
        name: '我的',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Account/MyPage.vue'),
      },
      {
        path: 'share',
        name: '历史分享',
        component: () =>import('@/views/Account/MyShare.vue')
      },
      {
        path: 'history',
        name: '下载记录',
        component: () =>import('@/views/Account/History.vue')
      }
    ],
  },
  {
    path: '/login',
    name: '登陆',
    component: () =>import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.name || '驼鹿快传';
  if(to.path.startsWith('/account') && Object.keys(store.value.account).length === 0) {
    toast.warning("请先登陆")
    router.push("/login")
  } else {
    next();
  }
});

export default router
