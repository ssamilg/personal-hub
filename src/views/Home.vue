<script>
// import { useStore } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    // const store = useStore();
  },
};
</script>

<template>
  <div class="home">
    <HelloWorld/>
  </div>
</template>

<style lang="scss">
.home {
  padding: 24px;
}
</style>
