//Import Modules
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';
import router from './router';

//Use Element Plus, Router
createApp(App).use(ElementPlus).use(router).mount('#app');