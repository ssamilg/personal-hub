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
    <div class="ph-row justify-center align-center fill-height">
      <div class="ph-col xs10 md6 lg4 form-card">
          <n-card title="Login" size="huge">
            <div class="ph-row justify-center align-center fill-height mb-2">
              <n-input v-model:value="email" type="text" size="large" placeholder="E-mail"/>
            </div>

            <div class="ph-row justify-center align-center fill-height mb-2">
              <n-input
                v-model:value="password"
                size="large"
                type="password"
                show-password-on="mousedown"
                placeholder="Password"
              />
            </div>

            <div class="ph-row justify-center fill-block block-btn">
              <div class="ph-col flex-grow">
                <n-button type="primary" size="large" @click="login">
                  Login
                </n-button>
              </div>
            </div>

            <div class="ph-row justify-center fill-block block-btn mt-2">
              <div class="text-link" @click="$router.push('/register')">
                Don't have an account ? Click to Register.
              </div>
            </div>
          </n-card>
      </div>
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
  }

  .text-link {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    transition: text-decoration 5s;
  }
}
</style>
