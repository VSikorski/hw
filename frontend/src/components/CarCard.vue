<template>
    <div class="car-card">
        <img :alt=car.name :src=car.image class="car-card-img">
        <div class="car-card-text">
            <p class="car-card-name">{{ car.name }}</p>
        </div>
    </div>
</template>

<script>
import '../assets/css/car-card.css';

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