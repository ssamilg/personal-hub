<script>
import { useStore } from 'vuex';
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import PHNavbar from '@/components/PHNavbar.vue';
import { darkTheme } from 'naive-ui';
import DarkThemeVariables from '@/styles/darkThemeVariables';

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

    onMounted(() => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches && !store.state.darkTheme) {
        store.dispatch('switchTheme');
      }
    });

    store.dispatch('setAuth', auth);

    if (!userId) {
      router.push('/login');
    } else {
      store.dispatch('setIsLoggedIn', true);
    }

    watch(() => store.state.darkTheme,
      () => {
        if (store.state.darkTheme) {
          state.theme = darkTheme;
        } else {
          state.theme = null;
        }
      });

    const isLoggedIn = computed(() => {
      return store.state.isLoggedIn;
    });
    return { ...toRefs(state), isLoggedIn, DarkThemeVariables };
  },
});
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="DarkThemeVariables"
    class="fill-height"
  >
    <n-message-provider placement="top-right">
      <n-layout position="absolute">
        <n-layout-header v-if="isLoggedIn">
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
@use 'styles/global' as global;

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
      // background: rgba(#8DCECC, .7);
    }

    &-content {
      height: 95vh;
      // background: rgba(#8DCECC, .5);
    }
  }
}
</style>
