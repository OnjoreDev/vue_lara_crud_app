import './assets/main.css'

import { createApp,markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//create pinia variable
const pinia = createPinia();

//add the vue-router to the pinia store as a plugin
pinia.use(({store})=>{
    store.router = markRaw(router)
})
app.use(pinia)
app.use(router)

app.mount('#app')
