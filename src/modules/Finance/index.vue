<script>
import { useStore } from 'vuex';
import { reactive, toRefs, onMounted } from 'vue';
import { FullscreenSharp } from '@vicons/material';
import useAlertMessage from '@/mixins/useAlertMessage';
import FinanceIncomeSection from './components/FinanceIncomeSection.vue';

export default {
  name: 'Finance',
  components: {
    FullscreenSharp,
    FinanceIncomeSection,
  },
  setup() {
    const store = useStore();
    const { showAlertMessage } = useAlertMessage();
    const state = reactive({
      userFinanceCollection: null,
      isCollectionLoading: false,
      isCardExpanded: false,
      expandedCard: {},
      modalCardStyle: {
        height: '90vh',
        width: '90%',
      },
    });

    const fetchFinanceData = () => {
      state.isCollectionLoading = true;

      const queryParams = {
        collectionPath: 'finance',
        where: {
          key: 'userId',
          operator: '==',
          value: store.state.userId,
        },
      };

      store.dispatch('fetchDataWithQuery', queryParams)
        .then((querySnapshot) => {
          const [data] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          state.userFinanceCollection = data;
        })
        .catch((err) => {
          showAlertMessage('error', err.message);
        })
        .finally(() => {
          state.isCollectionLoading = false;
        });
    };

    onMounted(() => {
      fetchFinanceData();
    });

    const maximizeCard = (card) => {
      console.log(card);
      state.isCardExpanded = true;
      state.expandedCard.title = card;
    };

    return { ...toRefs(state), maximizeCard };
  },
};
</script>

<template>
  <div id="finance-wrapper">
    <template v-if="userFinanceCollection">
      <div class="ph-row ph-section">
        <div class="ph-col xs12 md6 pr-1">
          <n-card title="INCOME">
            <template #header-extra>
              <n-icon size="24" @click="maximizeCard('income-card')">
                <FullscreenSharp/>
              </n-icon>
            </template>

            <FinanceIncomeSection
              :financeCollectionId="userFinanceCollection.id"
            />
          </n-card>
        </div>

        <div class="ph-col xs12 md6 pl-1">
          <n-card title="BALANCE">
            lol
          </n-card>
        </div>
      </div>

      <div class="ph-row ph-section pt-2">
        <div class="ph-col xs12 md12">
          <n-card title="EXPENSE">
            lel
          </n-card>
        </div>
      </div>
    </template>

    <n-modal v-model:show="isCardExpanded">
       <n-card
        :title="expandedCard.title"
        :style="modalCardStyle"
        class="modal-card"
        size="huge"
        aria-modal="true"
        transform-origin="center"
      >
        <template #header-extra>
          Oops!
        </template>

        <FinanceIncomeSection/>

        <template #footer>
          Footer
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<style lang="scss">
#finance-wrapper {
  padding: 12px;
  height: 90vh;

  .pie-placeholder {
    border: 2px solid teal;
    border-radius: 100%;
    width: 180px;
    height: 180px;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
  }

  .modal-card {
    border: 2px solid red;
    height: 90%;
    width: 90%;
  }

  .ph-section {
    height: 50%;

    .n-card {
      height: 100%;

      .n-card__content {
        overflow: auto;
      }
    }
  }
}
</style>
