<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from 'vue';

export default {
  name: 'PHDashboard',
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      dashboardCards: [
        {
          id: 0,
          title: 'Books',
          route: 'books',
          description: 'Manage your books',
          icon: 'mdi mdi-book-open-page-variant',
          action: () => { router.push('/books'); },
        },
        {
          id: 1,
          title: 'TODO\'s',
          route: 'todo',
          description: 'Todo list manager for your daily tasks',
          icon: 'mdi mdi-checkbox-marked-circle-outline',
        },
      ],
    });
    onMounted(() => {
      // navigateToCard('books');
    });

    const navigateToCard = (card) => {
      store.dispatch('setSelectedModule', { title: card.title, icon: card.icon });
      router.push(`/${card.route}`);
    };

    return { ...toRefs(state), navigateToCard };
  },
};
</script>

<template>
  <div id="ph-dashboard">
    <div class="flex flex-row">
      <div
        v-for="card in dashboardCards" :key="card.id"
        class="basis-1/4 m-1"
      >
        <div class="card w-full h-full bg-base-300" @click="navigateToCard(card)">
          <div class="card-body">
            <div class="flex flex-row">
              <div class="basis-full">
                <h2 class="card-title">{{ card.title }}</h2>
              </div>

              <div class="basis-auto">
                <div :class="card.icon" class="text-2xl"/>
              </div>
            </div>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/global';

#ph-dashboard {
  height: 100%;

  .card {
    width: inherit;
    cursor: pointer;
    border: 1px solid hsl(var(--b3));
    transition: border 0.2s ease-in-out;

    &:hover {
      border: 1px solid hsl(var(--su));
    }
  }
}
</style>
