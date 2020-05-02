<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    beforeMount() {
        //Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/registerServiceWorker.js')
                .then(reg => console.log('registered! 👍🏼', reg))
                .catch(err => console.error('SW registration failed! 😱', err))
        }
    },
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
