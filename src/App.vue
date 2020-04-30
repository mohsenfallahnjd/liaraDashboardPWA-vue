<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="sass">
@import "./assets/styles/style.css"
@import 'node_modules/bootstrap/scss/bootstrap'
@import 'node_modules/bootstrap-vue/src/index.scss'
#app
    height: 640px
    width: 100vw
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
</style>
