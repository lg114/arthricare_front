//Import Modules
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';
import router from './router';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Varlet from '@varlet/ui';
import '@varlet/ui/es/style';
import '@varlet/ui/es/button/style/index';

const app = createApp(App);
app.component('VueDatePicker', VueDatePicker);
app.use(ElementPlus);
app.use(router);
app.use(Varlet);
app.mount('#app');