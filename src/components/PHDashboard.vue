<template>
  <div id="ph-dashboard">
    <div class="ph-row flex-wrap">
      <div
        v-for="i in 22" :key="i"
        class="ph-col xs12 md3"
      >
        <n-card class="ma-1">
          CARD {{ i }}
        </n-card>
      </div>
    </div>

    <n-row class="justify-center align-center fill-height">
      <n-col :span="4">
      </n-col>
    </n-row>
  </div>
</template>

<script>
export default {
  name: 'PHDashboard',
};
</script>

<style lang="scss">
#ph-dashboard {
  height: 100%;

  .n-card {
    width: inherit;
  }
}
</style>
