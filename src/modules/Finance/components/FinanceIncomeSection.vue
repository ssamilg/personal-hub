<script>
import {
  toRefs,
  reactive,
  onMounted,
  computed,
} from 'vue';
import { useStore } from 'vuex';
import useAlertMessage from '@/mixins/useAlertMessage';
import {
  AddSharp,
  SaveSharp,
  EditSharp,
  DeleteSharp,
  ArrowBackIosSharp,
} from '@vicons/material';

export default {
  name: 'FinanceIncomeSection',
  components: {
    AddSharp,
    EditSharp,
    SaveSharp,
    DeleteSharp,
    ArrowBackIosSharp,
  },
  props: {
    financeCollectionId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { showAlertMessage } = useAlertMessage();
    const state = reactive({
      incomeList: [],
      editingIncomeItem: null,
      baseIncomeItem: {
        name: '',
        amount: null,
        currency: '',
        period: null,
      },
      incomePeriods: [
        { value: '1', label: 'One Time' },
        { value: '30', label: 'Monthly' },
        { value: '120', label: 'Quarterly' },
        { value: '365', label: 'Yearly' },
      ],
      addIncomeMode: false,
      isLoading: true, // TODO loading handling should be added
    });

    const collectionPath = `finance/${props.financeCollectionId}/income_list`;

    const fetchIncomeList = () => {
      const params = { collectionPath };

      store.dispatch('fetchAllData', params)
        .then((querySnapshot) => {
          state.incomeList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          console.log(state.incomeList);
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        })
        .finally(() => {
          state.isLoading = false;
        });
    };

    const incomeTotal = computed(() => {
      return state.incomeList
        .map((i) => i.amount)
        .reduce((pre, curr) => pre + curr, 0);
    });

    onMounted(() => {
      fetchIncomeList();
    });

    const addIncomeItem = () => {
      state.editingIncomeItem = JSON.parse(JSON.stringify(state.baseIncomeItem));
      state.addIncomeMode = true;
    };

    const saveIncomeItem = () => {
      const params = {
        ...{ id: state.editingIncomeItem.id },
        collectionPath,
        payload: state.editingIncomeItem,
      };

      store.dispatch(state.editingIncomeItem.id ? 'updateDataById' : 'addNewData', params)
        .then(() => {
          fetchIncomeList();
          showAlertMessage('success', 'Successfully added !');
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        })
        .finally(() => {
          state.addIncomeMode = false;
        });
    };

    const removeIncomeItem = () => {
      // TODO ask for confirmation before delete
      const params = {
        collectionPath,
        id: state.editingIncomeItem.id,
      };

      store.dispatch('deleteDataById', params)
        .then(() => {
          fetchIncomeList();
          showAlertMessage('success', 'Successfully removed !');
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        })
        .finally(() => {
          state.addIncomeMode = false;
        });
    };

    const editIncomeItem = (item) => {
      state.addIncomeMode = true;
      state.editingIncomeItem = item;
    };

    return {
      ...toRefs(state),
      incomeTotal,
      addIncomeItem,
      saveIncomeItem,
      editIncomeItem,
      removeIncomeItem,
    };
  },
};
</script>

<template>
  <div id="finance-income-section">
    <div class="ph-row fill-height">
      <div class="ph-col xs12 md4 pr-1">
        <div class="pie-placeholder">
          Pie chart
        </div>
      </div>

      <template v-if="!addIncomeMode">
        <div class="ph-col md8 xs12 pl-1">
          <n-list bordered>
            <n-list-item
              v-for="item in incomeList"
              :key="item.id"
            >
              <div class="ph-row">
                <div class="ph-col xs6">
                  {{ item.name }}
                </div>

                <div class="ph-col xs2">
                  {{ item.currency }}
                </div>

                <div class="ph-col xs2 text-align-right">
                  {{ item.amount }}
                </div>

                <div class="ph-col xs2">
                  <div class="ph-row">
                    <div class="ph-col flex-grow"/>

                    <div class="ph-col flex-shrink">
                      <n-button text type="info" @click="editIncomeItem(item)">
                        <n-icon size="20">
                          <EditSharp/>
                        </n-icon>
                      </n-button>
                    </div>
                  </div>
                </div>
              </div>
            </n-list-item>

            <n-list-item>
              <div class="ph-row">
                <div class="ph-col xs8">
                  Total
                </div>

                <div class="ph-col text-align-right xs2">
                  {{ incomeTotal }}
                </div>

                <div class="ph-col xs2">
                  <div class="ph-row">
                    <div class="ph-col flex-grow"/>

                    <div class="ph-col flex-shrink">
                      <n-button type="primary" text @click="addIncomeItem">
                        <n-icon size="24">
                          <AddSharp/>
                        </n-icon>
                      </n-button>
                    </div>
                  </div>
                </div>
              </div>
            </n-list-item>
          </n-list>
        </div>
      </template>

      <template v-else>
        <div class="ph-col flex-grow">
          <div class="ph-row">
            <n-input v-model:value="editingIncomeItem.name" type="text" placeholder="Name"/>
          </div>

          <div class="ph-row mt-2">
            <n-input-number v-model:value="editingIncomeItem.amount" placeholder="Amount"/>
          </div>

          <div class="ph-row mt-2">
            <n-input
              v-model:value="editingIncomeItem.currency"
              type="text"
              placeholder="Currency"
            />
          </div>

          <div class="ph-row mt-2">
            <n-select
              v-model:value="editingIncomeItem.period"
              :options="incomePeriods"
              placeholder="Payment Period"
            />
          </div>

          <div class="ph-row mt-4">
            <n-button
              v-if="editingIncomeItem.id"
              type="error"
              ghost
              @click="removeIncomeItem"
            >
              <template #icon>
                <n-icon>
                  <DeleteSharp/>
                </n-icon>
              </template>

              Delete
            </n-button>

            <div class="ph-col flex-grow"/>

            <n-button type="info" ghost class="mr-2" @click="addIncomeMode = false">
              <template #icon>
                <n-icon>
                  <ArrowBackIosSharp/>
                </n-icon>
              </template>

              Back
            </n-button>

            <n-button type="success" ghost @click="saveIncomeItem">
              <template #icon>
                <n-icon>
                  <SaveSharp/>
                </n-icon>
              </template>

              Save
            </n-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
#finance-income-section {
  .n-input-number {
    width: 100%;
  }
}
</style>
