<template>
  <div class="hello">
    <n-row class="justify-center align-center fill-height">
      <n-col :span="4" class="form-card">
        <n-card @click="$router.push('/debtManagement')">
          DEBT MANAGEMENT
        </n-card>
      </n-col>
    </n-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
};
</script>

<style scoped lang="scss">

</style>
