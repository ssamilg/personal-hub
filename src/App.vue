<script>
import { defineComponent } from 'vue';
// import { darkTheme } from 'naive-ui';

export default defineComponent({
  setup() {
    // return { darkTheme };
  },
});
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <router-view/>
  </n-config-provider>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
