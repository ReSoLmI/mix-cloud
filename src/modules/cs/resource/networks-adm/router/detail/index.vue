<template>
    <detail-layout
            v-bind="$attrs"
            v-on="$listeners"
            :componentsInfo="componentsInfo">
        <template v-slot:actions>
            <!--<el-select v-model="serverNetValue" placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="item in serverNetOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
        </template>
    </detail-layout>
</template>

<script>
    import DetailLayout from "@/views/detail-layout/index";
    import {
        NetworkRouterBasicInfo,
        Monitor,
        Event,
        NetworkService,
        NetworkRouter,
        Cluster
    } from "@/utils/componentPool"


    export default {
        name: "RouteDetail",
        components: {
            DetailLayout,
        },
        data() {
            const componentsInfo = this.obtainComponentsProps()
            return {
                componentsInfo
            }
        },
        methods: {

            obtainComponentsProps() {
                const componentsInfo = [{
                    description: '基本属性',
                    name: NetworkRouterBasicInfo.name,
                    component: NetworkRouterBasicInfo
                }, {
                    description: '监控',
                    name: Monitor.name,
                    component: Monitor
                }, {
                    description: '事件',
                    name: Event.name,
                    component: Event
                }, {
                    description: '网络服务',
                    name: NetworkService.name,
                    component: NetworkService
                }, {
                    description: '网络路由',
                    name: NetworkRouter.name,
                    component: NetworkRouter
                }, {
                    description: '集群',
                    name: Cluster.name,
                    component: Cluster
                }]
                return componentsInfo
            }
        }

    }
</script>

<style scoped>

</style>
