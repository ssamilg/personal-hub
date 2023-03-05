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
    <div class="flex flex-row justify-center items-center h-full">
      <div class="basis-1/3">
        <div class="card w-100 bg-base-300 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Register</h2>
            
            <input v-model="name" type="text" placeholder="Name" class="input input-bordered input-primary w-full mt-2" />
            <input v-model="surname" type="text" placeholder="Surname" class="input input-bordered input-primary w-full" />
            <input v-model="email" type="text" placeholder="E-mail" class="input input-bordered input-primary w-full" />
            <input v-model="password" type="password" placeholder="Password" class="input input-bordered input-primary w-full" />

            <div class="card-actions mt-2">
              <button class="btn btn-primary btn-block" @click="submit">Register</button>
            </div>

            <div class="text-link" @click="$router.push('/Login')">
              Already have an account ? Click to Login.
            </div>
          </div>
        </div>
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
