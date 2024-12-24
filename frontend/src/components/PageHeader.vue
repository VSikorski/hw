<template>
    <nav>
        <img alt="HW logo" class="logo" src="../assets/logo.png">
        <ul>
            <li><router-link to="/">home</router-link></li>
            <li><router-link to="/admin">admin</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'PageHeader'
}
</script>

<style scoped>
    nav {
        display: flex;
        width: 100%;
        background-color: red;
    }
    ul {
        display: flex;
        list-style-type: none;
    }
    li:not(:last-child) {
        margin-right: 1em;
    }
    .logo {
        width: 10em;
    }
</style>