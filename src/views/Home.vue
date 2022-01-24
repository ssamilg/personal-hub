<script>
// import { useStore } from 'vuex';
import Dashboard from '@/components/Dashboard.vue';

export default {
  name: 'Home',
  components: {
    Dashboard,
  },
  setup() {
    // const store = useStore();
  },
};
</script>

<template>
  <div class="home">
    <Dashboard/>
  </div>
</template>

<style lang="scss">
.home {
  height: 95vh;
  padding: 24px;
}
</style>
