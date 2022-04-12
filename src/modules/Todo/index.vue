<script>
import { useStore } from 'vuex';
import useAlertMessage from '@/mixins/useAlertMessage';
import {
  CheckBoxOutlined,
  CheckBoxOutlineBlankSharp,
} from '@vicons/material';
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

export default {
  name: 'Todo',
  components: {
    CheckBoxOutlined,
    CheckBoxOutlineBlankSharp,
  },
  setup() {
    const store = useStore();
    const { showAlertMessage } = useAlertMessage();
    const state = reactive({
      todos: [],
      isLoading: false,
    });

    const fetchTodos = () => {
      state.isLoading = true;

      const collectionPath = 'todo';
      const params = { collectionPath };

      store.dispatch('fetchAllData', params)
        .then((querySnapshot) => {
          state.todos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        })
        .finally(() => {
          state.isLoading = false;
        });
    };

    onMounted(() => {
      fetchTodos();
    });

    return {
      ...toRefs(state),
      CheckBoxOutlined,
      CheckBoxOutlineBlankSharp,
    };
  },
};
</script>

<template>
  <div id="todo">
    <div class="ph-row flex-wrap justify-center">
      <div class="ph-col md8">
        <div class="ph-row flex-wrap my-5">
          <div
            v-for="todoCard in todos" :key="todoCard.id"
            class="ph-col xs12 md4"
          >
            <n-card class="ma-1">
              <div class="ph-row align-center">
                <!-- <div class="ph-col pr-3">
                  <n-icon size="36">
                    <component :is="card.icon"/>
                  </n-icon>
                </div> -->

                <div class="ph-col">
                  <div class="ph-row pb-1 card-header">
                    {{ todoCard.name }}
                  </div>

                  <div
                    v-for="(todoItem, index) in todoCard.items"
                    :key="index"
                    class="ph-row card-text-item"
                  >
                    <n-icon size="20" color="#5ACEA7" class="mr-1">
                      <CheckBoxOutlined/>
                    </n-icon>

                    {{ todoItem }}
                  </div>

                  <div class="ph-row card-text-item">
                    <n-icon size="20" color="#5ACEA7" class="mr-1">
                      <CheckBoxOutlineBlankSharp/>
                    </n-icon>

                    this todo is not done yet
                  </div>
                </div>
              </div>
            </n-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#todo {
  height: 100%;
  // padding: 40px 40px;

  .n-card {
    width: inherit;
    cursor: pointer;
    transition: transform .3s;

    &:hover {
      transform: scale(1.15);
      z-index: 9;
    }

    .n-card__content {
      .card-header {
        font-weight: 600;
        font-size: 14px;
      }

      .card-text-item {
        font-size: 12px;
      }
    }
  }
}
</style>
