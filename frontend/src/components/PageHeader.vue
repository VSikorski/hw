<template>
    <nav class="page-header">
        <img alt="HW logo" class="page-header-logo" src="../assets/logo.png">
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
.page-header {
    display: flex;
    width: 100%;
    background-color: red;
}
.page-header ul {
    display: flex;
    list-style-type: none;
}
.page-header li:not(:last-child) {
    margin-right: 1em;
}
.page-header-logo {
    width: 10em;
}
</style>