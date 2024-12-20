<template>
    <div class="CarCard">
        <h6>{{ car.name }}</h6>
        <img alt="" src="">
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
    .CarCard {
        width: 3rem;
        height: 3rem;
        background-color: bisque;
    }
</style>