// import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import Vue3Toasity, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

axios.defaults.baseURL='http://127.0.0.1:8000'

const app = createApp(App)

app.config.globalProperties.$http = axios

app.use(router)

app.use(Vue3Toasity, {
    autoClose: 2000,
    closeButton: false,
    hideProgressBar: true,
    position: toast.POSITION.TOP_CENTER,
    theme: toast.THEME.COLORED,
    toastStyle: {
        borderRadius: "12px",
        minHeight: "36px",
    },
})

app.mount('#app')

export let mousePosition = {
    x: 0,
    y: 0,
}
document.addEventListener('mousemove', function(event) {
    mousePosition.x = event.clientX;
    mousePosition.y=event.clientY;
});