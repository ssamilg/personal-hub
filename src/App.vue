<script>
import { useStore } from 'vuex';
import { computed, defineComponent, onMounted, onRenderTracked } from 'vue';
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

    store.dispatch('setAuth', auth);

    if (!userId) {
      router.push('/login');
    } else {
      store.dispatch('setIsLoggedIn', true);
      store.dispatch('setUserId', userId);
    }

    // onMounted(() => {
    //   console.log('mounted');
    //   store.dispatch('setSelectedModule', { title: 'Dashboard', icon: 'mdi mdi-view-dashboard' });
    // });

    const isLoggedIn = computed(() => {
      return store.state.isLoggedIn;
    });
    return { isLoggedIn };
  },
});
</script>

<template>
  <div class="h-full">
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
}
</style>
