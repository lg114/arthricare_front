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
import { MotionPlugin } from '@vueuse/motion'


const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);

app.use(ElementPlus);
app.use(router);
app.use(store); 
app.use(Varlet);
app.use(VueHashCalendar);
app.use(MotionPlugin)
app.mount('#app');