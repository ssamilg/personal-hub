<script>
import { useStore } from 'vuex';

export default {
  name: 'PHNavbar',
  setup() {
    const store = useStore();

    const switchTheme = () => {
      store.dispatch('switchTheme');
    };

    return { switchTheme, store };
  },
};
</script>

<template>
  <div id="ph-navbar">
    <n-row class="align-center justify-end fill-height">
      <n-col :span="3">
        {{ store.state.darkTheme }}
        <n-button @click="switchTheme">switch theme</n-button>
      </n-col>
    </n-row>
  </div>
</template>

<style lang="scss">
#ph-navbar {
  height: 5vh;
  // padding: 4px;

  .n-card {
    height: 5vh;
  }
}
</style>
