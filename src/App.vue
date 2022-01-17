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
  <n-config-provider :theme="darkTheme" class="fill-height">
    <router-view/>
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
