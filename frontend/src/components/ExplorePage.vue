<template>
  <div class="explore-page container">
    <h6 class="explore-page-header">Available cars:</h6>
    <ul class="explore-page-list">
      <li v-for="item in items" :key="item.id" class="explore-page-item"><CarCard :car="item"/></li>
    </ul>
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
      items: []
    }
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
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