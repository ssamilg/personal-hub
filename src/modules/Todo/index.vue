<script>
import { useStore } from 'vuex';
import useAlertMessage from '@/mixins/useAlertMessage';
import {
  AddSharp,
  SaveSharp,
  EditSharp,
  PlusSharp,
  MinusSharp,
  CloseSharp,
  CheckBoxOutlined,
  ArrowBackIosSharp,
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
    PlusSharp,
    MinusSharp,
    CloseSharp,
    CheckBoxOutlined,
    ArrowBackIosSharp,
    CheckBoxOutlineBlankSharp,
  },
  setup() {
    const store = useStore();
    const { showAlertMessage } = useAlertMessage();
    const state = reactive({
      todos: [],
      isLoading: false,
      isModalOn: false,
      isCreateMode: false,
      isEditMode: false,
      selectedTodo: null,
      modalCardStyle: {
        height: '50%',
        width: '50%',
      },
      newTodo: {
        id: '0',
        name: 'My Todo',
        items: [{
          text: 'Create a todo !',
          isDone: true,
        }],
      },
      newTodoItem: {
        text: null,
        isDone: false,
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
      state.selectedTodo = state.newTodo;
      state.isModalOn = true;
      state.isCreateMode = true;
      // const newTodo = {
      //   id: 'lel',
      //   name: 'new todo',
      //   items: [
      //     { text: 'item 1', isDone: false },
      //     { text: 'item 2', isDone: true },
      //     { text: 'item 3', isDone: true },
      //     { text: 'item 4', isDone: false },
      //     { text: 'item 5', isDone: false },
      //     { text: 'item 6', isDone: true },
      //     { text: 'item 7', isDone: true },
      //     { text: 'item 8', isDone: false },
      //     { text: 'item 9', isDone: true },
      //     { text: 'item 10', isDone: false },
      //     { text: 'item 11', isDone: true },
      //   ],
      // };

      // newTodo.items = newTodo.items.slice(0, Math.floor(Math.random() * 10));

      // state.todos.push(newTodo);
    };

    const selectTodo = (todo) => {
      state.selectedTodo = todo;
      state.isModalOn = true;
    };

    const addNewTodoItem = () => {
      state.selectedTodo.items.push(state.newTodoItem);

      state.newTodoItem = {
        text: null,
        isDone: false,
      };
    };

    const removeTodoItem = (todoItem) => {
      state.selectedTodo.items.splice(state.selectedTodo.items.indexOf(todoItem), 1);
    };

    return {
      ...toRefs(state),
      selectTodo,
      createNewTodo,
      addNewTodoItem,
      removeTodoItem,
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

                <div class="ph-col md12">
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

                    <div class="ph-col md12">
                      <div class="text-truncate">
                        {{ todoItem.text }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </n-card>
          </div>
        </div>
      </div>
    </div>

    <n-modal
      v-model:show="isModalOn"
      close-on-esc
      :mask-closable="false"
    >
      <n-card
        :style="modalCardStyle"
        class="modal-card"
        size="huge"
        aria-modal="true"
        transform-origin="center"
      >
        <template #header>
          <div class="ph-row align-center">
            <template v-if="isEditMode">
              <div class="ph-col md11">
                <n-input
                  v-model:value="selectedTodo.name"
                  type="text"
                  size="large"
                  placeholder="Name"
                />
              </div>

              <div class="ph-col md1">
                <n-button text type="success" @click="isEditMode = !isEditMode">
                  <n-icon size="20">
                    <SaveSharp/>
                  </n-icon>
                </n-button>
              </div>
            </template>

            <template v-else>
              <div class="ph-col md11">
                {{ selectedTodo.name }}
              </div>

              <div class="ph-col md1">
                <n-button text type="info" @click="isEditMode = !isEditMode">
                  <n-icon size="20">
                    <EditSharp/>
                  </n-icon>
                </n-button>
              </div>
            </template>
          </div>
        </template>

        <!-- <template #header-extra>
        </template> -->

        <div
          v-for="(todoItem, index) in selectedTodo.items"
          :key="index"
          class="ph-row card-text-item"
        >
          <div class="ph-row align-center mb-1">
            <div class="ph-col md1">
              <n-checkbox v-model:checked="todoItem.isDone"/>
            </div>

            <template v-if="isEditMode">
              <div class="ph-col md10">
                <n-input
                  v-model:value="todoItem.text"
                  type="text"
                  size="small"
                  placeholder="Name"
                  :disabled="!isEditMode"
                />
              </div>

              <div class="ph-col md1">
                <n-button text type="error" @click="removeTodoItem(todoItem)">
                  <n-icon size="20">
                    <MinusSharp/>
                  </n-icon>
                </n-button>
              </div>
            </template>

            <template v-else>
              <div class="ph-col md11">
                {{ todoItem.text }}
              </div>
            </template>
          </div>

          <!-- <template v-else>
            <n-checkbox v-model:checked="todoItem.isDone" class="mb-2">
              {{ todoItem.text }}
            </n-checkbox>
          </template> -->
        </div>

        <template #footer>
          <template v-if="isEditMode">
            <div class="ph-row align-center">
              <div class="ph-col md1">
                <n-checkbox v-model:checked="newTodoItem.isDone"/>
              </div>

              <div class="ph-col md10">
                <n-input
                  v-model:value="newTodoItem.text"
                  type="text"
                  size="small"
                  placeholder="Add new todo item..."
                />
              </div>

              <div class="ph-col md1">
                <n-button text type="success" @click="addNewTodoItem">
                  <n-icon size="20">
                    <PlusSharp/>
                  </n-icon>
                </n-button>
              </div>
            </div>
          </template>

          <template v-else-if="isCreateMode">
            <div class="ph-row justify-end">
              <n-button
                type="error"
                class="mr-2"
                ghost
                @click="isModalOn = false; isCreateMode = false"
              >
                <template #icon>
                  <n-icon>
                    <CloseSharp/>
                  </n-icon>
                </template>
                Cancel
              </n-button>

              <n-button type="success" ghost @click="isModalOn = false; isCreateMode = false">
                <template #icon>
                  <n-icon>
                    <SaveSharp/>
                  </n-icon>
                </template>

                Save
              </n-button>
            </div>
          </template>

          <template v-else>
            <div class="ph-row justify-end">
              <n-button type="info" ghost @click="isModalOn = false">
                <template #icon>
                  <n-icon>
                    <ArrowBackIosSharp/>
                  </n-icon>
                </template>

                Back
              </n-button>
            </div>
          </template>
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
