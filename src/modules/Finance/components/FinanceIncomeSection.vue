<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';
import useAlertMessage from '@/mixins/useAlertMessage';
import { AddSharp } from '@vicons/material';

export default {
  name: 'FinanceIncomeSection',
  components: {
    AddSharp,
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
      newIncomeItem: null,
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

    const fetchIncomeList = () => {
      const params = { collection: `finance/${props.financeCollectionId}/income_list` };

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
      state.newIncomeItem = JSON.parse(JSON.stringify(state.baseIncomeItem));
      state.addIncomeMode = true;
    };

    const cancelAddingIncomeItem = () => {
      state.newIncomeItem = JSON.parse(JSON.stringify(state.baseIncomeItem));
      state.addIncomeMode = false;
    };

    const saveNewIncomeItem = () => {
      const params = {
        collection: `finance/${props.financeCollectionId}/income_list`,
        payload: state.newIncomeItem,
      };

      store.dispatch('addNewData', params)
        .then((res) => {
          console.log(res);
          fetchIncomeList();
          showAlertMessage('success', 'Success !');
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        })
        .finally(() => {
          state.addIncomeMode = false;
        });
    };

    return {
      ...toRefs(state),
      addIncomeItem,
      saveNewIncomeItem,
      cancelAddingIncomeItem,
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
                  <div class="ph-col flex-grow">
                    {{ item.name }}
                  </div>

                  <div class="ph-col">
                    {{ item.amount }}
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

              <n-list-item>
                <n-button type="primary" text @click="addIncomeItem">
                  <n-icon size="24">
                    <AddSharp/>
                  </n-icon>
                </n-button>
              </n-list-item>
            </n-list>
          </div>
        </template>

        <template v-else>
          <div class="ph-col flex-grow">
            <div class="ph-row">
              <n-input v-model:value="newIncomeItem.name" type="text" placeholder="Name"/>
            </div>

            <div class="ph-row mt-2">
              <n-input-number v-model:value="newIncomeItem.amount" placeholder="Amount"/>
            </div>

            <div class="ph-row mt-2">
              <n-input v-model:value="newIncomeItem.currency" type="text" placeholder="Currency"/>
            </div>

            <div class="ph-row mt-2">
              <n-select
                v-model:value="newIncomeItem.period"
                :options="incomePeriods"
                placeholder="Payment Period"
              />
            </div>

            <div class="ph-row mt-4">
              <div class="ph-col flex-grow"/>

              <n-button type="info" ghost class="mr-2" @click="cancelAddingIncomeItem">
                Back
              </n-button>

              <n-button type="success" ghost @click="saveNewIncomeItem">
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
