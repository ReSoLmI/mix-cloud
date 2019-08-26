<template>
    <app-layout v-if="routeTargetLayout === 'table-content-layout'">
        <table-content-layout ref="tableContentLayout">
            <router-view :key="this.$route.fullPath"  @openSidePage="openSidePage"/>
        </table-content-layout>
    </app-layout>
    <!--<app-layout v-else-if="routeTargetLayout === 'create-sth-layout'">-->
        <!--<create-sth-layout>-->
            <!--<router-view :key="this.$route.fullPath"/>-->
        <!--</create-sth-layout>-->
    <!--</app-layout>-->
    <app-layout v-else>
        <router-view :key="this.$route.fullPath"/>
    </app-layout>
</template>
<script>
    import AppLayout from "@/views/app-layout/index";
    import TableContentLayout from "@/views/table-content-layout/index";
    import CreateSthLayout from "@/views/create-sth-layout/index";

    export default {
        name: "AppHub",
        components: {
            CreateSthLayout,
            TableContentLayout,
            AppLayout
        },
        mixins: [],
        computed: {
            routeTargetLayout() {
                const route = this.$route
                const {meta} = route
                return meta && meta.appHubLayout
            }

        },
        methods: {
            openSidePage(pageComponent, option, singleTask) {
                this.$refs.tableContentLayout.openSidePage(pageComponent, option, singleTask)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

</style>
