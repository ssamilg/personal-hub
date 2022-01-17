<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'Login',
  setup() {
    const state = reactive({
      email: 'giddyup',
      password: '',
    });

    return { ...toRefs(state) };
  },
};
</script>

<template>
  <div id="login-page">
    <n-row class="justify-center align-center fill-height">
      <n-col :span="6">
        <n-card title="Login" class="form-card" size="huge">
          <n-row>
            <n-input v-model="email" type="text" size="large" placeholder="E-mail"/>
          </n-row>
        </n-card>
      </n-col>
    </n-row>
    <div style="border:2px solid red">
      {{ email }}
    </div>
  </div>
</template>

<style lang="scss">
#login-page {
  height: 100%;

  .form-card {
    // max-width: 30%;
  }
}
</style>
