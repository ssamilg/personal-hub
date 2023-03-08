import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import './styles/global.scss';
import './styles/base.css';
import './assets/tailwind.css';
import '@mdi/font/css/materialdesignicons.css';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
