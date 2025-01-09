// framework - Vue
import { createApp } from 'vue';

// router - Vue-Router
import router from './router';

// store - Pinia
import { createPinia } from 'pinia';
const pinia = createPinia();
import store from './stores/store';

// api
import api from './api/api';

// ui - Varlet
// becase of auto-import, we don't need to import Varlet here
// import Varlet from '@varlet/ui';
// import '@varlet/ui/es/style';
import '@varlet/touch-emulator';
// fonts - DouyinSans
import '@chinese-fonts/dymh/dist/DouyinSansBold/result.css';

// App Entry
import App from '@/App.vue';

// global styles
import '@/style.css';

const app = createApp(App).use(router).use(pinia).use(store).use(api).mount('#app');
