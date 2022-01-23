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
    <n-row class="justify-center align-center fill-height">
      <n-col :span="6" class="form-card">
        <n-card title="Register" size="huge">
          <n-row>
            <n-space vertical>
              <n-input v-model:value="name" type="text" size="large" placeholder="Name"/>

              <n-input v-model:value="surname" type="text" size="large" placeholder="Surname"/>

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
                  <n-button type="primary" size="large" @click="submit">
                    Register
                  </n-button>

                  <n-button text @click="$router.push('/Login')">
                    Already have an account ? Click to Login.
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
#register-page {
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
