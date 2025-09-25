import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Force Arabic + RTL for the whole app
document.documentElement.setAttribute('lang', 'ar')
document.documentElement.setAttribute('dir', 'rtl')

const app = createApp(App)
app.use(createPinia()) // <-- must be before router guards run
app.use(router)
app.mount('#app')
