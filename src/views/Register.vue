<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useAlertMessage from '@/mixins/useAlertMessage';
import {
  toRefs,
  reactive,
} from 'vue';

export default {
  name: 'Register',
  setup() {
    const store = useStore();
    const router = useRouter();
    const { showAlertMessage } = useAlertMessage();
    const state = reactive({
      name: null,
      surname: null,
      email: null,
      password: null,
    });

    const submit = () => {
      store.dispatch('register', state)
        .then((response) => {
          store.dispatch('updateUser', { displayName: `${state.name} ${state.surname}` });
          store.dispatch('registerUserToLocalStorage', response.user.uid, response.user.accessToken);
          router.push('/');
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        });
    };

    return { ...toRefs(state), submit };
  },
};
</script>

<template>
  <div id="register-page">
    <div class="ph-row justify-center align-center fill-height">
      <div class="ph-col xs10 md6 lg3 form-card">
        <n-card title="Register" size="huge">
          <div class="ph-row justify-center align-center fill-height mb-2">
            <n-input v-model:value="name" type="text" size="large" placeholder="Name"/>
          </div>

          <div class="ph-row justify-center align-center fill-height mb-2">
            <n-input v-model:value="surname" type="text" size="large" placeholder="Surname"/>
          </div>

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

          <div class="ph-row fill-block">
            <div class="ph-col flex-grow">
              <n-button type="primary" size="large" @click="submit">
                Register
              </n-button>
            </div>
          </div>

          <div class="ph-row justify-center fill-block mt-2">
            <div class="text-link" @click="$router.push('/Login')">
              Already have an account ? Click to Login.
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#register-page {
  height: 100%;

  .form-card {
    .n-card .n-card-header .n-card-header__main {
      text-align: center;
    }
  }
}
</style>
