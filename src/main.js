//Import Modules
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';
import router from './router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Varlet from '@varlet/ui';
import '@varlet/ui/es/style';
import store from './store';
import VueHashCalendar from 'vue3-hash-calendar';
import 'vue3-hash-calendar/es/index.css';
import '@varlet/ui/es/button/style/index';

// Push notification
//import { createApp } from 'vue'
import OneSignalVuePlugin from '@onesignal/onesignal-vue3'

createApp(App).use(OneSignalVuePlugin, {
  appId: '194aa163-81c5-4e4e-aa9f-54a2f03abe05',
}).mount('#app');



const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);

app.use(ElementPlus);
app.use(router);
app.use(store); 
app.use(Varlet);
app.use(VueHashCalendar);

app.mount('#app');