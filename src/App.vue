<script>
import { useStore } from 'vuex';
import { defineComponent } from 'vue';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
// import { darkTheme } from 'naive-ui';

export default defineComponent({
  setup() {
    const auth = getAuth();
    const store = useStore();
    const router = useRouter();
    const userId = localStorage.getItem('user-id');
    store.dispatch('setAuth', auth);

    if (!userId) {
      router.push('/login');
    } else {
      router.push('/');
    }

    // return { darkTheme };
  },
});
</script>

<template>
  <n-config-provider :theme="darkTheme" class="fill-height">
    <n-message-provider placement="bottom-right">
      <router-view/>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  height: 100vh;
  background: rgba(#8DCECC, .5);
  // background: black;

  .align-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .fill-height {
    height: 100%;
  }
}
</style>
