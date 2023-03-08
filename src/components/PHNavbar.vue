<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PHNavbar',
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('user-id');
      localStorage.removeItem('auth-token');
      store.dispatch('logout');
      store.dispatch('setIsLoggedIn', false);
      store.dispatch('setUserId', null);
      router.push('/login');
    };

    return {
      logout,
    };
  },
});
</script>

<template>
  <div id="ph-navbar" class="bg-base-300">
    <div class="flex flex-row w-full justify-end">
      <div class="basis-auto">
        <button class="btn btn-success btn-square" @click="logout">
          <div class="mdi mdi-logout-variant text-2xl"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#ph-navbar {
  border-bottom: 1px solid hsl(var(--su));
  padding: 8px;
}
</style>
