<template>
  <div class="explore-page">
    <h6>Available cars:</h6>
    <ul>
      <li v-for="item in items" :key="item.id"><CarCard :car="item"/></li>
    </ul>
  </div>
</template>

<script>
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

<style scoped>
.explore-page h3 {
  margin: 40px 0 0;
}
.explore-page ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(14, auto);
  gap: 20px;
}
.explore-page li {
  display: inline-block;
  margin: 0 10px;
}
</style>
