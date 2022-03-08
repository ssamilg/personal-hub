<script>
import {
  toRefs,
  reactive,
  onMounted,
} from 'vue';
import { useStore } from 'vuex';
import useAlertMessage from '@/mixins/useAlertMessage';
import { AddSharp, CloseSharp, EditSharp } from '@vicons/material';

export default {
  name: 'FinanceIncomeSection',
  components: {
    AddSharp,
    EditSharp,
    CloseSharp,
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
          state.isCollectionLoading = false;
        });
    };

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

    const removeIncomeItem = (incomeItem) => {
      const params = {
        collectionPath,
        id: incomeItem.id,
      };

      store.dispatch('deleteDataById', params)
        .then(() => {
          fetchIncomeList();
          showAlertMessage('success', 'Successfully removed !');
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        });
    };

    const editIncomeItem = (item) => {
      state.addIncomeMode = true;
      state.editingIncomeItem = item;
    };

    return {
      ...toRefs(state),
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
              <n-list-item>
                <div class="ph-row align-center">
                  <n-button type="primary" text @click="addIncomeItem">
                    <n-icon size="24">
                      <AddSharp/>
                    </n-icon>
                  </n-button>
                </div>
              </n-list-item>

              <n-list-item
                v-for="item in incomeList"
                :key="item.id"
                class="income-list-item"
              >
                <div class="ph-row">
                  <div class="ph-col flex-grow">
                    {{ item.name }}
                  </div>

                  <div class="ph-col xs2 income-list-item-currency">
                    {{ item.currency }}
                  </div>

                  <div class="ph-col xs2 text-align-right income-list-item-amount">
                    {{ item.amount }}
                  </div>

                  <div class="ph-col xs4 income-list-item-actions">
                    <div class="ph-row">
                      <div class="ph-col xs6">
                        <n-button text type="info" @click="editIncomeItem(item)">
                          <n-icon size="24">
                            <EditSharp/>
                          </n-icon>
                        </n-button>
                      </div>

                      <div class="ph-col flex-grow"/>

                      <div class="ph-col xs2">
                        <n-button text type="error" @click="removeIncomeItem(item)">
                          <n-icon size="24">
                            <CloseSharp/>
                          </n-icon>
                        </n-button>
                      </div>
                    </div>
                  </div>
                </div>
              </n-list-item>

              <n-list-item>
                <div class="ph-row">
                  <div class="ph-col flex-grow">
                    Total
                  </div>

                  <div class="ph-col">
                    1500
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
              <div class="ph-col flex-grow"/>

              <n-button type="info" ghost class="mr-2" @click="addIncomeMode = false">
                Back
              </n-button>

              <n-button type="success" ghost @click="saveIncomeItem">
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

  .income-list-item {
    &-actions {
      display: none;
    }

    &:hover {
      .income-list-item-currency, .income-list-item-amount {
        display: none;
      }

      .income-list-item-actions {
        display: block;
      }
    }
  }
}
</style>
