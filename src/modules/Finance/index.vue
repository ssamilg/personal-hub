<script>
import { reactive, toRefs } from '@vue/reactivity';
import { FullscreenSharp } from '@vicons/material';
import FinanceIncomeSection from './components/FinanceIncomeSection.vue';

export default {
  name: 'Finance',
  components: {
    FullscreenSharp,
    FinanceIncomeSection,
  },
  setup() {
    const state = reactive({
      isCardExpanded: false,
      expandedCard: {},
      modalCardStyle: {
        height: '90vh',
        width: '90%',
      },
    });

    const maximizeCard = (card) => {
      console.log(card);
      state.isCardExpanded = true;
      state.expandedCard.title = card;
    };

    return { ...toRefs(state), maximizeCard };
  },
};
</script>

<template>
  <div id="finance-wrapper">
    <div class="ph-row ph-section">
      <div class="ph-col xs12 md6 pr-1">
        <n-card title="INCOME">
          <template #header-extra>
            <n-icon size="24" @click="maximizeCard('income-card')">
              <FullscreenSharp/>
            </n-icon>
          </template>

          <FinanceIncomeSection/>
        </n-card>
      </div>

      <div class="ph-col xs12 md6 pl-1">
        <n-card title="BALANCE">
          lol
        </n-card>
      </div>
    </div>

    <div class="ph-row ph-section pt-2">
      <div class="ph-col xs12 md12">
        <n-card title="EXPENSE">
          lel
        </n-card>
      </div>
    </div>

    <n-modal v-model:show="isCardExpanded">
       <n-card
        :title="expandedCard.title"
        :style="modalCardStyle"
        class="modal-card"
        size="huge"
        aria-modal="true"
        transform-origin="center"
      >
        <template #header-extra>
          Oops!
        </template>

        <FinanceIncomeSection/>

        <template #footer>
          Footer
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<style lang="scss">
#finance-wrapper {
  padding: 12px;
  height: 90vh;

  .pie-placeholder {
    border: 2px solid teal;
    border-radius: 100%;
    width: 180px;
    height: 180px;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-card {
    border: 2px solid red;
    height: 90%;
    width: 90%;
  }

  .ph-section {
    height: 50%;

    .n-card {
      height: 100%;
    }
  }
}
</style>
