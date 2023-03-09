<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Books',
  setup() {
    const store = useStore();
    const state = reactive({
      bookCollectionID: '',
      currentlyReading: null,
      books: {
        total: 0,
        pageCount: 0,
      },
    });

    onMounted(() => {
      fetchUserBooks();
    });

    const fetchUserBooks = async () => {
      const queryParams = {
        collectionPath: 'books',
        where: {
          key: 'userId',
          operator: '==',
          value: store.state.userId,
        },
      };

      store.dispatch('fetchDataWithQuery', queryParams)
        .then((querySnapshot) => {
          const [data] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          state.bookCollectionID = data.id;
          fetchCurrentlyReading();
        });
    };

    const fetchCurrentlyReading = async () => {
      const queryParams = {
        collectionPath: `books/${state.bookCollectionID}/currentlyReading`,
      };

      store.dispatch('fetchAllData', queryParams)
        .then((querySnapshot) => {
          const [data] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          state.currentlyReading = data;
          state.currentlyReading.progress = calculateProgress(data.pagesRead, data.totalPages);
          console.log(state.currentlyReading);
        });
    };

    const calculateProgress = (pagesRead, totalPages) => {
      const progress = (pagesRead / totalPages) * 100;

      // return `${progress.toFixed(2)}%`;
      return progress.toFixed(2);
    };

    const addNewBook = () => {
      console.log('lel');
    };

    return { ...toRefs(state), addNewBook };
  },
};
</script>

<template>
  <div id="books">
    <div class="flex flex-row flex-wrap md:flex-nowrap">
      <div class="basis-full md:basis-1/3 m-1">
        <div v-if="currentlyReading" class="card bg-accent text-primary-content">
          <div class="card-body">
            <div class="flex flex-row items-center">
              <div class="basis-full">
                <h2 class="card-title">Currently Reading</h2>
              </div>

              <div class="basis-auto">
                <label for="my-modal" class="btn btn-sm">Update</label>
              </div>
            </div>
            <h1 class="text-3xl font-bold">{{ currentlyReading.bookName }}</h1>
            <p>{{ currentlyReading.authorName }}</p>
            <p>{{ currentlyReading.progress }}%</p>

            <progress class="progress progress-primary" :value="currentlyReading.progress" max="100"/>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
          <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div class="modal-action">
            <label for="my-modal" class="btn">Yay!</label>
          </div>
        </div>
      </div>

      <div class="basis-full md:basis-1/3 m-1">
        <div class="card bg-info text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Completed Books</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn">Edit</button>
            </div>
          </div>
        </div>
      </div>

      <div class="basis-full md:basis-1/3 m-1">
        <div class="card bg-warning text-primary-content">
          <div class="card-body">
            <h2 class="card-title">To Read List</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#books {
  padding: 16px;
}
</style>>
