<template>
  <div class="explore-page container">
    <h6 class="explore-page-header">Available cars:</h6>
   
    <ul class="explore-page-list">
      <li v-for="item in paginatedItems" :key="item.id" class="explore-page-item"><CarCard :car="item" /></li>
    </ul>


    <!-- Pagination Controls -->
    <div class="pagination" v-if="totalPages > 0">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
      
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>

  </div>
</template>

<script>
import '../assets/css/general.css';
import '../assets/css/explore-page.css';
import axios from 'axios';
import CarCard from './CarCard.vue';

export default {
  name: 'ExplorePage',
  components: {
    CarCard
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      itemsPerPage: 50,
    }
  },
  mounted() {
    this.fetchItems();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:3000/api/get/cars');
        this.items = response.data.cars;
      } catch (er) {
        console.log('Error fetching items: ' + er);
      }
    }
  }
}
</script>