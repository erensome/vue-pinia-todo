import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'

// Pinia'yı kullanabilmek için createPinia fonksiyonunu çağırıyoruz.
createApp(App).use(createPinia()).mount('#app')
