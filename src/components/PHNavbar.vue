<script>
import { useStore } from 'vuex';
import { DarkModeFilled, DarkModeOutlined } from '@vicons/material';
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
} from 'vue';

export default defineComponent({
  name: 'PHNavbar',
  components: {
    DarkModeFilled,
    DarkModeOutlined,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      navbarItems: [
        { title: 'LOGO' },
        { title: 'Navbar Cell 1' },
        { title: 'Navbar Cell 2' },
        { title: 'Navbar Cell 3' },
        { title: 'Navbar Cell 4' },
      ],
    });

    const darkTheme = computed(() => {
      return store.state.darkTheme;
    });

    const switchTheme = () => {
      store.dispatch('switchTheme');
    };

    return {
      switchTheme,
      darkTheme,
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <div id="ph-navbar">
    <n-grid
      cols="6 s:6 m:6 l:6 xl:6 2xl:6"
      class="fill-height"
      responsive="screen"
      :collapsed="true"
      :collapsed-rows="2"
    >
      <n-grid-item
        v-for="(item, index) in navbarItems"
        :key="index"
      >
        <div class="ph-row justify-center align-center fill-height">
          {{ item.title }}
        </div>
      </n-grid-item>

      <n-grid-item>
        <div class="ph-row justify-end align-center fill-height">
          <n-button strong secondary size="small" @click="switchTheme">
            <template #icon>
              <n-icon>
                <DarkModeFilled v-if="darkTheme"/>
                <DarkModeOutlined v-else/>
              </n-icon>
            </template>
          </n-button>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style lang="scss">
#ph-navbar {
  height: 5vh;
  padding-right: 6px;

  .n-card {
    height: 5vh;
  }
}
</style>
