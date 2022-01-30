<script>
import {
  toRefs,
  reactive,
  computed,
  onMounted,
} from 'vue';
import { PlusRound, MinusRound, SaveFilled } from '@vicons/material';
import useAlertMessage from '@/mixins/useAlertMessage';
import { useStore } from 'vuex';

export default {
  name: 'DebtCalculator',
  components: { PlusRound, MinusRound, SaveFilled },
  setup() {
    const store = useStore();
    const { showAlertMessage } = useAlertMessage();
    const state = reactive({
      monthlyDebtList: [],
      debtTableHeaders: [
        { value: 'name', text: 'Debt Name' },
        { value: 'amount', text: 'Debt Amount' },
      ],
      debtItems: [
        { id: '0', name: 'kredit kard', amount: 31 },
        { id: '1', name: 'eraba', amount: 4 },
        { id: '2', name: 'eraba', amount: 4 },
        { id: '3', name: 'eraba', amount: 4 },
        { id: '4', name: 'eraba', amount: 4 },
        { id: '5', name: 'eraba', amount: 4 },
        { id: '6', name: 'eraba', amount: 4 },
        { id: '7', name: 'eraba', amount: 4 },
        { id: '8', name: 'eraba', amount: 4 },
        { id: '9', name: 'eraba', amount: 4 },
        { id: '10', name: 'eraba', amount: 4 },
        { id: '11', name: 'eraba', amount: 4 },
        { id: '12', name: 'eraba', amount: 4 },
      ],
    });
    const currentUser = store.getters.getCurrentUser;

    const fetchDebtData = () => {
      const queryParams = {
        collection: 'debts',
        where: {
          key: 'users',
          operator: 'array-contains',
          value: currentUser.uid.toString(),
        },
      };

      store.dispatch('fetchDataWithQuery', queryParams)
        .then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            store.dispatch('fetchAllData', { collection: `debts/${doc.id}/debt_items` })
              .then((res) => {
                console.log(res);
                res.forEach((item) => {
                  console.log(item.id, ' => ', item.data());
                });
              });

            console.log(doc.id, ' => ', doc.data());
          });
        });
    };

    onMounted(() => {
      fetchDebtData();
    });

    const debtTotal = computed(() => {
      return state.debtItems.map((i) => i.amount).reduce((acc, curr) => acc + curr);
    });

    const removeItem = (id) => {
      state.debtItems = state.debtItems.filter((i) => i.id !== id);
    };

    const addNewItem = () => {
      state.debtItems.push({ id: Number(state.debtItems.slice(-1)[0].id) + 1, name: '', amount: null });
    };

    const validateData = () => {
      let validation = false;

      if (state.debtItems.every((i) => (i.name && i.name !== '' && i.name !== ' ')
        && (i.amount && i.amount !== null && i.amount > 0))) {
        validation = true;
      }

      return validation;
    };

    const saveTable = () => {
      if (validateData()) {
        const params = {
          collection: 'debts',
          payload: {
            debt_items: state.debtItems,
          },
        };

        store.dispatch('addNewData', params);

        console.log(params);
      } else {
        showAlertMessage('warning', 'Please fill all the fields...');
      }
    };

    return {
      ...toRefs(state),
      removeItem,
      addNewItem,
      debtTotal,
      saveTable,
    };
  },
};
</script>

<template>
  <div id="debt-calculator">
    <n-row class="align-center justify-center fill-height">
      <n-col :span="22" class="debts-card-wrapper">
        <n-card size="large" class="debts-card">
          <n-table :single-line="false">
            <thead>
              <tr>
                <th v-for="header in debtTableHeaders" :key="header.value">
                  {{ header.text }}
                </th>

                <th>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in debtItems" :key="item.id" >
                <td>
                  <n-input
                    v-model:value="item.name"
                    placeholder="Debt Name"
                    type="text"
                  />
                </td>

                <td>
                  <n-input-number
                    v-model:value="item.amount"
                    placeholder="Debt Amount"
                  />
                </td>

                <td>
                  <n-row class="justify-center">
                    <n-col :span="12">
                      <n-row class="justify-center">
                        <n-button type="error" strong secondary circle @click="removeItem(item.id)">
                          <template #icon>
                            <n-icon><MinusRound/></n-icon >
                          </template>
                        </n-button>
                      </n-row>
                    </n-col>
                  </n-row>
                </td>
              </tr>

              <tr>
                <td>
                  Total
                </td>
                <td>
                  {{ debtTotal }}
                </td>
                <td>
                  <n-row class="justify-center">
                    <n-button type="success" strong secondary circle @click="addNewItem">
                      <template #icon>
                        <n-icon><PlusRound/></n-icon >
                      </template>
                    </n-button>
                  </n-row>
                </td>
              </tr>
            </tbody>
          </n-table>

          {{ debtItems }}
          <template #action>
            <n-row class="justify-end">
              <n-col :span="2">
                <n-button strong type="success" @click="saveTable">
                  <template #icon>
                    <n-icon><SaveFilled/></n-icon >
                  </template>
                  Save
                </n-button>
              </n-col>
            </n-row>
          </template>
        </n-card>
      </n-col>
    </n-row>
  </div>
</template>

<style lang="scss">
#debt-calculator {
  height: 95vh;

  .debts-card-wrapper {
    height: 90%;

    .debts-card {
      height: 100%;

    }

    .n-card {
      .n-card__content {
        overflow: auto;
      }
    }
  }
}
</style>
