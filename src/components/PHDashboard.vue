<script>
import { useRouter } from 'vue-router';
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
    const router = useRouter();
    const state = reactive({
      dashboardCards: [
        {
          id: 0,
          title: 'Finance',
          name: 'finance',
          icon: 'AccountBalanceSharp',
          action: () => { router.push('/Finance'); },
        },
        {
          id: 1,
          name: 'fun',
          title: 'Fun',
          icon: 'AutoAwesomeMosaicSharp',
          action: () => { router.push('/Fun'); },
        },
        {
          id: 2,
          title: 'TODO\'s',
          name: 'todo',
          icon: 'ChecklistSharp',
        },
        {
          id: 3,
          title: 'Projects',
          name: 'Projects',
          icon: 'AppsSharp',
        },
        {
          id: 4,
          title: 'Tools',
          name: 'Tools',
          icon: 'BuildSharp',
        },
        { id: 5, title: 'lul', name: 'lul' },
        { id: 6, title: 'lol', name: 'lol' },
      ],
    });

    const navigateToCard = (cardName) => {
      router.push(`/${cardName}`);
    };

    return { ...toRefs(state), navigateToCard };
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
        <n-card class="ma-1" @click="navigateToCard(card.name)">
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

              {{ card.title }} Card
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
