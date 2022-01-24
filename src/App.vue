<script>
import { useStore } from 'vuex';
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import PHNavbar from '@/components/PHNavbar.vue';
import { darkTheme } from 'naive-ui';

export default defineComponent({
  components: { PHNavbar },
  setup() {
    const auth = getAuth();
    const store = useStore();
    const router = useRouter();
    const userId = localStorage.getItem('user-id');
    const state = reactive({
      theme: null,
    });

    store.dispatch('setAuth', auth);

    if (!userId) {
      router.push('/login');
    } else {
      router.push('/');
    }

    watch(() => store.state.darkTheme,
      () => {
        if (store.state.darkTheme) {
          state.theme = darkTheme;
        } else {
          state.theme = null;
        }
      });

    return { ...toRefs(state) };
  },
});
</script>

<template>
  <n-config-provider
    :theme="theme"
    class="fill-height"
  >
    <n-message-provider placement="bottom-right">
      <n-layout position="absolute">
        <n-layout-header>
          <PHNavbar/>
        </n-layout-header>

        <n-layout-content>
          <router-view/>
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  // background: rgba(#8DCECC, .5);
  // background: black;

  .n-layout {
    &-header {
      height: 5vh;
      background: rgba(#8DCECC, .7);
    }

    &-content {
      height: 95vh;
      background: rgba(#8DCECC, .5);
    }
  }

  .align-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .fill-height {
    height: 100%;
  }
}
</style>
