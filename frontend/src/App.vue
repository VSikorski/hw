<template>
  <PageHeader />
  <MainPage />
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import MainPage from './components/MainPage.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    MainPage
  }
}
</script>

<style>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 70%;
}
</style>
