<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
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
