<script>
import { reactive, toRefs } from '@vue/reactivity';
import {
  AppsSharp,
  BuildSharp,
  ChecklistSharp,
  AccountBalanceSharp,
  AutoAwesomeMosaicSharp,
} from '@vicons/material';

export default {
  name: 'PHDashboard',
  components: {
    AppsSharp,
    BuildSharp,
    ChecklistSharp,
    AccountBalanceSharp,
    AutoAwesomeMosaicSharp,
  },
  setup() {
    const state = reactive({
      dashboardCards: [
        { id: 0, name: 'Finance', icon: 'AccountBalanceSharp' },
        { id: 1, name: 'Entertainment', icon: 'AutoAwesomeMosaicSharp' },
        { id: 2, name: 'TODO\'s', icon: 'ChecklistSharp' },
        { id: 3, name: 'Projects', icon: 'AppsSharp' },
        { id: 4, name: 'Tools', icon: 'BuildSharp' },
        { id: 5, name: 'lul' },
        { id: 6, name: 'lol' },
      ],
    });

    return { ...toRefs(state) };
  },
};
</script>

<template>
  <div id="ph-dashboard">
    <div class="ph-row flex-wrap">
      <div
        v-for="card in dashboardCards" :key="card.id"
        class="ph-col xs12 md3"
      >
        <n-card class="ma-1">
          <div class="ph-row align-center">
            <div class="ph-col pr-3">
              <n-icon size="36">
                <component :is="card.icon"/>
              </n-icon>
            </div>

            <div class="ph-col">
              <div class="ph-row pb-1 card-header">
                CARD {{ card.id }}
              </div>

              {{ card.name }} Card
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/global';

#ph-dashboard {
  height: 100%;

  .n-card {
    width: inherit;
    cursor: pointer;

    &:hover {
      background-color: rgba($naive-teal, .1);
    }

    .n-card__content {
      .card-header {
        border-bottom: 1px solid $dark-border;
      }
    }
  }
}
</style>
