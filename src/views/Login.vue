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
    <div class="flex flex-row justify-center items-center h-full">
      <div class="basis-1/3">
        <div class="card w-100 bg-base-300 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Login</h2>
            
            <input v-model="email" type="text" placeholder="E-mail" class="input input-bordered input-primary w-full mt-2" />
            <input v-model="password" type="password" placeholder="Password" class="input input-bordered input-primary w-full" />

            <div class="card-actions mt-2">
              <button class="btn btn-primary btn-block" @click="login">Login</button>
            </div>

            <div class="text-link" @click="$router.push('/register')">
              Don't have an account ? Click to Register.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#login-page {
  height: 100%;
}
</style>
