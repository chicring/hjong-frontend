/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css'

const app = createApp(App)

registerPlugins(app)
//通知插件
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  timeout: 4000,
  maxToasts: 15,
  newestOnTop: true,
});
app.mount('#app')
