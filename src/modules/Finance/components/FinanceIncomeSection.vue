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
      incomeList: [
        {
          id: 0,
          name: 'Salary',
          amount: 1000,
          currency: 'USD',
          period: 0,
        },
      ],
      incomePeriods: [
        { id: 0, name: 'Monthly' },
        { id: 1, name: 'Quarterly' },
        { id: 2, name: 'Yearly' },
      ],
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

    };

    return { ...toRefs(state), addIncomeItem };
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
    </div>
  </div>
</template>

<style>

</style>
