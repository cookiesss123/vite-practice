import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/all.scss'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import CKEditor from '@ckeditor/ckeditor5-vue'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(LoadingPlugin, {
  color: '#0dcaf0'
})
app.use(VueSweetalert2)
app.use(CKEditor)
app.mount('#app')
