<script>
// import { useStore } from 'vuex';
import PHDashboard from '@/components/PHDashboard.vue';

export default {
  name: 'Home',
  components: {
    PHDashboard,
  },
  setup() {
    // const store = useStore();
  },
};
</script>

<template>
  <div class="home">
    <PHDashboard/>
  </div>
</template>

<style lang="scss">
.home {
  // height: 95vh;
  padding: 24px;
}
</style>
