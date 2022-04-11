<script>
import {
  CheckBoxOutlined,
  CheckBoxOutlineBlankSharp,
} from '@vicons/material';

export default {
  name: 'Todo',
  components: {
    CheckBoxOutlined,
    CheckBoxOutlineBlankSharp,
  },
  setup() {
    return {
      CheckBoxOutlined,
      CheckBoxOutlineBlankSharp,
    };
  },
};
</script>

<template>
  <div id="todo">
    <div class="ph-row flex-wrap justify-center">
      <div class="ph-col md8">
        <div class="ph-row flex-wrap my-5">
          <div
            v-for="(card, index) in 15" :key="index"
            class="ph-col xs12 md4"
          >
            <n-card class="ma-1">
              <div class="ph-row align-center">
                <!-- <div class="ph-col pr-3">
                  <n-icon size="36">
                    <component :is="card.icon"/>
                  </n-icon>
                </div> -->

                <div class="ph-col">
                  <div class="ph-row pb-1 card-header">
                    todo {{ index }}
                  </div>

                  <div class="ph-row card-text-item">
                    <n-icon size="20" color="#5ACEA7" class="mr-1">
                      <CheckBoxOutlined/>
                    </n-icon>

                    {{ index }} lel
                  </div>

                  <div class="ph-row card-text-item">
                    <n-icon size="20" color="#5ACEA7" class="mr-1">
                      <CheckBoxOutlineBlankSharp/>
                    </n-icon>

                    {{ index }} lel
                  </div>

                  <div class="ph-row card-text-item">
                    <n-icon size="20" color="#5ACEA7" class="mr-1">
                      <CheckBoxOutlineBlankSharp/>
                    </n-icon>

                    {{ index }} lel
                  </div>

                  <div class="ph-row card-text-item">
                    <n-icon size="20" color="#5ACEA7" class="mr-1">
                      <CheckBoxOutlined/>
                    </n-icon>

                    {{ index }} lel
                  </div>
                </div>
              </div>
            </n-card>
          </div>
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
