<template>
    <div id="home" class="home">
        <h1>خوش بومای</h1>
    </div>
</template>

<script>
export default {
    name: 'Home',
    created() {
        if (!localStorage.token) {
            this.$router.push({ name: 'Login' })
        }
    },
}
</script>

<style lang="sass" scoped>
.home
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
</style>
