<script>
import { useStore } from 'vuex';
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from 'vue';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import PHNavbar from '@/components/PHNavbar.vue';

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
      store.dispatch('setUserId', userId);
    }

    const isLoggedIn = computed(() => {
      return store.state.isLoggedIn;
    });
    return { ...toRefs(state), isLoggedIn };
  },
});
</script>

<template>
  <div>
    <PHNavbar v-if="isLoggedIn"/>
    <router-view/>
  </div>
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
      // background: rgba(#8DCECC, .7);
    }

    &-content {
      height: 95vh;
      // background: rgba(#8DCECC, .5);
    }
  }
}
</style>
