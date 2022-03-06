<script>
import { FullscreenSharp } from '@vicons/material';
import { reactive, toRefs } from '@vue/reactivity';

export default {
  name: 'Finance',
  components: {
    FullscreenSharp,
  },
  setup() {
    const state = reactive({
      cards: {},
    });

    const maximizeCard = (elementId) => {
      console.log(elementId);
      // const card = document.getElementById(elementId);
      // console.log(card);
      // card.style.zIndex = 9;
      // card.style.position = 'absolute';
      // card.style.width = '98%';
      // card.style.height = '96%';
    };

    return { ...toRefs(state), maximizeCard };
  },
};
</script>

<template>
  <div id="finance-wrapper">
    <div class="ph-row ph-section">
      <div class="ph-col xs12 md6 pr-1">
        <n-card id="income-card" title="INCOME">
          <template #header-extra>
            <n-icon size="24" @click="maximizeCard('income-card')">
              <FullscreenSharp/>
            </n-icon>
          </template>

          <div class="ph-row fill-height">
            <div class="ph-col xs12 md4 pr-1">
              <div class="pie-placeholder">
                Pie chart
              </div>
            </div>

            <div class="ph-col md8 xs12 pl-1">
              <n-list bordered>
                <n-list-item>
                  <div class="ph-row">
                    <div class="ph-col flex-grow">
                      Salary
                    </div>

                    <div class="ph-col">
                      1000
                    </div>
                  </div>
                </n-list-item>

                <n-list-item>
                  <div class="ph-row">
                    <div class="ph-col flex-grow">
                      Freelance
                    </div>

                    <div class="ph-col">
                      500
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
          </div>
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
  }

  .ph-section {
    height: 50%;

    .n-card {
      height: 100%;
    }
  }
}
</style>
