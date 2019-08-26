<template>
    <table-content-layout ref="tableContentLayout">
        <router-view @openSidePage="openSidePage"/>
    </table-content-layout>
</template>
<script>
    import TableContentLayout from "@/views/table-content-layout/index";

    export default {
        name: 'TableContentHub',
        components: {TableContentLayout},
        data() {
            return {}
        },
        props: {},
        computed: {},
        methods: {
            openSidePage(pageComponent, option, singleTask) {
                this.$refs.tableContentLayout.openSidePage(pageComponent, option, singleTask)
            }
        },
        mounted() {
        },
    }
</script>
<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
</style>

