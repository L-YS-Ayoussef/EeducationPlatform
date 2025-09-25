import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

document.documentElement.setAttribute('lang', 'ar')
document.documentElement.setAttribute('dir', 'rtl')

const app = createApp(App)
app.use(router)
app.mount('#app')
