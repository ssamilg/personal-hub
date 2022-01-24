<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'DebtCalculator',
  setup() {
    const state = reactive({
      monthlyDebtList: [],
    });

    return { ...toRefs(state) };
  },
};
</script>

<template>
  <div id="debt-calculator">
    <n-row class="align-center justify-center fill-height">
      <n-col :span="22" class="debts-card-wrapper">
        <n-card size="large" class="debts-card">
          DEBTSSS
        </n-card>
      </n-col>
    </n-row>
  </div>
</template>

<style lang="scss">
#debt-calculator {
  height: 95vh;

  .debts-card-wrapper {
    height: 90%;

    .debts-card {
      height: 100%;
    }
  }
}
</style>
