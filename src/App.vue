<template>
        <router-view id="app"/>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss" scoped>
    @import "styles/variables";

    #app {
        position: relative;
        height: 100%;
        background-color: $white;
    }
</style>

