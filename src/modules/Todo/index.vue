<script>
import { useStore } from 'vuex';
import useAlertMessage from '@/mixins/useAlertMessage';
import {
  AddSharp,
  SaveSharp,
  EditSharp,
  DeleteSharp,
  CheckBoxOutlined,
  CheckBoxOutlineBlankSharp,
} from '@vicons/material';
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

export default {
  name: 'Todo',
  components: {
    AddSharp,
    SaveSharp,
    EditSharp,
    DeleteSharp,
    CheckBoxOutlined,
    CheckBoxOutlineBlankSharp,
  },
  setup() {
    const store = useStore();
    const { showAlertMessage } = useAlertMessage();
    const state = reactive({
      todos: [],
      isLoading: false,
      isModalOn: false,
      selectedTodo: null,
      modalCardStyle: {
        height: '50%',
        width: '50%',
      },
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

    const selectTodo = (todo) => {
      state.selectedTodo = todo;
      state.isModalOn = true;
    };

    return {
      ...toRefs(state),
      selectTodo,
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
          <div
            v-for="todoCard in todos" :key="todoCard.id"
            class="ph-col xs12 md4"
          >
            <n-card class="ma-1 fill-height" @click="selectTodo(todoCard)">
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
        </div>
      </div>
    </div>

    <n-modal v-model:show="isModalOn">
      <n-card
        :title="selectedTodo.name"
        :style="modalCardStyle"
        class="modal-card"
        size="huge"
        aria-modal="true"
        transform-origin="center"
      >
        <template #header-extra>
          <n-button text type="info">
            <n-icon size="20">
              <EditSharp/>
            </n-icon>
          </n-button>
        </template>

        <div
          v-for="(todoItem, index) in selectedTodo.items"
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

        <template #footer>
          Footer
        </template>
      </n-card>
    </n-modal>
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
