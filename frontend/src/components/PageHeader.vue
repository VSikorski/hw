<template>
    <nav>
        <img alt="HW logo" class="logo" src="../assets/logo.png">
        <ul>
            <li>home</li>
            <li>user</li>
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