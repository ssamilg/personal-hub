<script>
export default {
  name: 'FinanceIncomeSection',
};
</script>

<template>
  <div id="finance-income-section">
    <div class="ph-row fill-height">
      <div class="ph-col xs12 md4 pr-1">
        <div class="pie-placeholder">
          Pie chart
        </div>
      </div>

      <div class="ph-col md8 xs12 pl-1">
        <n-list bordered>
          <n-list-item>
            <div class="ph-row">
              <div class="ph-col flex-grow">
                Salary
              </div>

              <div class="ph-col">
                1000
              </div>
            </div>
          </n-list-item>

          <n-list-item>
            <div class="ph-row">
              <div class="ph-col flex-grow">
                Freelance
              </div>

              <div class="ph-col">
                500
              </div>
            </div>
          </n-list-item>

          <n-list-item>
            <div class="ph-row">
              <div class="ph-col flex-grow">
                Total
              </div>

              <div class="ph-col">
                1500
              </div>
            </div>
          </n-list-item>
        </n-list>
      </div>
    </div>
  </div>
</template>

<style>

</style>
