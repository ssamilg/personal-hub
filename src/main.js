import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import naive from './plugins/naive';
import styles from './styles/global.scss';

createApp(App)
  .use(store)
  .use(router)
  .use(naive)
  .use(styles)
  .mount('#app');
