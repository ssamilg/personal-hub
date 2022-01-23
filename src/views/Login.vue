<script>
import { useStore } from 'vuex';
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import useAlertMessage from '@/mixins/useAlertMessage';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const { showAlertMessage } = useAlertMessage();
    const state = reactive({
      email: null,
      password: null,
    });

    const login = () => {
      store.dispatch('login', state)
        .then((response) => {
          store.dispatch('registerUserToLocalStorage', response.user.uid, response.user.accessToken);
          router.push('/');
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        });
    };

    return { ...toRefs(state), login };
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
                <n-space vertical>
                  <n-button type="primary" size="large" @click="login">
                    Login
                  </n-button>

                  <n-button text @click="$router.push('/register')">
                    Don't have an account ? Click to Register.
                  </n-button>
                </n-space>
              </n-row>
            </n-space>
          </n-row>
        </n-card>
      </n-col>
    </n-row>
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
