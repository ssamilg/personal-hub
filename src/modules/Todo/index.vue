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
          console.log(state.todos);
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

    const createNewTodo = () => {
      const newTodo = {
        id: 'lel',
        name: 'new todo',
        items: [
          { text: 'item 1', isDone: false },
          { text: 'item 2', isDone: true },
          { text: 'item 3', isDone: true },
          { text: 'item 4', isDone: false },
          { text: 'item 5', isDone: false },
          { text: 'item 6', isDone: true },
          { text: 'item 7', isDone: true },
          { text: 'item 8', isDone: false },
          { text: 'item 9', isDone: true },
          { text: 'item 10', isDone: false },
          { text: 'item 11', isDone: true },
        ],
      };

      newTodo.items = newTodo.items.slice(0, Math.floor(Math.random() * 10));

      state.todos.push(newTodo);
    };

    return {
      ...toRefs(state),
      createNewTodo,
      CheckBoxOutlined,
      CheckBoxOutlineBlankSharp,
    };
  },
};
</script>

<template>
  <div id="todo">
    <div class="ph-row flex-wrap justify-center">
      <div class="ph-col md8" style="border:1px solid #eee;">
        <div class="ph-row">
          <n-button @click="createNewTodo">
            click for new one
          </n-button>
        </div>

        <div class="ph-row flex-wrap my-5 justify-center">
          <template v-for="col in 3" :key="col">
            <div class="ph-col xs12 md4">
              <template v-for="(todoCard, index) in todos" :key="todoCard.id">
                <!-- col: {{ col }}
                card: {{ index + 1 }} -->
                <div v-if="(index + 1) % 3 === col % 3" class="ph-row">
                  <n-card class="ma-1" style="width: 100%">
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
                            <component
                              :is="todoItem.isDone
                              ? 'CheckBoxOutlined' : 'CheckBoxOutlineBlankSharp'"
                            />
                          </n-icon>

                          {{ todoItem.text }}
                        </div>
                      </div>
                    </div>
                  </n-card>
                </div>
              </template>
            </div>
          </template>
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
