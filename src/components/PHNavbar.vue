<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { defineComponent, computed, watch } from 'vue';

export default defineComponent({
  name: 'PHNavbar',
  setup() {
    const store = useStore();
    const router = useRouter();
    const { currentRoute } = router;
    const logout = () => {
      localStorage.removeItem('user-id');
      localStorage.removeItem('auth-token');
      store.dispatch('logout');
      store.dispatch('setIsLoggedIn', false);
      store.dispatch('setUserId', null);
      router.push('/login');
    };

    const selectedModule = computed(() => {
      return store.state.selectedModule;
    });

    watch(
      () => currentRoute,
      () => {
        if (currentRoute.value.path === '/') {
          store.dispatch('setSelectedModule', { title: 'Dashboard', icon: 'mdi mdi-view-dashboard' });
        }
      },
      { deep: true }
    );

    return {
      logout,
      selectedModule,
    };
  },
});
</script>

<template>
  <div id="ph-navbar" class="bg-base-300">
    <div class="flex flex-row w-full">
      <div class="basis-full">
        <div class="flex flex-row items-center font-bold">
          <div class="basis-auto mr-2">
            <div :class="selectedModule.icon" class="text-2xl"/>
          </div>

          <div class="basis-auto text-xl">
            {{ selectedModule.title }}
          </div>
        </div>
      </div>

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
