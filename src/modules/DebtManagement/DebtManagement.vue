<script>
import DebtTableList from './DebtTableList.vue';

export default {
  name: 'DebtManagement',
  components: { DebtTableList },
};
</script>

<template>
  <div id="debt-management">
    <DebtTableList/>
  </div>
</template>

<style lang="scss">
#debt-management{
  height: 95vh;
}
</style>
