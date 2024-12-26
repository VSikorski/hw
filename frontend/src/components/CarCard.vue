<template>
    <div class="car-card">
        <h6>{{ car.name }}</h6>
        <img :alt=car.name :src=car.image>
    </div>
</template>

<script>
export default {
    name: 'CarCard',
    props: {
        car: {
            type: Object,
            required: true
        }
    }
}   
</script>

<style scoped>
.car-card {
    width: 10rem;
    height: 14rem;
    background-color: bisque;
}
.car-card img {
    width: 90%;
}
</style>