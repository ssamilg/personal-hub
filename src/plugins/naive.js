import { createApp } from 'vue';
import {
  create,
  NButton,
} from 'naive-ui';

const naive = create({
  components: [NButton],
});

const app = createApp();
app.use(naive);
