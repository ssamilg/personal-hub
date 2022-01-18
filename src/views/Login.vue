<script>
import { onMounted, reactive, toRefs } from 'vue';

export default {
  name: 'Login',
  setup() {
    const state = reactive({
      email: null,
      password: null,
    });

    onMounted(() => {
      console.log('mounted');
    });

    return { ...toRefs(state) };
  },
};
</script>

<template>
  <div id="login-page">
    <n-row class="justify-center align-center fill-height">
      <n-col :span="6" class="form-card">
        <n-card title="Login" size="huge">
          <n-row>
            <n-space vertical>
              <n-input v-model:value="email" type="text" size="large" placeholder="E-mail"/>

              <n-input
                v-model:value="password"
                size="large"
                type="password"
                show-password-on="mousedown"
                placeholder="Password"
              />

              <n-row class="justify-center block-btn">
                <n-button type="primary" size="large">
                  Login
                </n-button>
              </n-row>
            </n-space>
          </n-row>
        </n-card>
      </n-col>
    </n-row>
    <div style="border:2px solid red">
      {{ email }} -
      {{ password }}
    </div>
  </div>
</template>

<style lang="scss">
#login-page {
  height: 100%;

  .form-card {
    .n-card .n-card-header .n-card-header__main {
      text-align: center;
    }

    .n-space {
      width: 100%;
    }

    .block-btn {
      .n-button {
        width: 100%;
      }
    }
  }
}
</style>
