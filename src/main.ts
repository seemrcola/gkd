import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'

import './assets/index.css'

const app = createApp(App)

setupRouter(app)

app.mount('#app')
