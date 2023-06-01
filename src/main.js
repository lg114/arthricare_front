//Import Modules
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons'
import router from './router';

//Use Element Plus, Router
createApp(App).use(ElementPlus).use(router).mount('#app');
//Use icons from Element Plus
Object.keys(Icons).forEach(key => {
    App.component(key, Icons[key])
  })