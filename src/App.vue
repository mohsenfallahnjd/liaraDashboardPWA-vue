<template>
    <div id="app">
        <h1>
            سلام
        </h1>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    // created() {
    //     if (!localStorage.token) {
    //         this.$router.push({ name: 'Login' })
    //     }
    // },
}
</script>

<style lang="sass">
@import "./assets/styles/style.css"

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>
